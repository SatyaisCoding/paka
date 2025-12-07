# Query API (RAG)

Base URL: `http://localhost:3000`

> **Note:** Query endpoints use Retrieval Augmented Generation (RAG) to answer questions based on your uploaded documents.

---

## Ask a Question

Ask a question and get an AI-generated answer based on your documents.

```bash
curl -X POST http://localhost:3000/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the key features mentioned in the document?"
  }'
```

**Response:**
```json
{
  "ok": true,
  "query": "What are the key features mentioned in the document?",
  "results": 5,
  "context": [
    {
      "chunkId": "abc123",
      "text": "The key features include...",
      "score": 0.92,
      "documentId": 1
    }
  ],
  "answer": "Based on the documents, the key features are...",
  "latencyMs": 1234,
  "cached": false
}
```

---

## Query with Options

Advanced query with options.

```bash
curl -X POST http://localhost:3000/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain the architecture",
    "limit": 10,
    "documentIds": [1, 2, 3],
    "includeContext": true,
    "generateAnswer": true,
    "useCache": true
  }'
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | required | Your question |
| `limit` | number | 5 | Max context chunks to retrieve |
| `documentIds` | array | all | Specific documents to search |
| `includeContext` | boolean | true | Include context in response |
| `generateAnswer` | boolean | true | Generate AI answer |
| `useCache` | boolean | true | Use cached results if available |

---

## Search Only (No AI Answer)

Just search documents without generating an answer.

```bash
curl -X POST http://localhost:3000/query \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning",
    "generateAnswer": false
  }'
```

---

## Clear Query Cache

Clear cached query results.

```bash
curl -X POST http://localhost:3000/query/clear-cache \
  -H "Authorization: Bearer YOUR_TOKEN"
```

