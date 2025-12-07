# Tasks API

Base URL: `http://localhost:3000`

> **Note:** All task endpoints require authentication.

---

## Create Task

Create a new task.

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write API docs for all endpoints",
    "priority": "high",
    "dueDate": "2025-12-10T18:00:00Z"
  }'
```

**Response:**
```json
{
  "ok": true,
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write API docs for all endpoints",
    "priority": "high",
    "status": "pending",
    "dueDate": "2025-12-10T18:00:00Z",
    "createdAt": "2025-12-07T17:00:00Z"
  }
}
```

---

## List Tasks

Get all tasks for the current user.

```bash
curl http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**With filters:**
```bash
# Filter by status
curl "http://localhost:3000/tasks?status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by priority
curl "http://localhost:3000/tasks?priority=high" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Task

Get task details by ID.

```bash
curl http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Update Task

Update a task.

```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "priority": "medium"
  }'
```

---

## Complete Task

Mark a task as completed.

```bash
curl -X POST http://localhost:3000/tasks/1/complete \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Task

Delete a task.

```bash
curl -X DELETE http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

