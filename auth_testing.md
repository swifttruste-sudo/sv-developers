# Auth Testing Playbook — SV Developers Admin Panel

Read /app/memory/test_credentials.md for credentials.

## 1. MongoDB verification
```
mongosh
use test_database
db.users.find({role:"admin"}).pretty()          # bcrypt hash starts with $2b$
db.login_attempts.find().pretty()
```
Indexes: users.email (unique), login_attempts.identifier.

## 2. API testing
```
# login (sets httpOnly cookie)
curl -c /tmp/c.txt -X POST <BACKEND_URL>/api/admin/login -H "Content-Type: application/json" \
  -d '{"email":"admin@svdevelopers.in","password":"SVDevelopers@2026"}'
# me
curl -b /tmp/c.txt <BACKEND_URL>/api/admin/me
# list enquiries
curl -b /tmp/c.txt <BACKEND_URL>/api/admin/enquiries
# reply
curl -b /tmp/c.txt -X POST <BACKEND_URL>/api/admin/enquiries/<id>/reply \
  -H "Content-Type: application/json" -d '{"reply":"Thank you, our team will call you."}'
# unauthenticated must 401
curl <BACKEND_URL>/api/admin/enquiries
# brute force: 5 bad logins -> 429 for 15 minutes
# chat SSE (streamed tokens)
curl -N -X POST <BACKEND_URL>/api/chat -H "Content-Type: application/json" \
  -d '{"session_id":"test-session-123","message":"What projects do you have?"}'
```
Expect: login 200 + cookie; me 200; enquiries array; reply 200 with reply_text; unauth 401; chat streams `data: {"delta": ...}` events.
