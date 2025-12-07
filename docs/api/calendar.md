# Google Calendar API

Base URL: `http://localhost:3000`

> **Note:** Requires Google OAuth connection. Use `/google/auth` first.

---

## Check Connection Status

```bash
curl http://localhost:3000/calendar/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List All Calendars

```bash
curl http://localhost:3000/calendar/calendars \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Today's Events

```bash
curl http://localhost:3000/calendar/events/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get This Week's Events

```bash
curl http://localhost:3000/calendar/events/week \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Upcoming Events

```bash
# Next 7 days (default)
curl http://localhost:3000/calendar/events/upcoming \
  -H "Authorization: Bearer YOUR_TOKEN"

# Next 30 days, limit 50
curl "http://localhost:3000/calendar/events/upcoming?days=30&limit=50" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List Events with Filters

```bash
# By date range
curl "http://localhost:3000/calendar/events?timeMin=2025-12-01T00:00:00Z&timeMax=2025-12-31T23:59:59Z" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search by text
curl "http://localhost:3000/calendar/events?q=meeting" \
  -H "Authorization: Bearer YOUR_TOKEN"

# From specific calendar
curl "http://localhost:3000/calendar/events?calendarId=work@gmail.com" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Event

```bash
curl http://localhost:3000/calendar/events/EVENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Create Event

```bash
curl -X POST http://localhost:3000/calendar/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "description": "Weekly sync",
    "location": "Conference Room A",
    "start": "2025-12-10T10:00:00+05:30",
    "end": "2025-12-10T11:00:00+05:30",
    "attendees": ["john@example.com", "jane@example.com"],
    "reminders": [
      {"method": "popup", "minutes": 10},
      {"method": "email", "minutes": 60}
    ]
  }'
```

---

## Quick Add Event (Natural Language)

```bash
curl -X POST http://localhost:3000/calendar/events/quick \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Meeting with John tomorrow at 3pm for 1 hour"
  }'
```

**Examples:**
- `"Lunch with Sarah on Friday at noon"`
- `"Dentist appointment Dec 15 at 2:30pm"`
- `"Team standup every weekday at 9am"`

---

## Update Event

```bash
curl -X PATCH http://localhost:3000/calendar/events/EVENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Meeting Title",
    "location": "Room B"
  }'
```

---

## Delete Event

```bash
curl -X DELETE http://localhost:3000/calendar/events/EVENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## AI Summary - Today

Get an AI-generated summary of today's schedule.

```bash
curl http://localhost:3000/calendar/summary/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "date": "2025-12-07",
  "totalEvents": 5,
  "summary": "You have a busy morning with 3 meetings starting at 9am. Your afternoon is free after 2pm. Don't forget the project deadline review at 11am.",
  "events": [
    {"title": "Standup", "time": "09:00"},
    {"title": "Project Review", "time": "11:00"}
  ]
}
```

---

## AI Summary - Week

Get an AI-generated summary of the week.

```bash
curl http://localhost:3000/calendar/summary/week \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "totalEvents": 15,
  "summary": "This week is moderately busy. Monday and Wednesday are your busiest days with 4 meetings each. Thursday afternoon and Friday are relatively free.",
  "byDay": {
    "Monday, Dec 9": 4,
    "Tuesday, Dec 10": 2,
    "Wednesday, Dec 11": 4
  }
}
```

