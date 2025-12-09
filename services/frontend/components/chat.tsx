'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// Removed ScrollArea - using div with overflow instead
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface ChatProps {
  onSendMessage?: (message: string) => Promise<string>;
}

export function Chat({ onSendMessage }: ChatProps) {
  const { messages, addMessage, updateMessage } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });

    setIsLoading(true);
    addMessage({
      role: 'assistant',
      content: '',
      isLoading: true,
    });

    try {
      let response = '';
      if (onSendMessage) {
        response = await onSendMessage(userMessage);
      } else {
        // Simulate response
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = `I received your message: "${userMessage}". This is a placeholder response.`;
      }

      // Find and update the last assistant message that's loading
      const currentMessages = useStore.getState().messages;
      const loadingMessage = [...currentMessages].reverse().find(m => m.role === 'assistant' && m.isLoading);
      if (loadingMessage) {
        updateMessage(loadingMessage.id, { content: response, isLoading: false });
      }
    } catch (error: any) {
      // Find and update the last assistant message that's loading
      const currentMessages = useStore.getState().messages;
      const loadingMessage = [...currentMessages].reverse().find(m => m.role === 'assistant' && m.isLoading);
      if (loadingMessage) {
        updateMessage(loadingMessage.id, {
          content: `Error: ${error.message}`,
          isLoading: false,
        });
      }
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-[#1a1a1a]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold">Paka AI Assistant</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500 py-12"
              >
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                <p className="text-sm">Start a conversation with Paka AI</p>
                <p className="text-xs mt-2 text-gray-600">
                  Ask questions, get insights, or use terminal commands
                </p>
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border border-[#1a1a1a]">
                      <AvatarFallback className="bg-[#1a1a1a] text-green-400">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2',
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#1a1a1a] text-gray-200 border border-[#2a2a2a]'
                    )}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border border-blue-600">
                      <AvatarFallback className="bg-blue-600 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[#1a1a1a] p-4">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[120px] resize-none bg-[#0a0a0a] border-[#1a1a1a] text-gray-200 placeholder:text-gray-600 focus-visible:ring-green-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

