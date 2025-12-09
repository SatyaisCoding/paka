'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Terminal as TerminalIcon, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  status: 'success' | 'error' | 'pending';
}

interface TerminalProps {
  onCommand?: (command: string) => Promise<string>;
}

export function Terminal({ onCommand }: TerminalProps) {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message only on client
  useEffect(() => {
    setIsMounted(true);
    setCommands([
      {
        id: '1',
        command: 'help',
        output: 'Welcome to Paka Terminal!\n\nAvailable commands:\n- help: Show this help message\n- query <text>: Ask a question\n- docs: List documents\n- tasks: Show tasks\n- briefing: Get daily briefing\n- clear: Clear terminal',
        timestamp: new Date(),
        status: 'success',
      },
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [commands]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    const commandId = Date.now().toString();
    const newCommand: TerminalCommand = {
      id: commandId,
      command: cmd,
      output: '',
      timestamp: new Date(),
      status: 'pending',
    };

    setCommands((prev) => [...prev, newCommand]);
    setIsExecuting(true);
    setInput('');

    try {
      let output = '';

      // Handle built-in commands
      if (cmd === 'clear') {
        setCommands([]);
        setIsExecuting(false);
        return;
      }

      if (cmd === 'help') {
        output = 'Available commands:\n- help: Show this help message\n- query <text>: Ask a question\n- docs: List documents\n- tasks: Show tasks\n- briefing: Get daily briefing\n- clear: Clear terminal\n\nOr just type your question directly!';
      } else if (cmd.startsWith('query ')) {
        const query = cmd.replace('query ', '');
        if (onCommand) {
          output = await onCommand(query);
        } else {
          output = `Query: ${query}\n[AI response would appear here]`;
        }
      } else if (onCommand) {
        // Treat as query if no command match
        output = await onCommand(cmd);
      } else {
        output = `Command not found: ${cmd}\nType 'help' for available commands.`;
      }

      setCommands((prev) =>
        prev.map((c) =>
          c.id === commandId
            ? { ...c, output, status: 'success' as const }
            : c
        )
      );
    } catch (error: any) {
      setCommands((prev) =>
        prev.map((c) =>
          c.id === commandId
            ? { ...c, output: `Error: ${error.message}`, status: 'error' as const }
            : c
        )
      );
    } finally {
      setIsExecuting(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isExecuting) {
      executeCommand(input);
    }
  };

  return (
    <Card className="h-full flex flex-col bg-[#0a0a0a] border-[#1a1a1a] text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a]">
        <TerminalIcon className="h-4 w-4 text-green-400" />
        <span className="text-sm font-semibold">Paka Terminal</span>
        <Badge variant="outline" className="ml-auto text-xs">
          v1.0
        </Badge>
      </div>

      {/* Terminal Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 text-sm"
      >
        <AnimatePresence>
          {commands.map((cmd) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {/* Command Input */}
              <div className="flex items-start gap-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">{cmd.command}</span>
              </div>

              {/* Command Output */}
              {cmd.status === 'pending' ? (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Executing...</span>
                </div>
              ) : (
                <div
                  className={`ml-4 whitespace-pre-wrap ${
                    cmd.status === 'error' ? 'text-red-400' : 'text-gray-300'
                  }`}
                >
                  {cmd.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {commands.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Type 'help' to get started
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="border-t border-[#1a1a1a] p-4">
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command or ask a question..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 text-gray-300 placeholder:text-gray-600"
            disabled={isExecuting}
            autoFocus
          />
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={isExecuting || !input.trim()}
            className="text-green-400 hover:text-green-300"
          >
            {isExecuting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

