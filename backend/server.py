from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ObjectId -> str coercion so BSON ids are always JSON-serializable
def oid_to_str(v):
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[Optional[str], BeforeValidator(oid_to_str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: PyObjectId = Field(default=None, alias="_id")

    def to_mongo(self):
        doc = self.model_dump(by_alias=True, exclude_none=True)
        if not doc.get("_id"):
            doc.pop("_id", None)
        return doc

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc) if doc else None


# ---------- Models ----------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Enquiry(BaseDocument):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=6, max_length=25)
    email: Optional[str] = Field(default=None, max_length=160)
    interest: Optional[str] = Field(default=None, max_length=160)
    message: Optional[str] = Field(default=None, max_length=3000)
    source: str = Field(default="website", max_length=60)
    created_at: str = Field(default_factory=now_iso)


class AdminEnquiry(Enquiry):
    reply_text: Optional[str] = Field(default=None, max_length=3000)
    replied_at: Optional[str] = None


class AdminLoginIn(BaseModel):
    email: str = Field(min_length=3, max_length=160)
    password: str = Field(min_length=1, max_length=200)


class ReplyIn(BaseModel):
    reply: str = Field(min_length=1, max_length=3000)


class ChatIn(BaseModel):
    session_id: str = Field(min_length=8, max_length=80)
    message: str = Field(min_length=1, max_length=2000)


# ---------- Auth helpers ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except ValueError:
        return False


def create_admin_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access" or payload.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").strip().lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"role": "admin"})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": now_iso(),
        })
        logger.info(f"Seeded admin user {admin_email}")
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"_id": existing["_id"]},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info(f"Updated admin password hash for {admin_email}")


# ---------- Basic routes ----------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------- Public enquiries ----------

@api_router.post("/enquiries", response_model=Enquiry, status_code=201)
async def create_enquiry(input: Enquiry):
    enquiry = Enquiry(**input.model_dump())
    result = await db.enquiries.insert_one(enquiry.to_mongo())
    saved = await db.enquiries.find_one({"_id": result.inserted_id})
    return Enquiry.from_mongo(saved)


@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries():
    docs = await db.enquiries.find().sort("created_at", -1).to_list(500)
    return [Enquiry.from_mongo(d) for d in docs]


# ---------- Admin auth ----------

