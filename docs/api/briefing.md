# Daily Briefing API

Base URL: `http://localhost:3000`

> **One API call for your complete morning summary!**
> 
> Combines weather, calendar, emails, tasks, reminders, and alarms into a single response.

---

## Get Full Daily Briefing

The main endpoint that fetches everything in parallel and provides an AI-generated summary.

```bash
curl http://localhost:3000/briefing \
  -H "Authorization: Bearer $TOKEN"

# With custom city for weather
curl "http://localhost:3000/briefing?city=Mumbai" \
  -H "Authorization: Bearer $TOKEN"

# Without AI summary (faster)
curl "http://localhost:3000/briefing?ai=false" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "briefing": {
    "greeting": "Good morning",
    "date": "Sunday, December 8, 2025",
    "dayOfWeek": "Sunday",
    "time": "8:30 AM",
    "weather": {
      "available": true,
      "city": "Delhi",
      "current": "🌤️ 15°C, Mainly clear",
      "today": "High: 24°C, Low: 12°C, 0% chance of rain",
      "temperature": 15,
      "icon": "🌤️"
    },
    "calendar": {
      "available": true,
      "totalEvents": 3,
      "events": [
        { "title": "Team Standup", "time": "9:00 AM", "location": "Zoom" },
        { "title": "Client Call", "time": "2:00 PM" },
        { "title": "Project Review", "time": "4:30 PM", "location": "Conference Room" }
      ]
    },
    "email": {
      "available": true,
      "totalEmails": 12,
      "unread": 5,
      "important": [
        { "from": "John Doe", "subject": "Re: Project Proposal" },
        { "from": "HR Team", "subject": "Monthly Update" }
      ]
    },
    "tasks": {
      "available": true,
      "pending": 8,
      "dueToday": 2,
      "overdue": 1,
      "tasks": [
        { "title": "Review PR #123", "priority": "HIGH", "dueDate": "2025-12-08" },
        { "title": "Update documentation", "priority": "MEDIUM" }
      ]
    },
    "reminders": {
      "available": true,
      "todayCount": 2,
      "reminders": [
        { "title": "Take medication", "time": "9:00 AM" },
        { "title": "Call mom", "time": "6:00 PM" }
      ]
    },
    "alarms": {
      "available": true,
      "activeCount": 2,
      "nextAlarm": {
        "title": "Wake up",
        "time": "7:00 AM"
      }
    },
    "aiSummary": "Good morning! You have a busy day ahead with 3 meetings. Don't forget your 2 tasks due today, including reviewing PR #123. The weather is pleasant at 15°C - perfect for your commute!"
  }
}
```

---

## Get Quick Briefing

Minimal data for quick display or widgets.

```bash
curl http://localhost:3000/briefing/quick \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "greeting": "Good morning",
  "weather": "🌤️ 15°C, Mainly clear",
  "events": 3,
  "emails": 5,
  "tasks": 8
}
```

---

## Get Text Briefing

Formatted text suitable for Telegram, SMS, or notifications.

```bash
curl http://localhost:3000/briefing/text \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "text": "🌅 *Good morning!*\n📅 Sunday, December 8, 2025\n\n🌤️ *Weather:* 🌤️ 15°C, Mainly clear\n   High: 24°C, Low: 12°C, 0% chance of rain\n\n📅 *3 Events Today:*\n   • 9:00 AM: Team Standup\n   • 2:00 PM: Client Call\n   • 4:30 PM: Project Review\n\n📧 *Emails:* 5 unread of 12 today\n   *Important:*\n   • John Doe: Re: Project Proposal...\n\n✅ *Tasks:* 8 pending\n   ⚠️ 2 due today\n   🔴 1 overdue"
}
```

---

## Send Briefing to Telegram

Automatically sends your daily briefing to your configured Telegram chat.

```bash
curl -X POST http://localhost:3000/briefing/telegram \
  -H "Authorization: Bearer $TOKEN"

# With custom city
curl -X POST "http://localhost:3000/briefing/telegram?city=Bangalore" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "message": "Briefing sent to Telegram!",
  "messageId": 12345
}
```

---

## Individual Briefing Sections

Get specific sections only:

### Weather Only
```bash
curl http://localhost:3000/briefing/weather \
  -H "Authorization: Bearer $TOKEN"
```

### Calendar Only
```bash
curl http://localhost:3000/briefing/calendar \
  -H "Authorization: Bearer $TOKEN"
```

### Email Only
```bash
curl http://localhost:3000/briefing/email \
  -H "Authorization: Bearer $TOKEN"
```

### Tasks Only
```bash
curl http://localhost:3000/briefing/tasks \
  -H "Authorization: Bearer $TOKEN"
```

---

## What's Included

| Section | Source | Requires |
|---------|--------|----------|
| **Weather** | Open-Meteo API | Nothing (always available) |
| **Calendar** | Google Calendar | Google OAuth |
| **Email** | Gmail | Google OAuth |
| **Tasks** | Database | Authentication |
| **Reminders** | Database | Authentication |
| **Alarms** | In-memory | Authentication |
| **AI Summary** | Gemini LLM | GEMINI_API_KEY |

---

## Use Cases

### Morning Routine Automation
```bash
# Send briefing to Telegram every morning at 7 AM (via cron)
0 7 * * * curl -X POST "http://localhost:3000/briefing/telegram?city=Delhi" \
  -H "Authorization: Bearer $TOKEN"
```

### Dashboard Widget
```bash
# Quick data for dashboard display
curl http://localhost:3000/briefing/quick -H "Authorization: Bearer $TOKEN"
```

### Voice Assistant Integration
```bash
# Get text for text-to-speech
curl http://localhost:3000/briefing/text -H "Authorization: Bearer $TOKEN"
```

---

## Query Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `city` | Delhi | City for weather data |
| `ai` | true | Include AI-generated summary |

---

## Performance

The briefing endpoint fetches all data in parallel using `Promise.all()`, making it fast despite combining multiple sources:

- Weather: ~200ms
- Calendar: ~300ms
- Email: ~400ms
- Tasks/Reminders/Alarms: ~50ms each

**Total: ~400-500ms** (parallel execution)

