// src/routes/tasks.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, validateQuery, getValidatedBody, getValidatedQuery } from '../middleware/validate.js';
import {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema,
  bulkTaskIdsSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
  type ListTasksQuery,
  type BulkTaskIds,
} from '../schemas/task.schema.js';

const tasks = new Hono();

// All task routes require authentication
tasks.use('*', authMiddleware);

// Create a new task
tasks.post('/', validateBody(createTaskSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { title, description, dueAt } = getValidatedBody<CreateTaskInput>(c);

    const task = await prisma.task.create({
      data: {
        userId,
        title: title.trim(),
        description: description?.trim() || null,
        dueAt: dueAt ? new Date(dueAt) : null,
        completed: false,
      },
    });

    return c.json({ ok: true, task }, 201);
  } catch (err: any) {
    console.error('Create task error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// List all tasks for the authenticated user
tasks.get('/', validateQuery(listTasksQuerySchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { completed, sortBy, order, limit, offset } = getValidatedQuery<ListTasksQuery>(c);

    const where: any = { userId };

    // Filter by completion status
    if (completed === 'true') {
      where.completed = true;
    } else if (completed === 'false') {
      where.completed = false;
    }

    // Sorting
    const orderBy: any = {};
    const sortField = sortBy || 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    if (sortField === 'dueAt') {
      orderBy.dueAt = sortOrder;
    } else if (sortField === 'title') {
      orderBy.title = sortOrder;
    } else {
      orderBy.createdAt = sortOrder;
    }

    // Pagination
    const take = limit ?? 50;
    const skip = offset ?? 0;

    const [tasksList, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        take,
        skip,
      }),
      prisma.task.count({ where }),
    ]);

    return c.json({
      ok: true,
      tasks: tasksList,
      total,
      limit: take,
      offset: skip,
    });
  } catch (err: any) {
    console.error('List tasks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get upcoming tasks (due within next N days)
tasks.get('/upcoming', async (c) => {
  try {
    const userId = getUserId(c);
    const { days } = c.req.query();

    const daysAhead = days ? parseInt(days, 10) : 7;
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);

    const upcomingTasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueAt: {
          gte: now,
          lte: futureDate,
        },
      },
      orderBy: { dueAt: 'asc' },
    });

    return c.json({
      ok: true,
      tasks: upcomingTasks,
      total: upcomingTasks.length,
      daysAhead,
    });
  } catch (err: any) {
    console.error('Upcoming tasks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get overdue tasks
tasks.get('/overdue', async (c) => {
  try {
    const userId = getUserId(c);
    const now = new Date();

    const overdueTasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueAt: {
          lt: now,
        },
      },
      orderBy: { dueAt: 'asc' },
    });

    return c.json({
      ok: true,
      tasks: overdueTasks,
      total: overdueTasks.length,
    });
  } catch (err: any) {
    console.error('Overdue tasks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get task statistics
tasks.get('/stats', async (c) => {
  try {
    const userId = getUserId(c);
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const [total, completed, pending, overdue, dueToday] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, completed: true } }),
      prisma.task.count({ where: { userId, completed: false } }),
      prisma.task.count({
        where: {
          userId,
          completed: false,
          dueAt: { lt: now },
        },
      }),
      prisma.task.count({
        where: {
          userId,
          completed: false,
          dueAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      }),
    ]);

    return c.json({
      ok: true,
      stats: {
        total,
        completed,
        pending,
        overdue,
        dueToday,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      },
    });
  } catch (err: any) {
    console.error('Task stats error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Get a single task by ID
tasks.get('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const taskId = parseInt(c.req.param('id'), 10);

    if (isNaN(taskId) || taskId <= 0) {
      return c.json({ ok: false, error: 'Invalid task ID' }, 400);
    }

    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return c.json({ ok: false, error: 'Task not found' }, 404);
    }

    return c.json({ ok: true, task });
  } catch (err: any) {
    console.error('Get task error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Update a task
tasks.patch('/:id', validateBody(updateTaskSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const taskId = parseInt(c.req.param('id'), 10);

    if (isNaN(taskId) || taskId <= 0) {
      return c.json({ ok: false, error: 'Invalid task ID' }, 400);
    }

    const existing = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Task not found' }, 404);
    }

    const { title, description, dueAt, completed } = getValidatedBody<UpdateTaskInput>(c);

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (dueAt !== undefined) updateData.dueAt = dueAt ? new Date(dueAt) : null;
    if (completed !== undefined) updateData.completed = Boolean(completed);

    const task = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
    });

    return c.json({ ok: true, task });
  } catch (err: any) {
    console.error('Update task error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Toggle task completion
tasks.post('/:id/toggle', async (c) => {
  try {
    const userId = getUserId(c);
    const taskId = parseInt(c.req.param('id'), 10);

    if (isNaN(taskId) || taskId <= 0) {
      return c.json({ ok: false, error: 'Invalid task ID' }, 400);
    }

    const existing = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Task not found' }, 404);
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !existing.completed },
    });

    return c.json({ ok: true, task });
  } catch (err: any) {
    console.error('Toggle task error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Delete a task
tasks.delete('/:id', async (c) => {
  try {
    const userId = getUserId(c);
    const taskId = parseInt(c.req.param('id'), 10);

    if (isNaN(taskId) || taskId <= 0) {
      return c.json({ ok: false, error: 'Invalid task ID' }, 400);
    }

    const existing = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existing) {
      return c.json({ ok: false, error: 'Task not found' }, 404);
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return c.json({ ok: true, message: 'Task deleted successfully' });
  } catch (err: any) {
    console.error('Delete task error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Bulk complete tasks
tasks.post('/bulk/complete', validateBody(bulkTaskIdsSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { ids } = getValidatedBody<BulkTaskIds>(c);

    const result = await prisma.task.updateMany({
      where: {
        id: { in: ids },
        userId,
      },
      data: { completed: true },
    });

    return c.json({
      ok: true,
      message: `${result.count} tasks marked as completed`,
      count: result.count,
    });
  } catch (err: any) {
    console.error('Bulk complete tasks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// Bulk delete tasks
tasks.delete('/bulk', validateBody(bulkTaskIdsSchema), async (c) => {
  try {
    const userId = getUserId(c);
    const { ids } = getValidatedBody<BulkTaskIds>(c);

    const result = await prisma.task.deleteMany({
      where: {
        id: { in: ids },
        userId,
      },
    });

    return c.json({
      ok: true,
      message: `${result.count} tasks deleted`,
      count: result.count,
    });
  } catch (err: any) {
    console.error('Bulk delete tasks error:', err);
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default tasks;
