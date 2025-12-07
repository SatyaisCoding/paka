# Auth API

Base URL: `http://localhost:3000`

## Signup

Create a new user account.

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword123",
    "displayName": "John Doe"
  }'
```

**Response:**
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "displayName": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Login

Authenticate and get a JWT token.

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword123"
  }'
```

**Response:**
```json
{
  "ok": true,
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Get Current User

Get the logged-in user's profile.

```bash
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Update Profile

Update user's display name or timezone.

```bash
curl -X PATCH http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "New Name",
    "timezone": "Asia/Kolkata"
  }'
```

---

## Change Password

Change the user's password.

```bash
curl -X POST http://localhost:3000/auth/change-password \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword456"
  }'
```

---

## Delete Account

Delete the user's account permanently.

```bash
curl -X DELETE http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

