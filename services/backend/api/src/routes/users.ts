// src/routes/users.ts
// User Management APIs (Admin-level operations)
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import pkg from 'bcryptjs';
const { hash } = pkg;
import { authMiddleware, getUserId } from '../middleware/auth.js';
import { validateBody, validateQuery, getValidatedBody, getValidatedQuery } from '../middleware/validate.js';
import {
  createUserSchema,
  updateUserSchema,
  listUsersQuerySchema,
  type CreateUserInput,
  type UpdateUserInput,
  type ListUsersQuery,
} from '../schemas/user.schema.js';
import { z } from 'zod';

const users = new Hono();

// Apply auth middleware to all routes
users.use('*', authMiddleware);

// Helper to exclude password
function safeUser(user: any) {
  const { password, ...rest } = user;
  return rest;
}

// Extended list query schema
const listUsersExtendedSchema = listUsersQuerySchema.extend({
  page: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1)).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'email', 'displayName']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// ============ CREATE USER ============
// POST /users - Create a new user (Admin)
users.post('/', validateBody(createUserSchema), async (c) => {
  try {
    const { email, password, displayName, timezone } = getValidatedBody<CreateUserInput>(c);

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return c.json({ ok: false, error: 'User with this email already exists' }, 409);
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        displayName: displayName ?? null,
        timezone: timezone ?? null,
      },
    });

    return c.json({ ok: true, user: safeUser(user) }, 201);
  } catch (err: any) {
    console.error('Create user error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to create user' }, 500);
  }
});

// ============ LIST ALL USERS ============
// GET /users - List all users (paginated)
users.get('/', validateQuery(listUsersExtendedSchema), async (c) => {
  try {
    const query = getValidatedQuery<ListUsersQuery & { page?: number; sortBy?: string; sortOrder?: string }>(c);
    const { page, limit, offset, search, sortBy, sortOrder } = query;

    const pageNum = page ?? 1;
    const limitNum = limit ?? 20;
    const skip = offset ?? (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy
    const orderByField = sortBy || 'createdAt';
    const orderByDirection = sortOrder === 'asc' ? 'asc' : 'desc';

    const [usersList, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [orderByField]: orderByDirection },
        select: {
          id: true,
          email: true,
          displayName: true,
          imageUrl: true,
          timezone: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              documents: true,
              tasks: true,
              sources: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return c.json({
      ok: true,
      users: usersList,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    console.error('List users error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to list users' }, 500);
  }
});

// ============ GET USER BY ID ============
// GET /users/:id - Get a single user by ID
users.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid user ID' }, 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        displayName: true,
        imageUrl: true,
        timezone: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            documents: true,
            tasks: true,
            reminders: true,
            sources: true,
            queries: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ ok: false, error: 'User not found' }, 404);
    }

    return c.json({ ok: true, user });
  } catch (err: any) {
    console.error('Get user error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to get user' }, 500);
  }
});

// ============ UPDATE USER ============
// PATCH /users/:id - Update a user by ID
users.patch('/:id', validateBody(updateUserSchema), async (c) => {
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid user ID' }, 400);
  }

  try {
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return c.json({ ok: false, error: 'User not found' }, 404);
    }

    const { email, password, displayName, timezone } = getValidatedBody<UpdateUserInput>(c);

    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = await hash(password, 10);
    if (displayName !== undefined) updateData.displayName = displayName;
    if (timezone !== undefined) updateData.timezone = timezone;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return c.json({ ok: true, user: safeUser(user) });
  } catch (err: any) {
    console.error('Update user error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to update user' }, 500);
  }
});

// ============ DELETE USER ============
// DELETE /users/:id - Delete a user by ID
users.delete('/:id', async (c) => {
  const currentUserId = getUserId(c);
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid user ID' }, 400);
  }

  // Prevent self-deletion via this endpoint
  if (id === currentUserId) {
    return c.json({ ok: false, error: 'Cannot delete yourself. Use DELETE /auth/me instead.' }, 400);
  }

  try {
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return c.json({ ok: false, error: 'User not found' }, 404);
    }

    // Delete user (cascades to related data)
    await prisma.user.delete({ where: { id } });

    return c.json({ ok: true, message: 'User deleted successfully' });
  } catch (err: any) {
    console.error('Delete user error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to delete user' }, 500);
  }
});

// ============ USER STATS ============
// GET /users/:id/stats - Get user statistics
users.get('/:id/stats', async (c) => {
  const id = parseInt(c.req.param('id'), 10);

  if (isNaN(id) || id <= 0) {
    return c.json({ ok: false, error: 'Invalid user ID' }, 400);
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return c.json({ ok: false, error: 'User not found' }, 404);
    }

    const [documents, tasks, reminders, sources, queries] = await Promise.all([
      prisma.document.count({ where: { userId: id } }),
      prisma.task.count({ where: { userId: id } }),
      prisma.reminder.count({ where: { userId: id } }),
      prisma.source.count({ where: { userId: id } }),
      prisma.queryLog.count({ where: { userId: id } }),
    ]);

    const completedTasks = await prisma.task.count({
      where: { userId: id, completed: true },
    });

    return c.json({
      ok: true,
      stats: {
        documents,
        tasks: {
          total: tasks,
          completed: completedTasks,
          pending: tasks - completedTasks,
        },
        reminders,
        sources,
        queries,
      },
    });
  } catch (err: any) {
    console.error('Get user stats error:', err);
    return c.json({ ok: false, error: err.message || 'Failed to get user stats' }, 500);
  }
});

export default users;
