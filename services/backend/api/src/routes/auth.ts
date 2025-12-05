// src/routes/auth.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwtPkg from 'jsonwebtoken';
const { sign } = jwtPkg;
import { authMiddleware, getUser } from '../middleware/auth.js';
import { validateBody, getValidatedBody } from '../middleware/validate.js';
import {
  signupSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  type SignupInput,
  type LoginInput,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from '../schemas/auth.schema.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

const auth = new Hono();

// Helper to generate JWT token
function generateToken(userId: number, email: string): string {
  return sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Helper to exclude password from user object
function safeUser(user: any) {
  const { password, ...rest } = user;
  return rest;
}

// Signup - Create new user
auth.post('/signup', validateBody(signupSchema), async (c) => {
  try {
    const { email, password, displayName, timezone } = getValidatedBody<SignupInput>(c);

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return c.json({ ok: false, error: 'User already exists' }, 409);
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

    // Generate token
    const token = generateToken(user.id, user.email);

    return c.json({
      ok: true,
      user: safeUser(user),
      token,
    }, 201);
  } catch (err: any) {
    console.error('Signup error:', err);
    return c.json({ ok: false, error: err.message || 'Signup failed' }, 500);
  }
});

// Login - Authenticate user
auth.post('/login', validateBody(loginSchema), async (c) => {
  try {
    const { email, password } = getValidatedBody<LoginInput>(c);

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return c.json({ ok: false, error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return c.json({ ok: false, error: 'Invalid credentials' }, 401);
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    return c.json({
      ok: true,
      user: safeUser(user),
      token,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return c.json({ ok: false, error: err.message || 'Login failed' }, 500);
  }
});

// Get current user (protected)
auth.get('/me', authMiddleware, async (c) => {
  const user = getUser(c);
  return c.json({
    ok: true,
    user: safeUser(user),
  });
});

// Update user profile (protected)
auth.patch('/me', authMiddleware, validateBody(updateProfileSchema), async (c) => {
  const user = getUser(c);

  try {
    const { displayName, timezone } = getValidatedBody<UpdateProfileInput>(c);

    const updateData: any = {};
    if (displayName !== undefined) updateData.displayName = displayName || null;
    if (timezone !== undefined) updateData.timezone = timezone || null;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return c.json({
      ok: true,
      user: safeUser(updatedUser),
    });
  } catch (err: any) {
    console.error('Update user error:', err);
    return c.json({ ok: false, error: err.message || 'Update failed' }, 500);
  }
});

// Change password (protected)
auth.post('/change-password', authMiddleware, validateBody(changePasswordSchema), async (c) => {
  const user = getUser(c);

  try {
    const { currentPassword, newPassword } = getValidatedBody<ChangePasswordInput>(c);

    // Verify current password
    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return c.json({ ok: false, error: 'Current password is incorrect' }, 401);
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return c.json({ ok: true, message: 'Password changed successfully' });
  } catch (err: any) {
    console.error('Change password error:', err);
    return c.json({ ok: false, error: err.message || 'Change password failed' }, 500);
  }
});

// Delete account (protected)
auth.delete('/me', authMiddleware, async (c) => {
  const user = getUser(c);

  try {
    await prisma.user.delete({
      where: { id: user.id },
    });

    return c.json({ ok: true, message: 'Account deleted successfully' });
  } catch (err: any) {
    console.error('Delete account error:', err);
    return c.json({ ok: false, error: err.message || 'Delete failed' }, 500);
  }
});

export default auth;
