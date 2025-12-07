// src/routes/google.ts
// Unified Google OAuth routes for all Google services

import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import {
  getGoogleAuthUrl,
  exchangeGoogleCode,
  isGoogleAuthenticated,
  disconnectGoogle,
  getGoogleProfile,
} from '../services/google-auth.service.js';

const google = new Hono();

// GET /google/auth - Get OAuth URL to connect Google account
google.get('/auth', authMiddleware, (c) => {
  try {
    const authUrl = getGoogleAuthUrl();
    return c.json({
      ok: true,
      authUrl,
      message: 'Open this URL to connect your Google account (Gmail, Calendar, Docs, etc.)',
      scopes: ['gmail', 'calendar', 'docs', 'drive', 'fitness'],
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /google/callback - OAuth callback (exchange code for tokens)
google.get('/callback', async (c) => {
  try {
    const code = c.req.query('code');
    
    if (!code) {
      return c.json({ ok: false, error: 'No authorization code provided' }, 400);
    }
    
    await exchangeGoogleCode(code);
    const profile = await getGoogleProfile();
    
    return c.json({
      ok: true,
      message: 'Google account connected successfully!',
      email: profile.email,
      name: profile.name,
      services: ['Gmail', 'Calendar', 'Docs', 'Drive', 'Fit'],
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /google/status - Check connection status
google.get('/status', authMiddleware, async (c) => {
  try {
    if (!isGoogleAuthenticated()) {
      return c.json({
        ok: true,
        connected: false,
        message: 'Google account not connected. Use /google/auth to connect.',
      });
    }
    
    const profile = await getGoogleProfile();
    
    return c.json({
      ok: true,
      connected: true,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      services: ['Gmail', 'Calendar', 'Docs', 'Drive', 'Fit'],
    });
  } catch (err: any) {
    return c.json({
      ok: true,
      connected: false,
      error: err.message,
    });
  }
});

// POST /google/disconnect - Disconnect Google account
google.post('/disconnect', authMiddleware, (c) => {
  disconnectGoogle();
  return c.json({
    ok: true,
    message: 'Google account disconnected',
  });
});

export default google;

