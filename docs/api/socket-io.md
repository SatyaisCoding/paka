# Socket.IO Real-Time API

Paka uses Socket.IO for real-time bidirectional communication between the server and clients. This enables instant notifications, live updates, and real-time event streaming.

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│   ┌──────────┐  WebSocket  ┌──────────┐  Events  ┌───────────┐  │
│   │  Client  │◄──────────►│ Socket.IO │◄─────────│   Kafka   │  │
│   │ (Browser)│             │  Server   │          │ Consumers │  │
│   └──────────┘             └──────────┘          └───────────┘  │
│        │                        │                      │         │
│   Real-time              Authentication           Async Events   │
│   Updates                JWT Validation          (notifications, │
│                                                   documents...)   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## 🔌 Connection

### WebSocket Endpoint

```
ws://localhost:3000
```

### Authentication

Socket.IO connections require a valid JWT token. Pass it via:

**Option 1: Auth object (recommended)**
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

**Option 2: Query parameter**
```javascript
const socket = io('http://localhost:3000?token=your-jwt-token');
```

## 📡 Events

### Server → Client Events

| Event | Description | Payload |
|-------|-------------|---------|
| `connected` | Connection established | `{ message, socketId, userId, timestamp }` |
| `notification` | User notification | `{ type, title, message, data?, timestamp }` |
| `broadcast` | Broadcast to all users | `{ title, message, from, timestamp }` |
| `pong` | Response to ping | `{ timestamp }` |
| `kafka-event` | Kafka event stream | `{ topic, event, timestamp }` |

### Client → Server Events

| Event | Description | Payload |
|-------|-------------|---------|
| `ping` | Health check | (none) |
| `subscribe` | Join a channel | `channelName: string` |
| `unsubscribe` | Leave a channel | `channelName: string` |

## 🔔 Notification Types

```typescript
interface Notification {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  data?: any;
  timestamp: string;
}
```

### Examples

**New Email:**
```json
{
  "type": "info",
  "title": "📧 New Email",
  "message": "From: john@example.com\nSubject: Meeting Tomorrow",
  "data": { "from": "john@example.com", "subject": "Meeting Tomorrow", "id": "abc123" },
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

**Upcoming Event:**
```json
{
  "type": "warning",
  "title": "📅 Upcoming Event",
  "message": "Team Standup at 10:00 AM",
  "data": { "title": "Team Standup", "time": "10:00 AM", "location": "Zoom" },
  "timestamp": "2025-12-08T09:55:00.000Z"
}
```

**Alarm:**
```json
{
  "type": "warning",
  "title": "⏰ Alarm",
  "message": "Wake up!",
  "data": { "title": "Wake up!", "time": "2025-12-08T07:00:00.000Z" },
  "timestamp": "2025-12-08T07:00:00.000Z"
}
```

**Document Processed:**
```json
{
  "type": "success",
  "title": "📄 Document Ready",
  "message": "report.pdf has been processed (15 chunks)",
  "data": { "id": 42, "title": "report.pdf", "chunks": 15 },
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

**Report Ready:**
```json
{
  "type": "success",
  "title": "📊 Report Ready",
  "message": "Your weekly report is ready!",
  "data": { "type": "weekly" },
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

## 📺 Channels/Rooms

| Channel | Description |
|---------|-------------|
| `user:{userId}` | User-specific notifications (auto-joined) |
| `kafka-events` | Kafka event stream for monitoring |
| `notifications` | General notification channel |

### Subscribe to Kafka Events (Monitoring)

```javascript
socket.emit('subscribe', 'kafka-events');

socket.on('kafka-event', (data) => {
  console.log(`Kafka event on topic ${data.topic}:`, data.event);
});
```

---

## 🧪 REST API Endpoints

### `GET /socket/status`

Check Socket.IO server status.

```bash
curl http://localhost:3000/socket/status
```

**Response:**
```json
{
  "ok": true,
  "socketio": {
    "ready": true,
    "connectedUsers": 3,
    "totalConnections": 5,
    "endpoint": "ws://localhost:3000"
  },
  "events": [
    "notification",
    "connected",
    "pong",
    "kafka-event",
    "email:new",
    "event:upcoming",
    "alarm:trigger",
    "task:due",
    "document:processed",
    "report:ready"
  ],
  "rooms": [
    "user:{userId}",
    "kafka-events",
    "notifications"
  ],
  "message": "Socket.IO is running and accepting connections"
}
```

### `GET /socket/connections` (Auth Required)

Get your connection info.

```bash
curl http://localhost:3000/socket/connections \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "you": {
    "userId": 39,
    "connected": true
  },
  "server": {
    "connectedUsers": 3,
    "totalConnections": 5
  }
}
```

### `POST /socket/test/notification` (Auth Required)

Send a test notification to yourself.

```bash
curl -X POST http://localhost:3000/socket/test/notification \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "info",
    "title": "Test",
    "message": "Hello from Socket.IO!"
  }'
