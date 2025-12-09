# Frontend Testing Guide

## Quick Test Checklist

### 1. **Check if Frontend is Running**
```bash
# Check if Next.js is running
ps aux | grep "next dev"

# Or check if port 3000 (default Next.js port) is accessible
curl http://localhost:3000
```

### 2. **Access the Frontend in Browser**
- Open your browser and go to: **http://localhost:3000**
- You should see the Paka AI Assistant Terminal interface

### 3. **Test Basic Functionality**

#### A. **Login/Authentication**
- Click on the login button or open the auth dialog
- Try logging in with:
  - Email: `satya@paka.com`
  - Password: `password123`
- Verify you can successfully log in

#### B. **Terminal Interface**
- Type a command in the terminal (e.g., `help`)
- Verify commands execute and show output
- Try commands like:
  - `help` - Show help message
  - `query <your question>` - Ask a question
  - `docs` - List documents
  - `tasks` - Show tasks
  - `briefing` - Get daily briefing
  - `clear` - Clear terminal

#### C. **Chat Interface**
- Type a message in the chat input
- Verify messages are sent and responses are received
- Check if the AI responses appear correctly
- Verify message history persists

### 4. **Test API Connectivity**

#### Check Backend API is Running
```bash
# Test backend health
curl http://localhost:3000/health

# Should return: {"status":"ok","timestamp":"..."}
```

#### Test API from Frontend
- Open browser DevTools (F12)
- Go to Network tab
- Perform an action (login, send message, etc.)
- Verify API calls are being made to `http://localhost:3000`
- Check for any CORS or connection errors

### 5. **Check Console for Errors**

#### Browser Console
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Look for:
   - Red error messages
   - Warnings about API calls
   - Network errors
   - React hydration errors

#### Terminal/Server Logs
```bash
# Check frontend dev server logs
# (if running in terminal, you'll see logs there)

# Check for build errors
cd services/frontend && npm run build
```

### 6. **Test Responsive Design**
- Resize browser window
- Test on mobile viewport (DevTools device emulation)
- Verify UI adapts correctly

### 7. **Test State Persistence**
- Login to the app
- Refresh the page
- Verify you remain logged in (if using localStorage/sessionStorage)
- Check if chat history persists

## Common Issues & Solutions

### Frontend Not Loading
**Symptoms:** Blank page, "Cannot GET /" error

**Solutions:**
```bash
# 1. Check if frontend is running
cd services/frontend
npm run dev

# 2. Check if port 3000 is available
lsof -ti:3000

# 3. Try a different port
PORT=3001 npm run dev
```

### API Connection Errors
**Symptoms:** "Failed to fetch", CORS errors, 404 errors

**Solutions:**
1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `.env.local` or environment variables:
   ```bash
   cd services/frontend
   cat .env.local
   # Should have: NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. Restart both frontend and backend

### Authentication Not Working
**Symptoms:** Can't login, "Invalid credentials" error

**Solutions:**
1. Verify backend auth endpoint works:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"satya@paka.com","password":"password123"}'
   ```
2. Check browser console for errors
3. Verify JWT token is being stored

### Chat/Query Not Working
**Symptoms:** Messages not sending, no AI responses

**Solutions:**
1. Check if GEMINI_API_KEY is configured (backend)
2. Verify API endpoint: `curl http://localhost:3000/query`
3. Check browser Network tab for failed requests
4. Verify Socket.IO connection (if using real-time features)

## Automated Testing (Optional)

### Run Linter
```bash
cd services/frontend
npm run lint
```

### Build Test
```bash
cd services/frontend
npm run build
# Should complete without errors
```

## Manual Test Scenarios

### Scenario 1: New User Flow
1. Open app → See login dialog
2. Click "Sign up" → Create account
3. Login → See terminal + chat interface
4. Send a message → Get AI response

### Scenario 2: Returning User Flow
1. Open app → Auto-login (if token exists)
2. See previous chat history
3. Continue conversation
4. Use terminal commands

### Scenario 3: Error Handling
1. Disconnect internet → Try to send message
2. Should show error message
3. Reconnect → Retry should work

## Performance Checks

1. **Page Load Time**
   - Open DevTools → Network tab
   - Reload page
   - Check load time (should be < 3 seconds)

2. **API Response Time**
   - DevTools → Network tab
   - Send a message
   - Check response time (should be < 2 seconds)

3. **Bundle Size**
   ```bash
   cd services/frontend
   npm run build
   # Check .next/analyze or build output for bundle sizes
   ```

## Current Status

✅ **Frontend Server:** Running on port 3000 (or 3001)
✅ **Backend API:** Running on port 3000
✅ **Database:** Connected
✅ **Authentication:** Fixed (password hash issue resolved)
✅ **GEMINI_API_KEY:** Configured

## Next Steps

1. Open http://localhost:3000 in your browser
2. Test login with: `satya@paka.com` / `password123`
3. Try sending a message in the chat
4. Try terminal commands
5. Check browser console for any errors

