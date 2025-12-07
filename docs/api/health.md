# Health API

Base URL: `http://localhost:3000`

> **Note:** Health endpoints don't require authentication.

---

## Basic Health Check

Quick health check.

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-07T17:00:00.000Z"
}
```

---

## Detailed Health Check

Get detailed status of all services.

```bash
curl http://localhost:3000/health/detailed
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-07T17:00:00.000Z",
  "services": {
    "database": {
      "status": "healthy",
      "latencyMs": 5
    },
    "redis": {
      "status": "healthy",
      "latencyMs": 2,
      "details": {
        "keys": 15,
        "memory": "1.5M"
      }
    },
    "qdrant": {
      "status": "healthy",
      "latencyMs": 10
    },
    "embedding": {
      "status": "healthy",
      "provider": "gemini",
      "model": "text-embedding-004"
    },
    "llm": {
      "status": "healthy",
      "provider": "gemini",
      "model": "gemini-flash-latest"
    }
  }
}
```

---

## Readiness Probe

Check if the service is ready to accept traffic.

```bash
curl http://localhost:3000/health/ready
```

---

## Liveness Probe

Check if the service is alive.

```bash
curl http://localhost:3000/health/live
```

