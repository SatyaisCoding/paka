// src/routes/kafka.ts
// Kafka management and testing routes

import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  isKafkaConnected,
  TOPICS,
  publishDocumentUploaded,
  publishNotification,
  publishAuditEvent,
  publishReportGenerate,
} from '../lib/kafka.js';

const kafka = new Hono();

// ============ STATUS ============

/**
 * GET /kafka/status - Check Kafka connection status
 */
kafka.get('/status', (c) => {
  const connected = isKafkaConnected();
  
  return c.json({
    ok: true,
    kafka: {
      connected,
      brokers: process.env.KAFKA_BROKERS || 'localhost:9092',
      clientId: process.env.KAFKA_CLIENT_ID || 'paka-api',
    },
    topics: Object.values(TOPICS),
    consumers: connected ? [
      'paka-document-processor',
      'paka-notification-processor',
      'paka-audit-logger',
      'paka-report-generator',
    ] : [],
    message: connected 
      ? 'Kafka is connected and processing events'
      : 'Kafka not connected - async processing disabled',
  });
});

// ============ TEST EVENTS ============

/**
 * POST /kafka/test/notification - Test notification via Kafka
 */
kafka.post('/test/notification', authMiddleware, async (c) => {
  try {
    if (!isKafkaConnected()) {
      return c.json({ ok: false, error: 'Kafka not connected' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json();

    await publishNotification({
      userId,
      type: 'telegram',
      title: body.title || 'Test Notification',
      body: body.body || 'This is a test notification via Kafka!',
      timestamp: new Date().toISOString(),
    });

    return c.json({
      ok: true,
      message: 'Notification event published to Kafka',
      topic: TOPICS.NOTIFICATION_SEND,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /kafka/test/audit - Test audit logging via Kafka
 */
kafka.post('/test/audit', authMiddleware, async (c) => {
  try {
    if (!isKafkaConnected()) {
      return c.json({ ok: false, error: 'Kafka not connected' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json();

    await publishAuditEvent({
      userId,
      action: body.action || 'test_action',
      resource: body.resource || 'test_resource',
      resourceId: body.resourceId,
      details: body.details || { test: true },
      timestamp: new Date().toISOString(),
    });

    return c.json({
      ok: true,
      message: 'Audit event published to Kafka',
      topic: TOPICS.AUDIT_EVENT,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

/**
 * POST /kafka/test/report - Request report generation via Kafka
 */
kafka.post('/test/report', authMiddleware, async (c) => {
  try {
    if (!isKafkaConnected()) {
      return c.json({ ok: false, error: 'Kafka not connected' }, 503);
    }

    const userId = getUserId(c);
    const body = await c.req.json();

    await publishReportGenerate({
      userId,
      reportType: body.reportType || 'weekly',
      options: body.options,
      timestamp: new Date().toISOString(),
    });

    return c.json({
      ok: true,
      message: 'Report generation request published to Kafka',
      topic: TOPICS.REPORT_GENERATE,
      note: 'Report will be generated async and sent to Telegram',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default kafka;

