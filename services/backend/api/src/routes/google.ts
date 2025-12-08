// src/routes/google.ts
// Unified Google OAuth routes for all Google services
// Now with PERSISTENT token storage!

import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  getGoogleAuthUrl,
  exchangeGoogleCode,
  isGoogleAuthenticated,
  disconnectGoogle,
  getGoogleProfile,
  loadTokensFromDB,
} from '../services/google-auth.service.js';

const google = new Hono();

// GET /google/auth - Get OAuth URL to connect Google account
google.get('/auth', authMiddleware, (c) => {
  try {
    const userId = getUserId(c);
    const authUrl = getGoogleAuthUrl(userId);
    
    return c.json({
      ok: true,
      authUrl,
      message: 'Open this URL to connect your Google account (Gmail, Calendar, Docs, etc.)',
      scopes: ['gmail', 'calendar', 'docs', 'drive', 'fitness'],
      note: 'Tokens will be saved permanently - no need to reconnect after server restart!',
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /google/callback - OAuth callback (exchange code for tokens)
google.get('/callback', async (c) => {
  try {
    const code = c.req.query('code');
    const state = c.req.query('state');
    
    if (!code) {
      return c.json({ ok: false, error: 'No authorization code provided' }, 400);
    }
    
    const { userId } = await exchangeGoogleCode(code, state || undefined);
    const profile = await getGoogleProfile();
    
    return c.json({
      ok: true,
      message: 'Google account connected successfully! Tokens saved to database.',
      userId,
      email: profile.email,
      name: profile.name,
      services: ['Gmail', 'Calendar', 'Docs', 'Drive', 'Fit'],
      persistent: true,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /google/status - Check connection status
google.get('/status', authMiddleware, async (c) => {
  try {
    const userId = getUserId(c);
    
    // Try to load from DB if not in memory
    if (!isGoogleAuthenticated()) {
      await loadTokensFromDB(userId);
    }
    
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
      persistent: true,
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
google.post('/disconnect', authMiddleware, async (c) => {
  const userId = getUserId(c);
  await disconnectGoogle(userId);
  
  return c.json({
    ok: true,
    message: 'Google account disconnected and tokens removed from database',
  });
});

export default google;
