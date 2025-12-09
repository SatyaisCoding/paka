import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  displayName?: string;
  imageUrl?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface AppState {
  user: User | null;
  token: string | null;
  messages: Message[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      messages: [],
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      },
      addMessage: (message) =>
        set((state) => {
          // Generate ID only on client to avoid hydration mismatch
          const id = typeof window !== 'undefined' 
            ? `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            : `temp-${state.messages.length}`;
          return {
            messages: [
              ...state.messages,
              {
                ...message,
                id,
                timestamp: typeof window !== 'undefined' ? new Date() : new Date(0),
              },
            ],
          };
        }),
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        })),
      clearMessages: () => set({ messages: [] }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          messages: [],
        }),
    }),
    {
      name: 'paka-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

