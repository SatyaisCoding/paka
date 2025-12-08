// src/services/google-auth.service.ts
// Shared Google OAuth service for Gmail, Calendar, Docs, etc.
// Now with PERSISTENT token storage in database!

import { google } from 'googleapis';
import prisma from '../lib/prisma.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/google/callback';

// All Google API scopes
const SCOPES = [
  // Gmail
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify',
  // Calendar
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  // Google Docs
  'https://www.googleapis.com/auth/documents.readonly',
  'https://www.googleapis.com/auth/documents',
  // Google Drive (for docs listing)
  'https://www.googleapis.com/auth/drive.readonly',
  // Google Fit
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  // User profile
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

// In-memory cache for tokens (loaded from DB)
let cachedTokens: {
  userId: number;
  access_token: string;
  refresh_token: string;
  expiry_date: number;
} | null = null;

/**
 * Create OAuth2 client
 */
export function createOAuth2Client() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
  }
  
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
}

/**
 * Get authorization URL for OAuth flow
 * @param userId - User ID to associate tokens with (passed in state)
 */
export function getGoogleAuthUrl(userId: number): string {
  const oauth2Client = createOAuth2Client();
  
  // Pass userId in state parameter (will be returned in callback)
  const state = JSON.stringify({ userId });
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state,
  });
}

/**
 * Exchange authorization code for tokens and save to database
 * @param code - Authorization code from Google
 * @param state - State parameter containing userId
 */
export async function exchangeGoogleCode(code: string, state?: string): Promise<{ userId: number }> {
  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  
  // Extract userId from state
  let userId = 1; // Default fallback
  if (state) {
    try {
      const stateData = JSON.parse(state);
      userId = stateData.userId || 1;
    } catch {
      console.warn('Could not parse OAuth state, using default userId');
    }
  }
  
  // Save tokens to database
  await prisma.oAuthToken.upsert({
    where: {
      // Use a composite lookup - find by userId and provider
      id: (await prisma.oAuthToken.findFirst({
        where: { userId, provider: 'google' },
        select: { id: true },
      }))?.id || 0,
    },
    update: {
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
      expiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      scope: SCOPES.join(' '),
      updatedAt: new Date(),
    },
    create: {
      userId,
      provider: 'google',
      accessToken: tokens.access_token || '',
      refreshToken: tokens.refresh_token || '',
      expiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      scope: SCOPES.join(' '),
    },
  });
  
  // Update cache
  cachedTokens = {
    userId,
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token!,
    expiry_date: tokens.expiry_date!,
  };
  
  console.log(`✅ Google tokens saved for user ${userId}`);
  
  return { userId };
}

/**
 * Load tokens from database for a user
 */
export async function loadTokensFromDB(userId?: number): Promise<boolean> {
  try {
    // Find token - if userId provided, use it; otherwise get any existing token
    const tokenRecord = await prisma.oAuthToken.findFirst({
      where: userId ? { userId, provider: 'google' } : { provider: 'google' },
      orderBy: { updatedAt: 'desc' },
    });
    
    if (tokenRecord && tokenRecord.refreshToken) {
      cachedTokens = {
        userId: tokenRecord.userId,
        access_token: tokenRecord.accessToken || '',
        refresh_token: tokenRecord.refreshToken,
        expiry_date: tokenRecord.expiry?.getTime() || 0,
      };
      console.log(`✅ Google tokens loaded from DB for user ${tokenRecord.userId}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.warn('Could not load Google tokens from DB:', error);
    return false;
  }
}

/**
 * Check if authenticated with Google
 */
export function isGoogleAuthenticated(): boolean {
  return cachedTokens !== null && !!cachedTokens.refresh_token;
}

/**
 * Get the current authenticated user ID
 */
export function getAuthenticatedUserId(): number | null {
  return cachedTokens?.userId || null;
}

/**
 * Get authenticated OAuth2 client (with auto token refresh)
 */
export async function getAuthenticatedClient() {
  if (!cachedTokens) {
    // Try to load from DB first
    const loaded = await loadTokensFromDB();
    if (!loaded) {
      throw new Error('Not authenticated with Google. Please connect first.');
    }
  }
  
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({
    access_token: cachedTokens!.access_token,
    refresh_token: cachedTokens!.refresh_token,
    expiry_date: cachedTokens!.expiry_date,
  });
  
  // Check if token needs refresh
  if (cachedTokens!.expiry_date && cachedTokens!.expiry_date < Date.now()) {
    console.log('🔄 Refreshing Google access token...');
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      
      // Update cache
      cachedTokens!.access_token = credentials.access_token!;
      cachedTokens!.expiry_date = credentials.expiry_date!;
      
      // Update database
      await prisma.oAuthToken.updateMany({
        where: { userId: cachedTokens!.userId, provider: 'google' },
        data: {
          accessToken: credentials.access_token || '',
          expiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
          updatedAt: new Date(),
        },
      });
      
      oauth2Client.setCredentials(credentials);
      console.log('✅ Google access token refreshed');
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw new Error('Failed to refresh Google token. Please reconnect.');
    }
  }
  
  return oauth2Client;
}

/**
 * Disconnect Google (clear tokens from DB and cache)
 */
export async function disconnectGoogle(userId?: number): Promise<void> {
  const userIdToDelete = userId || cachedTokens?.userId;
  
  if (userIdToDelete) {
    await prisma.oAuthToken.deleteMany({
      where: { userId: userIdToDelete, provider: 'google' },
    });
    console.log(`🔌 Google disconnected for user ${userIdToDelete}`);
  }
  
  cachedTokens = null;
}

/**
 * Get user profile info
 */
export async function getGoogleProfile(): Promise<{
  email: string;
  name: string;
  picture: string;
}> {
  const oauth2Client = await getAuthenticatedClient();
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  
  const { data } = await oauth2.userinfo.get();
  
  return {
    email: data.email || '',
    name: data.name || '',
    picture: data.picture || '',
  };
}

/**
 * Initialize - load tokens from DB on startup
 */
export async function initGoogleAuth(): Promise<void> {
  const loaded = await loadTokensFromDB();
  if (loaded) {
    console.log('✅ Google auth restored from database');
  } else {
    console.log('ℹ️ No Google tokens in database - user needs to connect');
  }
}

/**
 * Get stored tokens (for debugging)
 */
export function getStoredTokens() {
  return cachedTokens;
}

/**
 * Set tokens (for restoring session - legacy support)
 */
export function setStoredTokens(tokens: typeof cachedTokens) {
  cachedTokens = tokens;
}
