// src/lib/socket.ts
// Socket.IO server for real-time communication

import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';

// ============ TYPES ============

interface AuthenticatedSocket extends Socket {
  userId?: number;
  email?: string;
}

interface NotificationPayload {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  data?: Record<string, any>;
  timestamp: string;
}

interface EventPayload {
  event: string;
  data: any;
  timestamp: string;
}

// ============ SOCKET.IO SERVER ============

let io: SocketIOServer | null = null;
const userSockets: Map<number, Set<string>> = new Map(); // userId -> socketIds

/**
 * Initialize Socket.IO server
 */
export function initSocketIO(httpServer: HTTPServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', // Configure for production
      methods: ['GET', 'POST'],
    },
    pingInterval: 25000,
    pingTimeout: 60000,
  });

  // Authentication middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        userId: number;
        email: string;
      };
      
      socket.userId = decoded.userId;
      socket.email = decoded.email;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    
    console.log(`🔌 Socket connected: ${socket.id} (user: ${userId})`);

    // Track user's sockets
    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Send welcome message
    socket.emit('connected', {
      message: 'Connected to Paka real-time server',
      socketId: socket.id,
      userId,
      timestamp: new Date().toISOString(),
    });

    // Handle client events
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date().toISOString() });
    });

    socket.on('subscribe', (channel: string) => {
      socket.join(channel);
      console.log(`📡 Socket ${socket.id} subscribed to: ${channel}`);
    });

    socket.on('unsubscribe', (channel: string) => {
      socket.leave(channel);
      console.log(`📡 Socket ${socket.id} unsubscribed from: ${channel}`);
    });

    // Disconnect handler
    socket.on('disconnect', (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.id} (reason: ${reason})`);
      
      userSockets.get(userId)?.delete(socket.id);
      if (userSockets.get(userId)?.size === 0) {
        userSockets.delete(userId);
      }
    });
  });

  console.log('✅ Socket.IO initialized');
  return io;
}

/**
 * Get Socket.IO server instance
 */
export function getIO(): SocketIOServer | null {
  return io;
}

/**
 * Check if Socket.IO is initialized
 */
export function isSocketIOReady(): boolean {
  return io !== null;
}

// ============ EMIT FUNCTIONS ============

/**
 * Emit event to a specific user
 */
export function emitToUser(userId: number, event: string, data: any): void {
  if (!io) return;
  
  io.to(`user:${userId}`).emit(event, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit notification to a specific user
 */
export function emitNotification(userId: number, notification: Omit<NotificationPayload, 'timestamp'>): void {
  emitToUser(userId, 'notification', {
    ...notification,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit event to all connected clients
 */
export function emitToAll(event: string, data: any): void {
  if (!io) return;
  
  io.emit(event, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit event to a specific channel/room
 */
export function emitToChannel(channel: string, event: string, data: any): void {
  if (!io) return;
  
  io.to(channel).emit(event, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Get count of connected users
 */
export function getConnectedUsersCount(): number {
  return userSockets.size;
}

/**
 * Get count of total connections
 */
export function getConnectionsCount(): number {
  let count = 0;
  userSockets.forEach((sockets) => {
    count += sockets.size;
  });
  return count;
}

/**
 * Check if a user is connected
 */
export function isUserConnected(userId: number): boolean {
  return userSockets.has(userId) && userSockets.get(userId)!.size > 0;
}

// ============ PREDEFINED EVENTS ============

/**
 * Notify user about new email
 */
export function notifyNewEmail(userId: number, email: { from: string; subject: string; id: string }): void {
  emitNotification(userId, {
    type: 'info',
    title: '📧 New Email',
    message: `From: ${email.from}\n${email.subject}`,
    data: email,
  });
}

/**
 * Notify user about upcoming event
 */
export function notifyUpcomingEvent(userId: number, event: { title: string; time: string; location?: string }): void {
  emitNotification(userId, {
    type: 'warning',
    title: '📅 Upcoming Event',
    message: `${event.title} at ${event.time}`,
    data: event,
  });
}

/**
 * Notify user about alarm
 */
export function notifyAlarm(userId: number, alarm: { title: string; time: string }): void {
  emitNotification(userId, {
    type: 'warning',
    title: '⏰ Alarm',
    message: alarm.title,
    data: alarm,
  });
}

/**
 * Notify user about task due
 */
export function notifyTaskDue(userId: number, task: { title: string; dueAt: string }): void {
  emitNotification(userId, {
    type: 'warning',
    title: '✅ Task Due',
    message: task.title,
    data: task,
  });
}

/**
 * Notify user about document processed
 */
export function notifyDocumentProcessed(userId: number, doc: { id: number; title: string; chunks: number }): void {
  emitNotification(userId, {
    type: 'success',
    title: '📄 Document Ready',
    message: `${doc.title} has been processed (${doc.chunks} chunks)`,
    data: doc,
  });
}

/**
 * Notify user about report ready
 */
export function notifyReportReady(userId: number, report: { type: string }): void {
  emitNotification(userId, {
    type: 'success',
    title: '📊 Report Ready',
    message: `Your ${report.type} report is ready!`,
    data: report,
  });
}

/**
 * Broadcast Kafka event to monitoring channel
 */
export function broadcastKafkaEvent(topic: string, event: any): void {
  emitToChannel('kafka-events', 'kafka-event', {
    topic,
    event,
  });
}

