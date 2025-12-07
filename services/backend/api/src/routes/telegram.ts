// src/routes/telegram.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import { z } from 'zod';
import {
  isTelegramConfigured,
  getBotInfo,
  sendMessage,
  sendNotification,
  sendAlarmNotification,
  sendReminderNotification,
  sendEventNotification,
  sendEmailSummary,
  sendDailyBriefing,
  getUpdates,
  deleteMessage,
  editMessage,
  getWebhookInfo,
  getChatId,
} from '../services/telegram.service.js';

const telegram = new Hono();

// Schemas
const sendMessageSchema = z.object({
  text: z.string().min(1).max(4096),
  chatId: z.union([z.string(), z.number()]).optional(),
  parseMode: z.enum(['HTML', 'Markdown', 'MarkdownV2']).optional(),
});

const notificationSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(4000),
  chatId: z.union([z.string(), z.number()]).optional(),
});

const alarmNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  time: z.string().min(1).max(100),
  chatId: z.union([z.string(), z.number()]).optional(),
});

const eventNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  time: z.string().min(1).max(100),
  location: z.string().max(200).optional(),
  chatId: z.union([z.string(), z.number()]).optional(),
});

// ============ STATUS ============

// GET /telegram/status - Check Telegram configuration
telegram.get('/status', authMiddleware, async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({
        ok: true,
        configured: false,
        message: 'Telegram not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment.',
        setup: {
          step1: 'Create a bot via @BotFather on Telegram',
          step2: 'Get your chat ID by messaging @userinfobot',
          step3: 'Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env',
        },
      });
    }

    const botInfo = await getBotInfo();
    const chatId = getChatId();

    return c.json({
      ok: true,
      configured: true,
      bot: {
        username: `@${botInfo.username}`,
        name: botInfo.firstName,
      },
      chatId: chatId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /telegram/bot - Get bot info
telegram.get('/bot', authMiddleware, async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const botInfo = await getBotInfo();

    return c.json({
      ok: true,
      bot: botInfo,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ SEND MESSAGES ============

// POST /telegram/send - Send a message
telegram.post('/send', authMiddleware, validateBody(sendMessageSchema), async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const { text, chatId, parseMode } = getValidatedBody<z.infer<typeof sendMessageSchema>>(c);
    const message = await sendMessage(text, chatId, { parseMode });

    return c.json({
      ok: true,
      message: 'Message sent successfully',
      messageId: message.messageId,
      chatId: message.chatId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /telegram/notify - Send a notification
telegram.post('/notify', authMiddleware, validateBody(notificationSchema), async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const { title, body, chatId } = getValidatedBody<z.infer<typeof notificationSchema>>(c);
    const message = await sendNotification(title, body, chatId);

    return c.json({
      ok: true,
      message: 'Notification sent',
      messageId: message.messageId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /telegram/alarm - Send alarm notification
telegram.post('/alarm', authMiddleware, validateBody(alarmNotificationSchema), async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const { title, time, chatId } = getValidatedBody<z.infer<typeof alarmNotificationSchema>>(c);
    const message = await sendAlarmNotification(title, time, chatId);

    return c.json({
      ok: true,
      message: 'Alarm notification sent',
      messageId: message.messageId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /telegram/reminder - Send reminder notification
telegram.post('/reminder', authMiddleware, validateBody(notificationSchema), async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const { title, body, chatId } = getValidatedBody<z.infer<typeof notificationSchema>>(c);
    const message = await sendReminderNotification(title, body, chatId);

    return c.json({
      ok: true,
      message: 'Reminder notification sent',
      messageId: message.messageId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /telegram/event - Send event notification
telegram.post('/event', authMiddleware, validateBody(eventNotificationSchema), async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const { title, time, location, chatId } = getValidatedBody<z.infer<typeof eventNotificationSchema>>(c);
    const message = await sendEventNotification(title, time, location, chatId);

    return c.json({
      ok: true,
      message: 'Event notification sent',
      messageId: message.messageId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// POST /telegram/test - Send test message
telegram.post('/test', authMiddleware, async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const message = await sendMessage(
      '🧪 *Test Message from Paka*\n\nTelegram integration is working!',
      undefined,
      { parseMode: 'Markdown' }
    );

    return c.json({
      ok: true,
      message: 'Test message sent! Check your Telegram.',
      messageId: message.messageId,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ UPDATES ============

// GET /telegram/updates - Get recent messages to bot
telegram.get('/updates', authMiddleware, async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const limit = parseInt(c.req.query('limit') || '10');
    const updates = await getUpdates(undefined, limit);

    return c.json({
      ok: true,
      count: updates.length,
      updates,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /telegram/webhook - Get webhook info
telegram.get('/webhook', authMiddleware, async (c) => {
  try {
    if (!isTelegramConfigured()) {
      return c.json({ ok: false, error: 'Telegram not configured' }, 400);
    }

    const info = await getWebhookInfo();

    return c.json({
      ok: true,
      webhook: info,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default telegram;

