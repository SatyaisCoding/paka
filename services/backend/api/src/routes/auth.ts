// src/routes/auth.ts
import { Hono } from 'hono';
import prisma from '../lib/prisma.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import { signJwt, safeUser } from '../utils/auth.js';

const auth = new Hono();

// Signup
auth.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return c.json({ error: 'email and password required' }, 400);
    }

    // check if already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return c.json({ error: 'user already exists' }, 409);
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    const token = signJwt({ userId: user.id, email: user.email });

    return c.json({ ok: true, user: safeUser(user), token });
  } catch (err: any) {
    console.error('signup error', err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

// Login
auth.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return c.json({ error: 'email and password required' }, 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return c.json({ error: 'invalid credentials' }, 401);

    const ok = await compare(password, user.password);
    if (!ok) return c.json({ error: 'invalid credentials' }, 401);

    const token = signJwt({ userId: user.id, email: user.email });
    return c.json({ ok: true, user: safeUser(user), token });
  } catch (err: any) {
    console.error('login error', err);
    return c.json({ error: err.message || String(err) }, 500);
  }
});

export default auth;
