# Telegram Bot API

Base URL: `http://localhost:3000`

> **Setup:**
> 1. Create bot via @BotFather on Telegram
> 2. Get your chat ID via @userinfobot
> 3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in .env

---

## Check Status

```bash
curl http://localhost:3000/telegram/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Bot Info

```bash
curl http://localhost:3000/telegram/bot \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Send Message

```bash
curl -X POST http://localhost:3000/telegram/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello from Paka! 🚀"
  }'

# With Markdown
curl -X POST http://localhost:3000/telegram/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "*Bold* and _italic_ text",
    "parseMode": "Markdown"
  }'
```

---

## Send Notification

```bash
curl -X POST http://localhost:3000/telegram/notify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task Completed",
    "body": "Your report has been generated successfully."
  }'
```

---

## Send Alarm Notification

```bash
curl -X POST http://localhost:3000/telegram/alarm \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wake up!",
    "time": "7:00 AM"
  }'
```

---

## Send Reminder

```bash
curl -X POST http://localhost:3000/telegram/reminder \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "body": "Starting in 15 minutes"
  }'
```

---

## Send Event Notification

```bash
curl -X POST http://localhost:3000/telegram/event \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Review",
    "time": "3:00 PM",
    "location": "Conference Room A"
  }'
```

---

## Send Test Message

```bash
curl -X POST http://localhost:3000/telegram/test \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Updates

```bash
curl http://localhost:3000/telegram/updates \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Webhook Info

```bash
curl http://localhost:3000/telegram/webhook \
  -H "Authorization: Bearer YOUR_TOKEN"
```

