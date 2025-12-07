# Sources API

Base URL: `http://localhost:3000`

> **Note:** All source endpoints require authentication. Sources are external data connections.

---

## Create Source

Create a new data source.

```bash
curl -X POST http://localhost:3000/sources \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Company Wiki",
    "type": "notion",
    "config": {
      "apiKey": "secret_xxx",
      "databaseId": "abc123"
    }
  }'
```

**Response:**
```json
{
  "ok": true,
  "source": {
    "id": 1,
    "name": "Company Wiki",
    "type": "notion",
    "status": "active",
    "createdAt": "2025-12-07T17:00:00Z"
  }
}
```

---

## List Sources

Get all sources for the current user.

```bash
curl http://localhost:3000/sources \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Source

Get source details by ID.

```bash
curl http://localhost:3000/sources/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Update Source

Update a source configuration.

```bash
curl -X PATCH http://localhost:3000/sources/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Wiki Name",
    "status": "inactive"
  }'
```

---

## Sync Source

Trigger a sync for a source.

```bash
curl -X POST http://localhost:3000/sources/1/sync \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Source

Delete a source and its documents.

```bash
curl -X DELETE http://localhost:3000/sources/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

