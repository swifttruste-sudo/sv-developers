from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, List, Optional
import uuid
from datetime import datetime, timezone


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


# Define Models
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
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

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


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
