# Apache Kafka Integration

Base URL: `http://localhost:3000`

> **Event-Driven Architecture** - Async processing for scalability

---

## Architecture

```
                    ┌─────────────┐
   User Request →   │   API       │
                    │  (Producer) │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   KAFKA     │
                    │   Topics    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │  Document    │ │ Notification │ │   Audit      │
   │  Processor   │ │  Processor   │ │   Logger     │
   └──────────────┘ └──────────────┘ └──────────────┘
```

---

## Topics

| Topic | Purpose | Consumer |
|-------|---------|----------|
| `document.uploaded` | New document needs processing | document-processor |
| `document.parsed` | Document parsed into chunks | - |
| `document.embedded` | Embeddings generated | - |
| `notification.send` | Send notification | notification-processor |
| `notification.sent` | Notification delivered | - |
| `audit.event` | Log user action | audit-logger |
| `report.generate` | Generate report async | report-generator |
| `report.ready` | Report completed | - |

---

## Check Status

```bash
curl http://localhost:3000/kafka/status
```

**Response (Connected):**
```json
{
  "ok": true,
  "kafka": {
    "connected": true,
    "brokers": "localhost:9092",
    "clientId": "paka-api"
  },
  "topics": [
    "document.uploaded",
    "document.parsed",
    "document.embedded",
    "notification.send",
    "notification.sent",
    "audit.event",
    "report.generate",
    "report.ready"
  ],
  "consumers": [
    "paka-document-processor",
    "paka-notification-processor",
    "paka-audit-logger",
    "paka-report-generator"
  ],
  "message": "Kafka is connected and processing events"
}
```

**Response (Not Connected):**
```json
{
  "ok": true,
  "kafka": {
    "connected": false,
    "brokers": "localhost:9092",
    "clientId": "paka-api"
  },
  "topics": [...],
  "consumers": [],
  "message": "Kafka not connected - async processing disabled"
}
```

---

## Test Notification via Kafka

```bash
curl -X POST http://localhost:3000/kafka/test/notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Alert",
    "body": "This notification was sent via Kafka!"
  }'
```

**Response:**
```json
{
  "ok": true,
  "message": "Notification event published to Kafka",
  "topic": "notification.send"
}
```

---

## Test Audit Logging via Kafka

```bash
curl -X POST http://localhost:3000/kafka/test/audit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "test_action",
    "resource": "document",
    "resourceId": 123,
    "details": {"note": "Testing Kafka audit"}
  }'
```

---

## Request Async Report Generation

```bash
curl -X POST http://localhost:3000/kafka/test/report \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "weekly"
  }'
```

**Response:**
```json
{
  "ok": true,
  "message": "Report generation request published to Kafka",
  "topic": "report.generate",
  "note": "Report will be generated async and sent to Telegram"
}
```

---

## Docker Setup

Kafka requires Zookeeper. Both are included in `docker-compose.yml`:

```bash
# Start all services including Kafka
docker-compose up -d

# Check Kafka logs
docker logs paka_kafka

# Access Kafka UI (monitoring)
open http://localhost:8080
```

---

## Kafka UI

A web UI for monitoring Kafka is available at:

**http://localhost:8080**

Features:
- View topics and partitions
- Browse messages
- Monitor consumer groups
- Real-time metrics

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `KAFKA_BROKERS` | `localhost:9092` | Kafka broker addresses |
| `KAFKA_CLIENT_ID` | `paka-api` | Client identifier |

---

## Consumer Groups

| Group ID | Topics | Purpose |
|----------|--------|---------|
| `paka-document-processor` | document.uploaded | Generate embeddings |
| `paka-notification-processor` | notification.send | Send Telegram/email |
| `paka-audit-logger` | audit.event | Log to database |
| `paka-report-generator` | report.generate | Generate reports |

---

## Event Flow Examples

### Document Upload (Async)

```
1. POST /upload → API saves file, publishes event
2. Kafka receives "document.uploaded"
3. Document processor consumes event
4. Generates embeddings (async)
5. Publishes "document.embedded"
6. User can query immediately (no wait)
```

### Notification (Async)

```
1. Some action triggers notification
2. API publishes to "notification.send"
3. Notification processor consumes
4. Sends to Telegram/email
5. Publishes "notification.sent"
```

---

## Fallback Behavior

If Kafka is not available:
- Events are logged but not queued
- Processing happens synchronously
- No data loss, just slower responses

---

## Scaling

With Kafka, you can:
- Run multiple API instances (all produce)
- Run multiple consumers (parallel processing)
- Handle millions of events/day
- Replay events if needed

