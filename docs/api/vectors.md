# Vectors API

Base URL: `http://localhost:3000`

> **Note:** Vector endpoints are for managing document embeddings in the vector database.

---

## Generate Embedding

Generate an embedding vector for text.

```bash
curl -X POST http://localhost:3000/vectors/embed \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is some text to embed"
  }'
```

**Response:**
```json
{
  "ok": true,
  "embedding": [0.123, -0.456, 0.789, ...],
  "dimension": 768,
  "model": "text-embedding-004",
  "provider": "gemini"
}
```

---

## Semantic Search

Search for similar text in your documents.

```bash
curl -X POST http://localhost:3000/vectors/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning algorithms",
    "limit": 5
  }'
```

**Response:**
```json
{
  "ok": true,
  "results": [
    {
      "chunkId": "abc123",
      "text": "Machine learning algorithms can be...",
      "score": 0.89,
      "documentId": 1
    }
  ]
}
```

---

## Get Vector Stats

Get statistics about stored vectors.

```bash
curl http://localhost:3000/vectors/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "collection": "document_chunks",
  "totalVectors": 150,
  "dimension": 768
}
```

---

## Delete Document Vectors

Delete all vectors for a specific document.

```bash
curl -X DELETE http://localhost:3000/vectors/document/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

