// src/routes/reminders.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, validateQuery, getValidatedBody, getValidatedQuery } from '../middleware/validate.js';
import {
  createReminderSchema,
  updateReminderSchema,
  snoozeReminderSchema,
  listRemindersQuerySchema,
  type CreateReminderInput,
  type UpdateReminderInput,
  type SnoozeReminderInput,
  type ListRemindersQuery,
} from '../schemas/reminder.schema.js';

const reminders = new Hono();

// All reminder routes require authentication
reminders.use('*', authMiddleware);

// Create a new reminder
reminders.post('/', validateBody(createReminderSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { text, remindAt } = getValidatedBody<CreateReminderInput>(c);

    const reminderTime = new Date(remindAt);

    if (reminderTime <= new Date()) {
      return c.json({ ok: false, error: 'Reminder time must be in the future' }, 400);
    }

    const reminder = await prisma.reminder.create({
      data: {
        userId,
        text: text.trim(),
        remindAt: reminderTime,
        sent: false,
      },
    });

    return c.json({ ok: true, reminder }, 201);
  } catch (err: any) {
    console.error('Create reminder error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// List all reminders for the authenticated user
reminders.get('/', validateQuery(listRemindersQuerySchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { sent, upcoming, limit, offset } = getValidatedQuery<ListRemindersQuery>(c);

    const where: any = { userId };

    // Filter by sent status
    if (sent === 'true') {
      where.sent = true;
    } else if (sent === 'false') {
      where.sent = false;
    }

    // Filter upcoming only (not sent and in the future)
    if (upcoming === 'true') {
      where.sent = false;
      where.remindAt = { gte: new Date() };
    }

    // Pagination
    const take = limit ?? 50;
    const skip = offset ?? 0;

    const [remindersList, total] = await Promise.all([
      prisma.reminder.findMany({
        where,
        orderBy: { remindAt: 'asc' },
        take,
        skip,
      }),
      prisma.reminder.count({ where }),
    ]);

    return c.json({
      ok: true,
      reminders: remindersList,
      total,
      limit: take,
      offset: skip,
    });
  } catch (err: any) {
    console.error('List reminders error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get reminders due soon (within next N minutes)
reminders.get('/due-soon', async (c) => {
  try {
    const userId = getUserId(c);
    const { minutes } = c.req.query();

    const minutesAhead = minutes ? parseInt(minutes, 10) : 60;
    const now = new Date();
    const futureTime = new Date();
    futureTime.setMinutes(futureTime.getMinutes() + minutesAhead);

    const dueSoon = await prisma.reminder.findMany({
      where: {
        userId,
        sent: false,
        remindAt: {
          gte: now,
          lte: futureTime,
        },
      },
      orderBy: { remindAt: 'asc' },
    });

    return c.json({
      ok: true,
      reminders: dueSoon,
      total: dueSoon.length,
      minutesAhead,
    });
  } catch (err: any) {
    console.error('Due soon reminders error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get reminder statistics
reminders.get('/stats', async (c) => {
  try {
    const userId = getUserId(c);
    const now = new Date();

    const [total, sent, pending, overdue] = await Promise.all([
      prisma.reminder.count({ where: { userId } }),
      prisma.reminder.count({ where: { userId, sent: true } }),
      prisma.reminder.count({ where: { userId, sent: false, remindAt: { gte: now } } }),
      prisma.reminder.count({ where: { userId, sent: false, remindAt: { lt: now } } }),
    ]);

    return c.json({
      ok: true,
      stats: {
        total,
        sent,
        pending,
        overdue,
      },
    });
  } catch (err: any) {
    console.error('Reminder stats error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get a single reminder by ID
reminders.get('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const reminderId = parseInt(c.req.param('id'), 10);

    if (isNaN(reminderId) || reminderId <= 0) {
      return c.json({ ok: false, error: 'Invalid reminder ID' }, 400);
    }

    const reminder = await prisma.reminder.findFirst({
      where: { id: reminderId, userId },
    });

    if (!reminder) {
      return c.json({ ok: false, error: 'Reminder not found' }, 404);
    }

    return c.json({ ok: true, reminder });
  } catch (err: any) {
    console.error('Get reminder error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Update a reminder
reminders.patch('/:id', validateBody(updateReminderSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const reminderId = parseInt(c.req.param('id'), 10);

    if (isNaN(reminderId) || reminderId <= 0) {
      return c.json({ ok: false, error: 'Invalid reminder ID' }, 400);
    }

    const existing = await prisma.reminder.findFirst({
      where: { id: reminderId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Reminder not found' }, 404);
    }

    const { text, remindAt, sent } = getValidatedBody<UpdateReminderInput>(c);

    const updateData: any = {};
    if (text !== undefined) updateData.text = text.trim();
    if (remindAt !== undefined) updateData.remindAt = new Date(remindAt);
    if (sent !== undefined) updateData.sent = Boolean(sent);

    const reminder = await prisma.reminder.update({
      where: { id: reminderId },
      data: updateData,
    });

    return c.json({ ok: true, reminder });
  } catch (err: any) {
    console.error('Update reminder error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Mark reminder as sent
reminders.post('/:id/mark-sent', async (c) => {
  try {
    const userId = getUserId(c);
    const reminderId = parseInt(c.req.param('id'), 10);

    if (isNaN(reminderId) || reminderId <= 0) {
      return c.json({ ok: false, error: 'Invalid reminder ID' }, 400);
    }

    const existing = await prisma.reminder.findFirst({
      where: { id: reminderId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Reminder not found' }, 404);
    }

    const reminder = await prisma.reminder.update({
      where: { id: reminderId },
      data: { sent: true },
    });

    return c.json({ ok: true, reminder });
  } catch (err: any) {
    console.error('Mark sent error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Snooze a reminder (reschedule to later)
reminders.post('/:id/snooze', validateBody(snoozeReminderSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const reminderId = parseInt(c.req.param('id'), 10);

    if (isNaN(reminderId) || reminderId <= 0) {
      return c.json({ ok: false, error: 'Invalid reminder ID' }, 400);
    }

    const existing = await prisma.reminder.findFirst({
      where: { id: reminderId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Reminder not found' }, 404);
    }

    const { minutes } = getValidatedBody<SnoozeReminderInput>(c);
    const snoozeMinutes = minutes ?? 15;

    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + snoozeMinutes);

    const reminder = await prisma.reminder.update({
      where: { id: reminderId },
      data: { 
        remindAt: newTime,
        sent: false, // Reset sent status
      },
    });

    return c.json({ ok: true, reminder, message: `Snoozed for ${snoozeMinutes} minutes` });
  } catch (err: any) {
    console.error('Snooze reminder error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Delete a reminder
reminders.delete('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const reminderId = parseInt(c.req.param('id'), 10);

    if (isNaN(reminderId) || reminderId <= 0) {
      return c.json({ ok: false, error: 'Invalid reminder ID' }, 400);
    }

    const existing = await prisma.reminder.findFirst({
      where: { id: reminderId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Reminder not found' }, 404);
    }

    await prisma.reminder.delete({
      where: { id: reminderId },
    });

    return c.json({ ok: true, message: 'Reminder deleted successfully' });
  } catch (err: any) {
    console.error('Delete reminder error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Bulk delete sent reminders
reminders.delete('/bulk/sent', async (c) => {
  try {
    const userId = getUserId(c);

    const result = await prisma.reminder.deleteMany({
      where: {
        userId,
        sent: true,
      },
    });

    return c.json({
      ok: true,
      message: `${result.count} sent reminders deleted`,
      count: result.count,
    });
  } catch (err: any) {
    console.error('Bulk delete sent reminders error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default reminders;
