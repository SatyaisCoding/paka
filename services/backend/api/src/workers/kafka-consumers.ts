// src/workers/kafka-consumers.ts
// Kafka consumers for async event processing

import type { EachMessagePayload } from 'kafkajs';
import {
  createConsumer,
  TOPICS,
  parseEvent,
  publishEvent,
} from '../lib/kafka.js';
import type {
  DocumentUploadedEvent,
  NotificationEvent,
  AuditEvent,
  ReportGenerateEvent,
} from '../lib/kafka.js';
import { sendMessage } from '../services/telegram.service.js';
import { getWeeklyReportText } from '../services/report.service.js';
import prisma from '../lib/prisma.js';
import {
  notifyDocumentProcessed,
  notifyReportReady,
  emitNotification,
  broadcastKafkaEvent,
  isSocketIOReady,
} from '../lib/socket.js';

// ============ DOCUMENT PROCESSOR ============

async function handleDocumentUploaded(payload: EachMessagePayload): Promise<void> {
  const event = parseEvent<DocumentUploadedEvent>(payload.message.value);
  if (!event) return;

  console.log(`📄 Processing document: ${event.filename} (ID: ${event.documentId})`);

  // Broadcast Kafka event for monitoring
  if (isSocketIOReady()) {
    broadcastKafkaEvent(TOPICS.DOCUMENT_UPLOADED, { documentId: event.documentId, filename: event.filename });
  }

  try {
    // For now, just log the event
    // Embedding generation can be added later
    console.log(`✅ Document ${event.documentId} event processed`);

    // Notify user via Socket.IO
    if (isSocketIOReady()) {
      notifyDocumentProcessed(event.userId, {
        id: event.documentId,
        title: event.filename,
        chunks: 0, // Will be updated when embedding is implemented
      });
    }

    // Publish completion event
    await publishEvent(TOPICS.DOCUMENT_EMBEDDED, {
      documentId: event.documentId,
      userId: event.userId,
      vectorCount: 0,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`Failed to process document ${event.documentId}:`, error);
  }
}

// ============ NOTIFICATION PROCESSOR ============

async function handleNotification(payload: EachMessagePayload): Promise<void> {
  const event = parseEvent<NotificationEvent>(payload.message.value);
  if (!event) return;

  console.log(`🔔 Sending notification: ${event.title}`);

  // Broadcast Kafka event for monitoring
  if (isSocketIOReady()) {
    broadcastKafkaEvent(TOPICS.NOTIFICATION_SEND, { userId: event.userId, title: event.title });
  }

  try {
    // Send to Telegram if configured
    if (event.type === 'telegram') {
      const message = `*${event.title}*\n\n${event.body}`;
      await sendMessage({ text: message, parseMode: 'Markdown' });
      console.log(`✅ Telegram notification sent: ${event.title}`);
    }

    // Also send via Socket.IO for real-time UI updates
    if (isSocketIOReady() && event.userId) {
      emitNotification(event.userId, {
        type: 'info',
        title: event.title,
        message: event.body,
        data: event.data,
      });
    }

    // Publish sent event
    await publishEvent(TOPICS.NOTIFICATION_SENT, {
      ...event,
      sentAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`Failed to send notification:`, error);
  }
}

// ============ AUDIT LOGGER ============

async function handleAuditEvent(payload: EachMessagePayload): Promise<void> {
  const event = parseEvent<AuditEvent>(payload.message.value);
  if (!event) return;

  // Broadcast Kafka event for monitoring
  if (isSocketIOReady()) {
    broadcastKafkaEvent(TOPICS.AUDIT_EVENT, { action: event.action, userId: event.userId });
  }

  try {
    await prisma.auditLog.create({
      data: {
        userId: event.userId,
        action: event.action,
        details: event.details || {},
        ip: event.ip,
        createdAt: new Date(event.timestamp),
      },
    });

    console.log(`📝 Audit logged: ${event.action} by user ${event.userId}`);
  } catch (error) {
    console.error(`Failed to log audit event:`, error);
  }
}

// ============ REPORT GENERATOR ============

async function handleReportGenerate(payload: EachMessagePayload): Promise<void> {
  const event = parseEvent<ReportGenerateEvent>(payload.message.value);
  if (!event) return;

  console.log(`📊 Generating ${event.reportType} report for user ${event.userId}`);

  // Broadcast Kafka event for monitoring
  if (isSocketIOReady()) {
    broadcastKafkaEvent(TOPICS.REPORT_GENERATE, { userId: event.userId, reportType: event.reportType });
  }

  try {
    const reportText = await getWeeklyReportText(event.userId, 0);

    // Send report via Telegram
    await sendMessage({ text: reportText, parseMode: 'Markdown' });

    console.log(`✅ ${event.reportType} report sent for user ${event.userId}`);

    // Notify user via Socket.IO
    if (isSocketIOReady()) {
      notifyReportReady(event.userId, { type: event.reportType });
    }

    // Publish completion
    await publishEvent(TOPICS.REPORT_READY, {
      userId: event.userId,
      reportType: event.reportType,
      completedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error(`Failed to generate report:`, error);
  }
}

// ============ START CONSUMERS ============

export async function startKafkaConsumers(): Promise<void> {
  console.log('🚀 Starting Kafka consumers...');

  // Document processor
  await createConsumer(
    'paka-document-processor',
    [TOPICS.DOCUMENT_UPLOADED],
    handleDocumentUploaded
  );

  // Notification processor
  await createConsumer(
    'paka-notification-processor',
    [TOPICS.NOTIFICATION_SEND],
    handleNotification
  );

  // Audit logger
  await createConsumer(
    'paka-audit-logger',
    [TOPICS.AUDIT_EVENT],
    handleAuditEvent
  );

  // Report generator
  await createConsumer(
    'paka-report-generator',
    [TOPICS.REPORT_GENERATE],
    handleReportGenerate
  );

  console.log('✅ All Kafka consumers started');
}
