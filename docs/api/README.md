# Paka API Documentation

Welcome to the Paka API documentation. This folder contains curl command examples for all API endpoints.

## 📁 API Files

| File | Description |
|------|-------------|
| [auth.md](./auth.md) | Authentication (signup, login, profile) |
| [gmail.md](./gmail.md) | Gmail integration (read, send, summarize) |
| [documents.md](./documents.md) | Document upload and management |
| [query.md](./query.md) | RAG queries (ask questions about docs) |
| [vectors.md](./vectors.md) | Vector embeddings management |
| [tasks.md](./tasks.md) | Task management |
| [reminders.md](./reminders.md) | Reminder management |
| [sources.md](./sources.md) | External data sources |
| [health.md](./health.md) | Health checks and monitoring |

## 🚀 Quick Start

### 1. Get a Token

```bash
# Signup
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "password": "password123"}'

# Or Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "password": "password123"}'
```

### 2. Save Token

```bash
export TOKEN="your-jwt-token-here"
```

### 3. Use Any Endpoint

```bash
# Example: Get today's email summary
curl http://localhost:3000/gmail/summary/today \
  -H "Authorization: Bearer $TOKEN"
```

## 📧 Gmail Quick Commands

```bash
# Connect Gmail (get OAuth URL)
curl http://localhost:3000/gmail/auth -H "Authorization: Bearer $TOKEN"

# Today's summary
curl http://localhost:3000/gmail/summary/today -H "Authorization: Bearer $TOKEN"

# List today's emails
curl http://localhost:3000/gmail/emails/today -H "Authorization: Bearer $TOKEN"

# Search emails
curl "http://localhost:3000/gmail/emails?subject=testing" -H "Authorization: Bearer $TOKEN"

# Send email
curl -X POST http://localhost:3000/gmail/send \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@email.com", "subject": "Hello", "body": "Hi there!"}'
```

## 📄 Document Quick Commands

```bash
# Upload a document
curl -X POST http://localhost:3000/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@document.pdf"

# Ask a question
curl -X POST http://localhost:3000/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is this document about?"}'
```

## 🔧 Health Check

```bash
# Quick check
curl http://localhost:3000/health

# Detailed check
curl http://localhost:3000/health/detailed
```

---

## Base URL

- **Local:** `http://localhost:3000`
- **Production:** (configure as needed)

## Authentication

All endpoints (except `/health` and `/auth/signup`, `/auth/login`) require a JWT token:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

