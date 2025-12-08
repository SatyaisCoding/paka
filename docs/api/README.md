# Paka API Documentation

Welcome to the Paka API documentation. This folder contains curl command examples for all API endpoints.

## 🌟 Features Overview

| Category | Integrations |
|----------|--------------|
| **Google Services** | Gmail, Calendar, Docs (unified OAuth) |
| **Productivity** | Notion, Telegram Bot, Alarms, Reminders, Tasks |
| **AI/RAG** | Document Q&A, Vector Search, Embeddings |
| **Real-time** | Socket.IO (WebSocket), Kafka (async events) |
| **Utilities** | Weather (Open-Meteo), Daily Briefing, Weekly Report |

---

## 📁 API Documentation Files

### Authentication & Users
| File | Description |
|------|-------------|
| [auth.md](./auth.md) | Authentication (signup, login, profile) |

### Google Integrations
| File | Description |
|------|-------------|
| [google-oauth.md](./google-oauth.md) | Unified Google OAuth setup |
| [gmail.md](./gmail.md) | Gmail (read, send, reply, AI summary) |
| [calendar.md](./calendar.md) | Google Calendar (events, scheduling) |
| [google-docs.md](./google-docs.md) | Google Docs (list, read, create) |

### Productivity Apps
| File | Description |
|------|-------------|
| [notion.md](./notion.md) | Notion (search, read, create pages) |
| [telegram.md](./telegram.md) | Telegram Bot (notifications) |
| [alarms.md](./alarms.md) | Custom alarms (in-memory) |
| [reminders.md](./reminders.md) | Database reminders |
| [tasks.md](./tasks.md) | Task management |

### AI & Documents
| File | Description |
|------|-------------|
| [documents.md](./documents.md) | Document upload (PDF, DOCX, TXT) |
| [query.md](./query.md) | RAG queries (ask questions) |
| [vectors.md](./vectors.md) | Vector embeddings & search |
| [sources.md](./sources.md) | External data sources |

### Real-time & Async
| File | Description |
|------|-------------|
| [socket-io.md](./socket-io.md) | **Socket.IO** (WebSocket real-time updates) |
| [kafka.md](./kafka.md) | **Kafka** (async event processing) |

### Utilities
| File | Description |
|------|-------------|
| [briefing.md](./briefing.md) | **Daily Briefing** (one call for everything!) |
| [report.md](./report.md) | **Weekly Report** (AI summary of your week) |
| [weather.md](./weather.md) | Weather API (Open-Meteo, no key needed) |
| [health.md](./health.md) | Health checks & monitoring |

---

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

### 3. Connect Google (for Gmail, Calendar, Docs)

```bash
# Get OAuth URL
curl http://localhost:3000/google/auth -H "Authorization: Bearer $TOKEN"

# Open the URL in browser, complete authentication
# Check connection status
curl http://localhost:3000/google/status -H "Authorization: Bearer $TOKEN"
```

---

## 📧 Gmail Quick Commands

```bash
# Today's email summary (AI-powered)
curl http://localhost:3000/gmail/summary/today -H "Authorization: Bearer $TOKEN"

# List today's emails
curl http://localhost:3000/gmail/emails/today -H "Authorization: Bearer $TOKEN"

# Search emails by subject
curl "http://localhost:3000/gmail/emails?subject=meeting" -H "Authorization: Bearer $TOKEN"

# Send email
curl -X POST http://localhost:3000/gmail/send \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to": "someone@email.com", "subject": "Hello", "body": "Hi there!"}'
```

---

## 📅 Calendar Quick Commands

```bash
# Today's events
curl http://localhost:3000/calendar/events/today -H "Authorization: Bearer $TOKEN"

# This week's events
curl http://localhost:3000/calendar/events/week -H "Authorization: Bearer $TOKEN"

# Create event (AI - natural language)
curl -X POST http://localhost:3000/calendar/events/quick \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Meeting with John tomorrow at 3pm at the office"}'

# AI summary of today
curl http://localhost:3000/calendar/summary/today -H "Authorization: Bearer $TOKEN"
```

---

## 📝 Notion Quick Commands

```bash
# Search pages
curl "http://localhost:3000/notion/search?query=project" -H "Authorization: Bearer $TOKEN"

# Read page content
curl http://localhost:3000/notion/pages/{pageId}/content -H "Authorization: Bearer $TOKEN"

# Create page
curl -X POST http://localhost:3000/notion/pages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"parentId": "parent-page-id", "title": "New Page", "content": "Page content here"}'
```

