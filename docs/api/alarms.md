# Alarms API

Base URL: `http://localhost:3000`

> **Note:** Alarms are stored in-memory. For production, consider persisting to database.

---

## List All Alarms

```bash
curl http://localhost:3000/alarms \
  -H "Authorization: Bearer YOUR_TOKEN"

# Only active alarms
curl "http://localhost:3000/alarms?active=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Alarm Statistics

```bash
curl http://localhost:3000/alarms/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "total": 5,
  "active": 3,
  "inactive": 2,
  "upcoming": 1
}
```

---

## Get Upcoming Alarms

```bash
# Next 24 hours (default)
curl http://localhost:3000/alarms/upcoming \
  -H "Authorization: Bearer YOUR_TOKEN"

# Next 48 hours
curl "http://localhost:3000/alarms/upcoming?hours=48" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Triggered Alarms

Get alarms that should trigger right now.

```bash
curl http://localhost:3000/alarms/triggered \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Alarm

```bash
curl http://localhost:3000/alarms/ALARM_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Create Alarm

```bash
# One-time alarm
curl -X POST http://localhost:3000/alarms \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wake up",
    "time": "2025-12-08T07:00:00+05:30",
    "repeat": "none"
  }'

# Daily alarm
curl -X POST http://localhost:3000/alarms \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Morning workout",
    "description": "30 minutes exercise",
    "time": "2025-12-08T06:30:00+05:30",
    "repeat": "daily"
  }'

# Weekdays only
curl -X POST http://localhost:3000/alarms \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Work standup",
    "time": "2025-12-08T09:00:00+05:30",
    "repeat": "weekdays"
  }'

# Custom days (Mon, Wed, Fri)
curl -X POST http://localhost:3000/alarms \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Gym day",
    "time": "2025-12-08T18:00:00+05:30",
    "repeat": "custom",
    "repeatDays": [1, 3, 5]
  }'
```

**Repeat Options:**
- `none` - One-time alarm
- `daily` - Every day
- `weekly` - Same day each week
- `weekdays` - Monday to Friday
- `weekends` - Saturday and Sunday
- `custom` - Specific days (use `repeatDays`: 0=Sun, 1=Mon, ..., 6=Sat)

---

## Update Alarm

```bash
curl -X PATCH http://localhost:3000/alarms/ALARM_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated alarm title",
    "time": "2025-12-08T08:00:00+05:30"
  }'
```

---

## Toggle Alarm On/Off

```bash
curl -X POST http://localhost:3000/alarms/ALARM_ID/toggle \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Snooze Alarm

```bash
# Snooze for 5 minutes (default)
curl -X POST http://localhost:3000/alarms/ALARM_ID/snooze \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'

# Snooze for 15 minutes
curl -X POST http://localhost:3000/alarms/ALARM_ID/snooze \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"minutes": 15}'
```

---

## Mark Alarm as Triggered

When an alarm goes off, mark it as triggered.

```bash
curl -X POST http://localhost:3000/alarms/ALARM_ID/triggered \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Alarm

```bash
curl -X DELETE http://localhost:3000/alarms/ALARM_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

