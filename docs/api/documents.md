# Documents API

Base URL: `http://localhost:3000`

> **Note:** All document endpoints require authentication.

---

## Upload Document

Upload a file (PDF, DOCX, TXT, MD, CSV) with automatic parsing and embedding.

```bash
curl -X POST http://localhost:3000/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf"
```

**Response:**
```json
{
  "ok": true,
  "file": {
    "id": 1,
    "filename": "document.pdf",
    "size": 102400,
    "mimeType": "application/pdf"
  },
  "canParse": true,
  "parsed": true,
  "parseMetadata": {
    "wordCount": 5000,
    "charCount": 30000,
    "numPages": 10
  },
  "documentCreated": true,
  "document": { ... },
  "embeddings": {
    "processed": true,
    "chunksCreated": 25,
    "embeddingsStored": 25
  }
}
```

---

## Get Supported File Types

List all supported file types for parsing.

```bash
curl http://localhost:3000/upload/supported-types \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "types": [
    { "extension": "pdf", "mimeType": "application/pdf", "description": "PDF Document" },
    { "extension": "docx", "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "description": "Word Document" },
    { "extension": "txt", "mimeType": "text/plain", "description": "Plain Text" },
    { "extension": "md", "mimeType": "text/markdown", "description": "Markdown" },
    { "extension": "csv", "mimeType": "text/csv", "description": "CSV File" }
  ]
}
```

---

## List Documents

Get all documents for the current user.

```bash
curl http://localhost:3000/documents \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Document

Get document details by ID.

```bash
curl http://localhost:3000/documents/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Document

Delete a document and its embeddings.

```bash
curl -X DELETE http://localhost:3000/documents/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

