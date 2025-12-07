# Reminders API

Base URL: `http://localhost:3000`

> **Note:** All reminder endpoints require authentication.

---

## Create Reminder

Create a new reminder.

```bash
curl -X POST http://localhost:3000/reminders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team meeting",
    "description": "Weekly sync with the team",
    "remindAt": "2025-12-08T10:00:00Z",
    "repeat": "weekly"
  }'
```

**Response:**
```json
{
  "ok": true,
  "reminder": {
    "id": 1,
    "title": "Team meeting",
    "description": "Weekly sync with the team",
    "remindAt": "2025-12-08T10:00:00Z",
    "repeat": "weekly",
    "isActive": true,
    "createdAt": "2025-12-07T17:00:00Z"
  }
}
```

---

## List Reminders

Get all reminders for the current user.

```bash
curl http://localhost:3000/reminders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**With filters:**
```bash
# Only active reminders
curl "http://localhost:3000/reminders?active=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Upcoming reminders
curl "http://localhost:3000/reminders?upcoming=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Reminder

Get reminder details by ID.

```bash
curl http://localhost:3000/reminders/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Update Reminder

Update a reminder.

```bash
curl -X PATCH http://localhost:3000/reminders/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "remindAt": "2025-12-09T10:00:00Z",
    "repeat": "daily"
  }'
```

---

## Snooze Reminder

Snooze a reminder for a specified duration.

```bash
curl -X POST http://localhost:3000/reminders/1/snooze \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "duration": 30
  }'
```

---

## Dismiss Reminder

Dismiss/deactivate a reminder.

```bash
curl -X POST http://localhost:3000/reminders/1/dismiss \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Reminder

Delete a reminder.

```bash
curl -X DELETE http://localhost:3000/reminders/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

