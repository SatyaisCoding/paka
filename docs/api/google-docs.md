# Google Docs API

Base URL: `http://localhost:3000`

> **Note:** Requires Google OAuth connection. Use `/google/auth` first.

---

## Check Status

```bash
curl http://localhost:3000/docs/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List Documents

```bash
curl http://localhost:3000/docs \
  -H "Authorization: Bearer YOUR_TOKEN"

# With limit
curl "http://localhost:3000/docs?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Search Documents

```bash
curl "http://localhost:3000/docs/search?q=meeting notes" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Document

```bash
# Get document with content
curl http://localhost:3000/docs/DOCUMENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get metadata only
curl "http://localhost:3000/docs/DOCUMENT_ID?content=false" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Document Content Only

```bash
curl http://localhost:3000/docs/DOCUMENT_ID/content \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Create Document

```bash
curl -X POST http://localhost:3000/docs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meeting Notes - Dec 2025",
    "content": "Attendees:\n- John\n- Jane\n\nAgenda:\n1. Project update\n2. Next steps"
  }'
```

---

## Append to Document

```bash
curl -X POST http://localhost:3000/docs/DOCUMENT_ID/append \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "\n\nAction Items:\n- Review proposal by Friday"
  }'
```

---

## Find and Replace

```bash
curl -X POST http://localhost:3000/docs/DOCUMENT_ID/replace \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "find": "TODO",
    "replace": "DONE"
  }'
```

---

## Delete Document

```bash
curl -X DELETE http://localhost:3000/docs/DOCUMENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