---

## 📄 Google Docs Quick Commands

```bash
# List documents
curl http://localhost:3000/docs/list -H "Authorization: Bearer $TOKEN"

# Read document content
curl http://localhost:3000/docs/{docId}/content -H "Authorization: Bearer $TOKEN"

# Create document
curl -X POST http://localhost:3000/docs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Document", "content": "Initial content"}'
```

---

## 🤖 Telegram Quick Commands

```bash
# Check bot status
curl http://localhost:3000/telegram/status -H "Authorization: Bearer $TOKEN"

# Send message
curl -X POST http://localhost:3000/telegram/send \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Paka!"}'

# Send notification
curl -X POST http://localhost:3000/telegram/notify \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Alert", "body": "Something important happened!"}'
```

---

## 🌅 Daily Briefing (One Call for Everything!)

```bash
# Full briefing with AI summary
curl http://localhost:3000/briefing -H "Authorization: Bearer $TOKEN"

# Quick briefing (minimal data)
curl http://localhost:3000/briefing/quick -H "Authorization: Bearer $TOKEN"

# Send to Telegram
curl -X POST http://localhost:3000/briefing/telegram -H "Authorization: Bearer $TOKEN"
```

---

## 🌤️ Weather Quick Commands

```bash
# Current weather (no API key needed!)
curl "http://localhost:3000/weather/current?city=Delhi" -H "Authorization: Bearer $TOKEN"

# 7-day forecast
curl "http://localhost:3000/weather/daily?city=Mumbai" -H "Authorization: Bearer $TOKEN"

# Brief summary
curl "http://localhost:3000/weather/brief?city=Bangalore" -H "Authorization: Bearer $TOKEN"
```

---

## ⏰ Alarms Quick Commands

```bash
# Create alarm
curl -X POST http://localhost:3000/alarms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Wake up", "time": "2025-12-08T07:00:00+05:30", "repeat": "weekdays"}'

# List alarms
curl http://localhost:3000/alarms -H "Authorization: Bearer $TOKEN"

# Snooze alarm
curl -X POST http://localhost:3000/alarms/{alarmId}/snooze \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"minutes": 10}'
```

---

## 📄 Document & RAG Quick Commands

```bash
# Upload a document (auto-parsed)
curl -X POST http://localhost:3000/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@document.pdf"

# Ask a question about your documents
curl -X POST http://localhost:3000/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the main topic of my documents?"}'

# Search similar content
curl -X POST http://localhost:3000/vectors/search \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning", "limit": 5}'
```

---

## 🔌 Socket.IO (Real-time)

```bash
# Check Socket.IO status
curl http://localhost:3000/socket/status

# Test notification (to yourself)
curl -X POST http://localhost:3000/socket/test/notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "message": "Hello from Socket.IO!"}'

# Connection info
curl http://localhost:3000/socket/connections -H "Authorization: Bearer $TOKEN"
```

**Connect via WebSocket:**
```javascript
const socket = io('http://localhost:3000', {
  auth: { token: 'your-jwt-token' }
});

socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```

---

## 📊 Kafka Quick Commands

```bash
# Check Kafka status
curl http://localhost:3000/kafka/status -H "Authorization: Bearer $TOKEN"

# Test async notification via Kafka
curl -X POST http://localhost:3000/kafka/notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type": "telegram", "title": "Test", "body": "Hello via Kafka!"}'

# Request async report generation
curl -X POST http://localhost:3000/kafka/report \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reportType": "weekly"}'
```

---

## 🔧 Health Check

```bash
# Quick check
curl http://localhost:3000/health

# Detailed check (all services)
curl http://localhost:3000/health/detailed
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens |
| `REDIS_URL` | Yes | Redis connection string |
| `QDRANT_URL` | Yes | Qdrant vector DB URL |
| `GEMINI_API_KEY` | Yes | Google Gemini API key (for embeddings/LLM) |
| `GOOGLE_CLIENT_ID` | For Google | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For Google | OAuth client secret |
| `NOTION_API_KEY` | For Notion | Notion integration token |
| `TELEGRAM_BOT_TOKEN` | For Telegram | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | For Telegram | Your Telegram chat ID |

---

## Base URL

- **Local:** `http://localhost:3000`
- **Production:** Configure as needed

## Authentication

All endpoints (except `/health` and `/auth/*`) require a JWT token:

```
Authorization: Bearer YOUR_JWT_TOKEN
```
