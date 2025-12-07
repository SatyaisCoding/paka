# Notion API

Base URL: `http://localhost:3000`

> **Setup:** Get your API key from https://www.notion.so/my-integrations

---

## Check Status

```bash
curl http://localhost:3000/notion/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Search Pages & Databases

```bash
curl -X POST http://localhost:3000/notion/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "meeting notes",
    "filter": "page",
    "pageSize": 10
  }'
```

---

## List Recent Pages

```bash
curl http://localhost:3000/notion/pages \
  -H "Authorization: Bearer YOUR_TOKEN"

# With limit
curl "http://localhost:3000/notion/pages?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Page

```bash
# Get page metadata
curl http://localhost:3000/notion/pages/PAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get page with content
curl "http://localhost:3000/notion/pages/PAGE_ID?content=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Page Content

```bash
curl http://localhost:3000/notion/pages/PAGE_ID/content \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Create Page

```bash
# Create page in database
curl -X POST http://localhost:3000/notion/pages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parentId": "DATABASE_ID",
    "parentType": "database",
    "title": "New Meeting Notes",
    "content": "Discussion points:\n- Item 1\n- Item 2",
    "icon": "📝"
  }'

# Create sub-page
curl -X POST http://localhost:3000/notion/pages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parentId": "PAGE_ID",
    "parentType": "page",
    "title": "Sub Page",
    "content": "Content here"
  }'
```

---

## Update Page

```bash
curl -X PATCH http://localhost:3000/notion/pages/PAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "icon": "🎯"
  }'
```

---

## Append to Page

```bash
curl -X POST http://localhost:3000/notion/pages/PAGE_ID/append \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "New paragraph added at the end."
  }'
```

---

## Delete (Archive) Page

```bash
curl -X DELETE http://localhost:3000/notion/pages/PAGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List Databases

```bash
curl http://localhost:3000/notion/databases \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Database

```bash
curl http://localhost:3000/notion/databases/DATABASE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Query Database Items

```bash
curl "http://localhost:3000/notion/databases/DATABASE_ID/items?limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

