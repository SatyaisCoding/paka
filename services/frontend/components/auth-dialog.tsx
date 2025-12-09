'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { useStore } from '@/lib/store';
import { Loader2 } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser, setToken } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await authApi.login(email, password);
        const data = response.data;
        if (data.ok && data.token && data.user) {
          // Store token immediately in localStorage
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUser(data.user);
          onOpenChange(false);
        } else {
          setError('Invalid response from server');
        }
      } else {
        const response = await authApi.signup(email, password);
        const data = response.data;
        if (data.ok && data.token && data.user) {
          // Store token immediately in localStorage
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUser(data.user);
          onOpenChange(false);
        } else {
          setError('Invalid response from server');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0a] border-[#1a1a1a] text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-green-400">
            {isLogin ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-400">Display Name</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-200"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-200"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#2a2a2a] text-gray-200"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? 'Logging in...' : 'Signing up...'}
              </>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-gray-400 hover:text-gray-200"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

