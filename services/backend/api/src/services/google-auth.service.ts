// src/services/google-auth.service.ts
// Shared Google OAuth service for Gmail, Calendar, Docs, etc.

import { google } from 'googleapis';

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

// Store tokens in memory (for single user, single account)
let storedTokens: {
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
 */
export function getGoogleAuthUrl(): string {
  const oauth2Client = createOAuth2Client();
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeGoogleCode(code: string): Promise<void> {
  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  
  storedTokens = {
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token!,
    expiry_date: tokens.expiry_date!,
  };
}

/**
 * Check if authenticated with Google
 */
export function isGoogleAuthenticated(): boolean {
  return storedTokens !== null;
}

/**
 * Get authenticated OAuth2 client
 */
export function getAuthenticatedClient() {
  if (!storedTokens) {
    throw new Error('Not authenticated with Google. Please connect first.');
  }
  
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials(storedTokens);
  
  return oauth2Client;
}

/**
 * Disconnect Google (clear tokens)
 */
export function disconnectGoogle(): void {
  storedTokens = null;
}

/**
 * Get user profile info
 */
export async function getGoogleProfile(): Promise<{
  email: string;
  name: string;
  picture: string;
}> {
  const oauth2Client = getAuthenticatedClient();
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  
  const { data } = await oauth2.userinfo.get();
  
  return {
    email: data.email || '',
    name: data.name || '',
    picture: data.picture || '',
  };
}

/**
 * Get stored tokens (for debugging)
 */
export function getStoredTokens() {
  return storedTokens;
}

/**
 * Set tokens (for restoring session)
 */
export function setStoredTokens(tokens: typeof storedTokens) {
  storedTokens = tokens;
}

