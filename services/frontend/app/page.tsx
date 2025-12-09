'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from '@/components/terminal';
import { Chat } from '@/components/chat';
import { AuthDialog } from '@/components/auth-dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/lib/store';
import { queryApi, authApi, taskApi, documentApi, briefingApi } from '@/lib/api';
import { initSocket } from '@/lib/socket';
import { LogOut, User, Settings } from 'lucide-react';

export default function Home() {
  const { user, token, isAuthenticated, setUser, setToken, logout, addMessage } = useStore();
  const [showAuth, setShowAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set token first so it's available for the API call
          setToken(storedToken);
          // Wait a bit for the token to be set in the interceptor
          await new Promise(resolve => setTimeout(resolve, 100));
          try {
            const response = await authApi.getMe();
            const data = response.data;
            if (data.ok && data.user) {
              setUser(data.user);
              initSocket(storedToken);
            } else {
              throw new Error('Invalid response');
            }
          } catch (err: any) {
            // Token is invalid, clear it
            console.warn('Invalid token, clearing:', err.response?.data?.error || err.message);
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [setUser, setToken]);

  const handleQuery = async (query: string): Promise<string> => {
    if (!token) {
      setShowAuth(true);
      return 'Please login to use AI features.';
    }

    try {
      // Handle specific commands
      const cmd = query.trim().toLowerCase();
      
      if (cmd === 'tasks' || cmd === 'task') {
        const response = await taskApi.list();
        const tasks = response.data.tasks || response.data || [];
        if (Array.isArray(tasks) && tasks.length > 0) {
          return tasks.map((t: any, i: number) => 
            `${i + 1}. ${t.title}${t.completed ? ' ✓' : ''}${t.dueAt ? ` (due: ${new Date(t.dueAt).toLocaleDateString()})` : ''}`
          ).join('\n');
        }
        return 'No tasks found.';
      }
      
      if (cmd === 'docs' || cmd === 'documents') {
        const response = await documentApi.list();
        const docs = response.data.documents || response.data || [];
        if (Array.isArray(docs) && docs.length > 0) {
          return docs.map((d: any, i: number) => 
            `${i + 1}. ${d.title} (${d.docType})`
          ).join('\n');
        }
        return 'No documents found.';
      }
      
      if (cmd === 'briefing') {
        const response = await briefingApi.get();
        const briefing = response.data.briefing || response.data || {};
        return briefing.summary || JSON.stringify(briefing, null, 2);
      }
      
      // Default: treat as AI query
      const response = await queryApi.ask(query);
      return response.data.answer || response.data.response || 'No answer available.';
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message;
      if (errorMsg.includes('authorization') || errorMsg.includes('Missing')) {
        setShowAuth(true);
        return 'Please login to use this feature.';
      }
      return `Error: ${errorMsg}`;
    }
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    return handleQuery(message);
  };

  // Remove browser extension attributes that cause hydration issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      if (body) {
        body.removeAttribute('cz-shortcut-listen');
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-green-400 font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-gray-200">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] px-6 py-3 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="h-8 w-8 rounded bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-black font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Paka
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-600 text-white">
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.displayName || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-200">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Login
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <Terminal onCommand={handleQuery} />
        </motion.div>

        {/* Chat */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          <Chat onSendMessage={handleChatMessage} />
        </motion.div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
}
