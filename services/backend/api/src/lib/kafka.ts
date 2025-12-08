// src/lib/kafka.ts
// Apache Kafka client for event-driven architecture

import { Kafka, logLevel } from 'kafkajs';
import type { Producer, Consumer, EachMessagePayload } from 'kafkajs';

// ============ CONFIGURATION ============

const KAFKA_BROKERS = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'paka-api';

// ============ TOPICS ============

export const TOPICS = {
  // Document processing
  DOCUMENT_UPLOADED: 'document.uploaded',
  DOCUMENT_PARSED: 'document.parsed',
  DOCUMENT_EMBEDDED: 'document.embedded',
  
  // Notifications
  NOTIFICATION_SEND: 'notification.send',
  NOTIFICATION_SENT: 'notification.sent',
  
  // Audit
  AUDIT_EVENT: 'audit.event',
  
  // Reports
  REPORT_GENERATE: 'report.generate',
  REPORT_READY: 'report.ready',
  
  // Sync jobs
  EMAIL_SYNC: 'email.sync',
  CALENDAR_SYNC: 'calendar.sync',
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];

// ============ EVENT TYPES ============

export interface DocumentUploadedEvent {
  documentId: number;
  userId: number;
  filename: string;
  filePath: string;
  mimeType: string;
  timestamp: string;
}

export interface DocumentParsedEvent {
  documentId: number;
  userId: number;
  chunkCount: number;
  totalTokens: number;
  timestamp: string;
}

export interface DocumentEmbeddedEvent {
  documentId: number;
  userId: number;
  vectorCount: number;
  timestamp: string;
}

export interface NotificationEvent {
  userId: number;
  type: 'telegram' | 'email';
  title: string;
  body: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface AuditEvent {
  userId: number | null;
  action: string;
  resource: string;
  resourceId?: string | number;
  details?: Record<string, any>;
  ip?: string;
  timestamp: string;
}

export interface ReportGenerateEvent {
  userId: number;
  reportType: 'daily' | 'weekly' | 'monthly';
  options?: Record<string, any>;
  timestamp: string;
}

// ============ KAFKA CLIENT ============

let kafka: Kafka | null = null;
let producer: Producer | null = null;
let consumers: Map<string, Consumer> = new Map();
let isConnected = false;

/**
 * Get Kafka instance (lazy initialization)
 */
function getKafka(): Kafka {
  if (!kafka) {
    kafka = new Kafka({
      clientId: KAFKA_CLIENT_ID,
      brokers: KAFKA_BROKERS,
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
  }
  return kafka;
}

/**
 * Initialize Kafka producer
 */
export async function initKafkaProducer(): Promise<void> {
  try {
    const kafkaInstance = getKafka();
    producer = kafkaInstance.producer();
    
    await producer.connect();
    isConnected = true;
    console.log('✅ Kafka producer connected');
  } catch (error) {
    console.warn('⚠️ Kafka producer connection failed:', (error as Error).message);
    isConnected = false;
  }
}

/**
 * Check if Kafka is connected
 */
export function isKafkaConnected(): boolean {
  return isConnected;
}

/**
 * Publish event to Kafka topic
 */
export async function publishEvent<T>(
  topic: TopicName,
  event: T,
  key?: string
): Promise<void> {
  if (!producer || !isConnected) {
    console.warn(`Kafka not connected, skipping event to ${topic}`);
    return;
  }

  try {
    await producer.send({
      topic,
      messages: [
        {
          key: key || undefined,
          value: JSON.stringify(event),
          timestamp: Date.now().toString(),
        },
      ],
    });
    
    console.log(`📤 Event published to ${topic}`);
  } catch (error) {
    console.error(`Failed to publish to ${topic}:`, (error as Error).message);
  }
}

/**
 * Create and connect a consumer
 */
export async function createConsumer(
  groupId: string,
  topics: TopicName[],
  handler: (payload: EachMessagePayload) => Promise<void>
): Promise<Consumer | null> {
  try {
    const kafkaInstance = getKafka();
    const consumer = kafkaInstance.consumer({ groupId });
    
    await consumer.connect();
    
    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: false });
    }
    
    await consumer.run({
      eachMessage: handler,
    });
    
    consumers.set(groupId, consumer);
    console.log(`✅ Kafka consumer '${groupId}' connected to: ${topics.join(', ')}`);
    
    return consumer;
  } catch (error) {
    console.warn(`⚠️ Kafka consumer '${groupId}' failed:`, (error as Error).message);
    return null;
  }
}

/**
 * Disconnect all Kafka clients
 */
export async function disconnectKafka(): Promise<void> {
  if (producer) {
    await producer.disconnect();
    producer = null;
  }
  
  for (const [groupId, consumer] of consumers) {
    await consumer.disconnect();
    console.log(`Kafka consumer '${groupId}' disconnected`);
  }
  consumers.clear();
  
  isConnected = false;
  console.log('Kafka disconnected');
}

// ============ HELPER FUNCTIONS ============

/**
 * Publish document uploaded event
 */
export async function publishDocumentUploaded(event: DocumentUploadedEvent): Promise<void> {
  await publishEvent(TOPICS.DOCUMENT_UPLOADED, event, event.documentId.toString());
}

/**
 * Publish notification event
 */
export async function publishNotification(event: NotificationEvent): Promise<void> {
  await publishEvent(TOPICS.NOTIFICATION_SEND, event, event.userId.toString());
}

/**
 * Publish audit event
 */
export async function publishAuditEvent(event: AuditEvent): Promise<void> {
  await publishEvent(TOPICS.AUDIT_EVENT, event);
}

/**
 * Publish report generation request
 */
export async function publishReportGenerate(event: ReportGenerateEvent): Promise<void> {
  await publishEvent(TOPICS.REPORT_GENERATE, event, event.userId.toString());
}

// ============ PARSE EVENT ============

/**
 * Parse event from Kafka message
 */
export function parseEvent<T>(message: Buffer | null): T | null {
  if (!message) return null;
  
  try {
    return JSON.parse(message.toString()) as T;
  } catch {
    return null;
  }
}

