// src/services/telegram.service.ts
// Telegram Bot API integration

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Your personal chat ID
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// ============ INTERFACES ============

export interface TelegramMessage {
  messageId: number;
  chatId: number;
  text: string;
  date: number;
  from?: {
    id: number;
    username?: string;
    firstName?: string;
  };
}

export interface SendMessageOptions {
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disableNotification?: boolean;
  replyToMessageId?: number;
}

// ============ HELPER FUNCTIONS ============

/**
 * Check if Telegram is configured
 */
export function isTelegramConfigured(): boolean {
  return !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
}

/**
 * Get bot token (for setup)
 */
export function getBotToken(): string | undefined {
  return TELEGRAM_BOT_TOKEN;
}

/**
 * Get configured chat ID
 */
export function getChatId(): string | undefined {
  return TELEGRAM_CHAT_ID;
}

/**
 * Make request to Telegram API
 */
async function telegramRequest(method: string, params: Record<string, any> = {}): Promise<any> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token not configured. Set TELEGRAM_BOT_TOKEN in environment.');
  }

  const response = await fetch(`${TELEGRAM_API_URL}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description || 'Unknown error'}`);
  }

  return data.result;
}

// ============ API FUNCTIONS ============

/**
 * Get bot info
 */
export async function getBotInfo(): Promise<{
  id: number;
  username: string;
  firstName: string;
  canJoinGroups: boolean;
  canReadAllGroupMessages: boolean;
}> {
  const result = await telegramRequest('getMe');
  
  return {
    id: result.id,
    username: result.username,
    firstName: result.first_name,
    canJoinGroups: result.can_join_groups,
    canReadAllGroupMessages: result.can_read_all_group_messages,
  };
}

/**
 * Send a text message
 */
export async function sendMessage(
  text: string,
  chatId?: string | number,
  options: SendMessageOptions = {}
): Promise<TelegramMessage> {
  const targetChatId = chatId || TELEGRAM_CHAT_ID;
  
  if (!targetChatId) {
    throw new Error('No chat ID provided and TELEGRAM_CHAT_ID not configured.');
  }

  const params: Record<string, any> = {
    chat_id: targetChatId,
    text,
  };

  if (options.parseMode) {
    params.parse_mode = options.parseMode;
  }

  if (options.disableNotification) {
    params.disable_notification = true;
  }

  if (options.replyToMessageId) {
    params.reply_to_message_id = options.replyToMessageId;
  }

  const result = await telegramRequest('sendMessage', params);

  return {
    messageId: result.message_id,
    chatId: result.chat.id,
    text: result.text,
    date: result.date,
    from: result.from ? {
      id: result.from.id,
      username: result.from.username,
      firstName: result.from.first_name,
    } : undefined,
  };
}

/**
 * Send a notification (convenience function)
 */
export async function sendNotification(
  title: string,
  body: string,
  chatId?: string | number
): Promise<TelegramMessage> {
  const message = `🔔 *${title}*\n\n${body}`;
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Send alarm notification
 */
export async function sendAlarmNotification(
  alarmTitle: string,
  alarmTime: string,
  chatId?: string | number
): Promise<TelegramMessage> {
  const message = `⏰ *Alarm*\n\n*${alarmTitle}*\n🕐 ${alarmTime}`;
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Send reminder notification
 */
export async function sendReminderNotification(
  reminderTitle: string,
  reminderBody?: string,
  chatId?: string | number
): Promise<TelegramMessage> {
  let message = `🔔 *Reminder*\n\n*${reminderTitle}*`;
  if (reminderBody) {
    message += `\n\n${reminderBody}`;
  }
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Send calendar event notification
 */
export async function sendEventNotification(
  eventTitle: string,
  eventTime: string,
  eventLocation?: string,
  chatId?: string | number
): Promise<TelegramMessage> {
  let message = `📅 *Upcoming Event*\n\n*${eventTitle}*\n🕐 ${eventTime}`;
  if (eventLocation) {
    message += `\n📍 ${eventLocation}`;
  }
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Send email summary notification
 */
export async function sendEmailSummary(
  totalEmails: number,
  unreadCount: number,
  summary: string,
  chatId?: string | number
): Promise<TelegramMessage> {
  const message = `📧 *Email Summary*\n\n📬 Total: ${totalEmails}\n📩 Unread: ${unreadCount}\n\n${summary}`;
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Send daily briefing
 */
export async function sendDailyBriefing(
  briefing: {
    date: string;
    weather?: string;
    events?: string[];
    tasks?: string[];
    emails?: { total: number; unread: number };
  },
  chatId?: string | number
): Promise<TelegramMessage> {
  let message = `🌅 *Daily Briefing*\n📅 ${briefing.date}\n\n`;
  
  if (briefing.weather) {
    message += `🌤 *Weather:* ${briefing.weather}\n\n`;
  }
  
  if (briefing.events && briefing.events.length > 0) {
    message += `📅 *Today's Events:*\n`;
    briefing.events.forEach(e => { message += `• ${e}\n`; });
    message += '\n';
  }
  
  if (briefing.tasks && briefing.tasks.length > 0) {
    message += `✅ *Tasks:*\n`;
    briefing.tasks.forEach(t => { message += `• ${t}\n`; });
    message += '\n';
  }
  
  if (briefing.emails) {
    message += `📧 *Emails:* ${briefing.emails.unread} unread of ${briefing.emails.total}\n`;
  }
  
  return sendMessage(message, chatId, { parseMode: 'Markdown' });
}

/**
 * Get recent updates (messages sent to bot)
 */
export async function getUpdates(offset?: number, limit: number = 10): Promise<any[]> {
  const params: Record<string, any> = { limit };
  
  if (offset) {
    params.offset = offset;
  }
  
  const result = await telegramRequest('getUpdates', params);
  return result;
}

/**
 * Delete a message
 */
export async function deleteMessage(
  messageId: number,
  chatId?: string | number
): Promise<boolean> {
  const targetChatId = chatId || TELEGRAM_CHAT_ID;
  
  if (!targetChatId) {
    throw new Error('No chat ID provided.');
  }

  await telegramRequest('deleteMessage', {
    chat_id: targetChatId,
    message_id: messageId,
  });

  return true;
}

/**
 * Edit a message
 */
export async function editMessage(
  messageId: number,
  newText: string,
  chatId?: string | number,
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2'
): Promise<TelegramMessage> {
  const targetChatId = chatId || TELEGRAM_CHAT_ID;
  
  if (!targetChatId) {
    throw new Error('No chat ID provided.');
  }

  const params: Record<string, any> = {
    chat_id: targetChatId,
    message_id: messageId,
    text: newText,
  };

  if (parseMode) {
    params.parse_mode = parseMode;
  }

  const result = await telegramRequest('editMessageText', params);

  return {
    messageId: result.message_id,
    chatId: result.chat.id,
    text: result.text,
    date: result.date,
  };
}

/**
 * Set webhook URL for receiving updates
 */
export async function setWebhook(url: string): Promise<boolean> {
  await telegramRequest('setWebhook', { url });
  return true;
}

/**
 * Remove webhook
 */
export async function deleteWebhook(): Promise<boolean> {
  await telegramRequest('deleteWebhook');
  return true;
}

/**
 * Get webhook info
 */
export async function getWebhookInfo(): Promise<{
  url: string;
  hasCustomCertificate: boolean;
  pendingUpdateCount: number;
}> {
  const result = await telegramRequest('getWebhookInfo');
  
  return {
    url: result.url,
    hasCustomCertificate: result.has_custom_certificate,
    pendingUpdateCount: result.pending_update_count,
  };
}