```

**Response:**
```json
{
  "ok": true,
  "message": "Notification sent via Socket.IO",
  "userConnected": true,
  "note": "User is connected, notification delivered"
}
```

### `POST /socket/test/email` (Auth Required)

Test new email notification.

```bash
curl -X POST http://localhost:3000/socket/test/email \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "sender@example.com",
    "subject": "Test Email"
  }'
```

### `POST /socket/test/event` (Auth Required)

Test upcoming calendar event notification.

```bash
curl -X POST http://localhost:3000/socket/test/event \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team Meeting",
    "time": "2025-12-08T15:00:00Z",
    "location": "Conference Room A"
  }'
```

### `POST /socket/test/alarm` (Auth Required)

Test alarm notification.

```bash
curl -X POST http://localhost:3000/socket/test/alarm \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wake up!"
  }'
```

### `POST /socket/test/broadcast` (Auth Required)

Broadcast message to all connected users.

```bash
curl -X POST http://localhost:3000/socket/test/broadcast \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "System Announcement",
    "message": "Server maintenance in 10 minutes"
  }'
```

---

## 💻 Client Examples

### Browser (JavaScript)

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
  const token = 'your-jwt-token';
  
  const socket = io('http://localhost:3000', {
    auth: { token }
  });

  socket.on('connected', (data) => {
    console.log('Connected to Paka:', data);
  });

  socket.on('notification', (notification) => {
    console.log('New notification:', notification);
    // Show in UI, play sound, etc.
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
  });

  // Ping-pong health check
  setInterval(() => {
    socket.emit('ping');
  }, 30000);

  socket.on('pong', (data) => {
    console.log('Server alive:', data.timestamp);
  });
</script>
```

### React

```tsx
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

function useSocket(token: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      auth: { token },
    });

    newSocket.on('connected', () => setConnected(true));
    newSocket.on('disconnect', () => setConnected(false));
    
    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  return { socket, connected, notifications };
}

// Usage in component
function App() {
  const { connected, notifications } = useSocket(myJwtToken);

  return (
    <div>
      <div>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</div>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.title}: {n.message}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Node.js Client

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: 'your-jwt-token' },
});

socket.on('connected', (data) => {
  console.log('Connected:', data);
});

socket.on('notification', (notification) => {
  console.log('📬 Notification:', notification.title, '-', notification.message);
});

// Subscribe to Kafka events for monitoring
socket.emit('subscribe', 'kafka-events');
socket.on('kafka-event', (data) => {
  console.log(`[Kafka] ${data.topic}:`, data.event);
});
```

---

## 🔗 Integration with Kafka

Socket.IO is integrated with Kafka consumers. When Kafka processes events, they are automatically pushed to connected clients:

| Kafka Topic | Socket.IO Event |
|-------------|-----------------|
| `document.uploaded` → processed | `notification` (document ready) |
| `notification.send` | `notification` (all types) |
| `report.generate` → ready | `notification` (report ready) |
| All topics | `kafka-event` (for monitoring) |

---

## 🛡️ Security

- **Authentication**: All connections require valid JWT token
- **User isolation**: Each user only receives their own notifications
- **Room-based access**: Users auto-join `user:{userId}` room only
- **CORS**: Configure allowed origins in production

---

## 📊 Monitoring

Monitor Socket.IO from the API:

```bash
# Check status
curl http://localhost:3000/socket/status

# Watch Kafka events (from client)
socket.emit('subscribe', 'kafka-events');
socket.on('kafka-event', console.log);
```

