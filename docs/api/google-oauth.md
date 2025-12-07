# Google OAuth API

Base URL: `http://localhost:3000`

> **Note:** This is the unified Google OAuth for all Google services (Gmail, Calendar, Docs, Drive, Fit).

---

## Connect Google Account

Get the OAuth URL to connect your Google account.

```bash
curl http://localhost:3000/google/auth \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "message": "Open this URL to connect your Google account",
  "scopes": ["gmail", "calendar", "docs", "drive", "fitness"]
}
```

**Steps:**
1. Open the `authUrl` in your browser
2. Select your Google account
3. Click "Advanced" → "Go to Paka (unsafe)"
4. Allow all permissions
5. You'll be redirected to `/google/callback`

---

## OAuth Callback

This is called automatically after Google login.

```
GET /google/callback?code=AUTHORIZATION_CODE
```

**Response:**
```json
{
  "ok": true,
  "message": "Google account connected successfully!",
  "email": "user@gmail.com",
  "name": "John Doe",
  "services": ["Gmail", "Calendar", "Docs", "Drive", "Fit"]
}
```

---

## Check Connection Status

```bash
curl http://localhost:3000/google/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (Connected):**
```json
{
  "ok": true,
  "connected": true,
  "email": "user@gmail.com",
  "name": "John Doe",
  "picture": "https://...",
  "services": ["Gmail", "Calendar", "Docs", "Drive", "Fit"]
}
```

**Response (Not Connected):**
```json
{
  "ok": true,
  "connected": false,
  "message": "Google account not connected. Use /google/auth to connect."
}
```

---

## Disconnect Google Account

```bash
curl -X POST http://localhost:3000/google/disconnect \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Services Enabled After Connection

Once connected, you can use:

| Service | Endpoint | Description |
|---------|----------|-------------|
| Gmail | `/gmail/*` | Read, send, manage emails |
| Calendar | `/calendar/*` | Events, scheduling |
| Docs | `/docs/*` | Documents (coming soon) |
| Drive | `/drive/*` | Files (coming soon) |
| Fit | `/fit/*` | Health data (coming soon) |

---

## Required Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable these APIs:
   - Gmail API
   - Google Calendar API
   - Google Docs API
   - Google Drive API
   - Fitness API
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/google/callback`
6. Add your email as test user