@api_router.post("/admin/login")
async def admin_login(input: AdminLoginIn, request: Request, response: Response):
    email = input.email.strip().lower()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"

    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until"):
        locked_until = datetime.fromisoformat(attempt["locked_until"])
        if locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")

    admin = await db.users.find_one({"email": email, "role": "admin"})
    if not admin or not verify_password(input.password, admin.get("password_hash", "")):
        count = (attempt.get("count", 0) if attempt else 0) + 1
        update = {"$inc": {"count": 1}, "$set": {"last_at": now_iso()}}
        if count >= 5:
            update["$set"]["locked_until"] = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        await db.login_attempts.update_one({"identifier": identifier}, update, upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_admin_token(email)
    response.set_cookie(
        key="access_token", value=token, httponly=True, secure=True,
        samesite="none", max_age=43200, path="/",
    )
    return {"email": email, "role": "admin"}


@api_router.get("/admin/me")
async def admin_me(current: dict = Depends(get_current_admin)):
    return {"email": current.get("sub"), "role": "admin"}


@api_router.post("/admin/logout")
async def admin_logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    return {"ok": True}


# ---------- Admin enquiries ----------

@api_router.get("/admin/enquiries", response_model=List[AdminEnquiry])
async def admin_list_enquiries(_: dict = Depends(get_current_admin)):
    docs = await db.enquiries.find().sort("created_at", -1).to_list(500)
    return [AdminEnquiry.from_mongo(d) for d in docs]


@api_router.post("/admin/enquiries/{enquiry_id}/reply", response_model=AdminEnquiry)
async def admin_reply_enquiry(enquiry_id: str, input: ReplyIn, _: dict = Depends(get_current_admin)):
    try:
        oid = ObjectId(enquiry_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid enquiry id")
    result = await db.enquiries.update_one(
        {"_id": oid},
        {"$set": {"reply_text": input.reply, "replied_at": now_iso()}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    doc = await db.enquiries.find_one({"_id": oid})
    return AdminEnquiry.from_mongo(doc)


# ---------- Website chat assistant (SSE) ----------

SYSTEM_PROMPT = """You are the friendly website assistant for SV Developers, a real estate development, promotion, marketing and sales company in Hyderabad, Telangana, India. Tagline: "Building Your Future". Positioning: Your Trusted Real Estate Partner in Hyderabad.

KEY FACTS:
- SV Developers is a NEWLY ESTABLISHED company. Its six-member core team brings 55 years of COMBINED real estate experience (Suresh - Managing Director; Rajashekar; DVS Prasad; Prasad; Venu; Srikanth).
- Phone: +91 93475 30281. WhatsApp: https://wa.me/919347530281. Core market: Hyderabad and surrounding regions.
- Philosophy: "We don't just help you discover property. We help you understand its potential." Buyer-first: transparency, no sales pressure, documentation awareness.

PROJECTS (share ONLY these facts):
1. Shankarpally Villa Plots - Maithabkhanguda, Shankarpally. Residential villa plots. Status: HMDA & RERA APPROVED (as confirmed by the company) - you may state this approval. Enquiries open. Stated: 15+ acres, plots 180-300 sq yd, clubhouse, swimming pools, 30 & 40 ft CC roads, planned utilities and streetlights, children's play area, outdoor games and party lawn, avenue plantation. Price NOT published (being reconfirmed).
2. Pearl County (named developer: JS Infra Developers; SV Developers' role: promotion, marketing and sales support) - Tellapur @ Kollur (exact location to be confirmed). Premium triplex villas. Stated configurations: 200 sq yd / 2,850 sq ft; 222 sq yd / 3,210 sq ft; 266 sq yd / 3,820 sq ft; 300 sq yd / 4,490 sq ft. Proposed amenities: clubhouse, swimming pool, sports facilities, gym, yoga, walking tracks, children's play area. Price, possession date and approvals NOT published.
3. BBG Project Opportunities - an enquiry facilitation service for residential opportunities associated with BBG India (bbgindia.com). Project identity, location, configurations and pricing are shared after contacting the team. No ownership or authorised partnership is claimed.
4. Vertical Forest - Hyderabad (exact location to be confirmed). CONCEPT presentation: 3BHK duplex residences with planted balconies, approx 2,250-2,500 sq ft per duplex, 24 upper residential floors + 4 stilt parking floors indicated, 120 proposed residences, 70% open space (all stated/concept details pending verification; do NOT claim approved or under construction).
5. Silpa RRR County - plotted development developed, promoted and sold by SV Developers. Planned layout, internal roads, landscaped spaces, community-oriented amenities. Specifications (exact location, area, plot sizes, prices) are being compiled - "to be confirmed".
More opportunities are coming in Shadnagar and Shabad.

WEBSITE FEATURES: Visitors can filter projects by location and type, search the portfolio, and compare up to 3 projects on the /compare page — the comparison includes information-clarity ratings (how completely documented each listing is, never project quality) and an honest suggestion. Feel free to mention these features.

STRICT RULES:
1. NEVER invent or state prices, discounts, possession dates, availability counts, awards or customer numbers. If asked about pricing, say it is being reconfirmed and the team will share current details when contacted. Approvals: ONLY Shankarpally Villa Plots is HMDA & RERA approved (as confirmed by the company) - you may state this; for every other project, say the approval status is being reconfirmed and the team will share the current status.
2. Use only the facts above. If you don't know something, say the team will confirm.
3. Keep answers warm, concise and professional - under 120 words unless the user asks for detail. Use short paragraphs or bullets.
4. Reply in the language the user writes in (English, Hindi or Telugu are common).
5. Guide visitors naturally toward the next step: a site visit, a WhatsApp message, or the contact page.
6. Never give legal or investment advice; encourage independent verification of property documents."""


@api_router.post("/chat")
async def website_chat(input: ChatIn):
    session_id = input.session_id.strip()[:80]
    await db.chat_messages.insert_one({
        "session_id": session_id, "role": "user",
        "content": input.message, "created_at": now_iso(),
    })

    recent_docs = await db.chat_messages.find({"session_id": session_id}).sort("created_at", -1).limit(7).to_list(7)
    recent_docs = list(reversed(recent_docs))
    history = "\n".join(
        f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content'][:600]}"
        for m in recent_docs[:-1]
    )
    composed = (
        f"Recent conversation so far:\n{history}\n\nThe user's new message: {input.message}"
        if history else input.message
    )

    chat = LlmChat(
        api_key=os.environ["EMERGENT_LLM_KEY"],
        session_id=f"svsite-{session_id}",
        system_message=SYSTEM_PROMPT,
    ).with_model("openai", "gpt-5.4")

    async def event_generator():
        collected = []
        try:
            async for ev in chat.stream_message(UserMessage(text=composed)):
                if isinstance(ev, TextDelta):
                    collected.append(ev.content)
                    yield f"data: {json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
            await db.chat_messages.insert_one({
                "session_id": session_id, "role": "assistant",
                "content": "".join(collected), "created_at": now_iso(),
            })
            yield 'data: {"done": true}\n\n'
        except Exception as e:
            logger.error(f"chat error: {e}")
            yield "data: " + json.dumps({
                "error": "The assistant is unavailable right now. Please call +91 93475 30281 or WhatsApp us - we will help you right away."
            }) + "\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await seed_admin()
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
