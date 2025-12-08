// src/routes/socket.ts
// Socket.IO management and testing routes

import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  isSocketIOReady,
  getConnectedUsersCount,
  getConnectionsCount,
  isUserConnected,
  emitToUser,
  emitNotification,
  emitToAll,
  emitToChannel,
  notifyNewEmail,
  notifyUpcomingEvent,
  notifyAlarm,
  notifyTaskDue,
  notifyDocumentProcessed,
  notifyReportReady,
} from '../lib/socket.js';

const socket = new Hono();

// ============ STATUS ============

/**
 * GET /socket/status - Get Socket.IO server status
 */
socket.get('/status', (c) => {
  const ready = isSocketIOReady();
  
  return c.json({
    ok: true,
    socketio: {
      ready,
      connectedUsers: ready ? getConnectedUsersCount() : 0,
      totalConnections: ready ? getConnectionsCount() : 0,
      endpoint: `ws://localhost:${process.env.PORT || 3000}`,
    },
    events: [
      'notification',
      'connected',
      'pong',
      'kafka-event',
      'email:new',
      'event:upcoming',
      'alarm:trigger',
      'task:due',
      'document:processed',
      'report:ready',
    ],
    rooms: [
      'user:{userId}',
      'kafka-events',
      'notifications',
    ],
    message: ready
      ? 'Socket.IO is running and accepting connections'
      : 'Socket.IO not initialized',
  });
});

// ============ TEST ENDPOINTS ============

/**
 * POST /socket/test/notification - Send test notification to yourself
 */
socket.post('/test/notification', authMiddleware, async (c) => {
  try {
    if (!isSocketIOReady()) {
      return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json().catch(() => ({}));

    emitNotification(userId, {
      type: body.type || 'info',
      title: body.title || '🧪 Test Notification',
      message: body.message || 'This is a test notification via Socket.IO!',
      data: body.data,
    });

    return c.json({
      ok: true,
      message: 'Notification sent via Socket.IO',
      userConnected: isUserConnected(userId),
      note: isUserConnected(userId) 
        ? 'User is connected, notification delivered'
        : 'User not connected, notification will be received when they connect',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /socket/test/email - Test new email notification
 */
socket.post('/test/email', authMiddleware, async (c) => {
  try {
    if (!isSocketIOReady()) {
      return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json().catch(() => ({}));

    notifyNewEmail(userId, {
      from: body.from || 'Test Sender <test@example.com>',
      subject: body.subject || 'Test Email Subject',
      id: body.id || 'test-email-id',
    });

    return c.json({
      ok: true,
      message: 'Email notification sent',
      userConnected: isUserConnected(userId),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /socket/test/event - Test upcoming event notification
 */
socket.post('/test/event', authMiddleware, async (c) => {
  try {
    if (!isSocketIOReady()) {
      return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json().catch(() => ({}));

    notifyUpcomingEvent(userId, {
      title: body.title || 'Test Meeting',
      time: body.time || new Date(Date.now() + 5 * 60000).toISOString(),
      location: body.location || 'Conference Room A',
    });

    return c.json({
      ok: true,
      message: 'Event notification sent',
      userConnected: isUserConnected(userId),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /socket/test/alarm - Test alarm notification
 */
socket.post('/test/alarm', authMiddleware, async (c) => {
  try {
    if (!isSocketIOReady()) {
      return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json().catch(() => ({}));

    notifyAlarm(userId, {
      title: body.title || 'Test Alarm',
      time: body.time || new Date().toISOString(),
    });

    return c.json({
      ok: true,
      message: 'Alarm notification sent',
      userConnected: isUserConnected(userId),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /socket/test/broadcast - Broadcast to all connected users
 */
socket.post('/test/broadcast', authMiddleware, async (c) => {
  try {
    if (!isSocketIOReady()) {
      return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
    }

    const body = await c.req.json().catch(() => ({}));

    emitToAll('broadcast', {
      title: body.title || '📢 Broadcast Message',
      message: body.message || 'This is a broadcast to all connected users!',
      from: 'system',
    });

    return c.json({
      ok: true,
      message: 'Broadcast sent to all connected users',
      connectedUsers: getConnectedUsersCount(),
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * GET /socket/connections - Get connection info
 */
socket.get('/connections', authMiddleware, (c) => {
  if (!isSocketIOReady()) {
    return c.json({ ok: false, error: 'Socket.IO not ready' }, 503);
  }

  const userId = getUserId(c);

  return c.json({
    ok: true,
    you: {
      userId,
      connected: isUserConnected(userId),
    },
    server: {
      connectedUsers: getConnectedUsersCount(),
      totalConnections: getConnectionsCount(),
    },
  });
});

export default socket;

