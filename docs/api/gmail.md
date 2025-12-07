# Gmail API

Base URL: `http://localhost:3000`

> **Note:** All Gmail endpoints require authentication. First, connect your Gmail account using the OAuth flow.

---

## Connect Gmail (OAuth)

Get the OAuth URL to connect your Gmail account.

```bash
curl http://localhost:3000/gmail/auth \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "message": "Open this URL to connect your Gmail account"
}
```

Open the `authUrl` in your browser and complete the Google login.

---

## Check Connection Status

Check if Gmail is connected.

```bash
curl http://localhost:3000/gmail/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "connected": true,
  "email": "user@gmail.com",
  "messagesTotal": 53463,
  "threadsTotal": 50794
}
```

---

## Disconnect Gmail

Disconnect your Gmail account.

```bash
curl -X POST http://localhost:3000/gmail/disconnect \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Today's Email Summary (AI)

Get an AI-generated summary of today's emails.

```bash
curl http://localhost:3000/gmail/summary/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "date": "2025-12-07",
  "totalEmails": 17,
  "unreadCount": 13,
  "summary": "Your inbox has critical Google Cloud alerts...",
  "important": ["Update tax info", "Billing suspended"],
  "categories": [
    { "name": "Google Cloud", "count": 4 },
    { "name": "Orders", "count": 3 }
  ]
}
```

---

## Get Custom Email Summary (AI)

Get an AI summary with custom filters.

```bash
curl -X POST http://localhost:3000/gmail/summary \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "linkedin.com",
    "maxResults": 10
  }'
```

---

## List Today's Emails

Get all emails from today.

```bash
curl http://localhost:3000/gmail/emails/today \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**With limit:**
```bash
curl "http://localhost:3000/gmail/emails/today?maxResults=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List Unread Emails

Get all unread emails.

```bash
curl http://localhost:3000/gmail/emails/unread \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## List Emails with Filters

Get emails with various filters.

```bash
# Filter by sender
curl "http://localhost:3000/gmail/emails?from=linkedin.com" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by subject
curl "http://localhost:3000/gmail/emails?subject=testing" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by date range
curl "http://localhost:3000/gmail/emails?after=2025/12/01&before=2025/12/07" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter unread only
curl "http://localhost:3000/gmail/emails?isUnread=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter with attachments
curl "http://localhost:3000/gmail/emails?hasAttachment=true" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by label
curl "http://localhost:3000/gmail/emails?label=INBOX" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Custom Gmail query
curl "http://localhost:3000/gmail/emails?query=is:important" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Limit results
curl "http://localhost:3000/gmail/emails?maxResults=5" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Single Email

Get full email details including body.

```bash
curl http://localhost:3000/gmail/emails/EMAIL_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Example:**
```bash
curl http://localhost:3000/gmail/emails/19af9d9038c65281 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Send Email

Send a new email.

```bash
curl -X POST http://localhost:3000/gmail/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Hello from Paka!",
    "body": "This is a test email sent via Paka API."
  }'
```

**Response:**
```json
{
  "ok": true,
  "message": "Email sent successfully",
  "id": "19af9e1234567890",
  "threadId": "19af9e1234567890"
}
```

---

## Reply to Email

Reply to an existing email.

```bash
curl -X POST http://localhost:3000/gmail/emails/EMAIL_ID/reply \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "body": "Thanks for your email! This is my reply."
  }'
```

---

## Mark as Read

Mark an email as read.

```bash
curl -X POST http://localhost:3000/gmail/emails/EMAIL_ID/read \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Mark as Unread

Mark an email as unread.

```bash
curl -X POST http://localhost:3000/gmail/emails/EMAIL_ID/unread \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Delete Email

Move an email to trash.

```bash
curl -X DELETE http://localhost:3000/gmail/emails/EMAIL_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Labels

Get all Gmail labels/folders.

```bash
curl http://localhost:3000/gmail/labels \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "labels": [
    { "id": "INBOX", "name": "INBOX" },
    { "id": "SENT", "name": "SENT" },
    { "id": "TRASH", "name": "TRASH" }
  ]
}
```

