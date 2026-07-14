'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/types/portfolio';

const suggestedQuestions = [
  "What are Muhammad's skills?",
  "What's Muhammad's experience with AI?",
];

export function ChatWidget() {
  const { isChatOpen, setChatOpen, chatMessages, addMessage, isTyping, setIsTyping } = usePortfolioStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await response.json();

      if (response.status === 429 || data.error?.includes('busy') || data.error?.includes('rate')) {
        const retryMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '⏳ The AI service is temporarily busy. Please wait a moment and try again.',
          timestamp: new Date(),
        };
        addMessage(retryMessage);
        return;
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.error || 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered a connection error. Please try again.',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChatOpen(false)}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(8px)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 w-[95vw] max-w-md h-[70vh] max-h-[600px] z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(18, 18, 25, 0.95)',
              border: '1px solid rgba(37, 99, 235, 0.15)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex items-center justify-between p-4 shrink-0" style={{ borderBottom: '1px solid rgba(37, 99, 235, 0.1)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90">AI Assistant</h3>
                  <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Ask me anything about Muhammad</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="shrink-0 cursor-pointer text-white/40 hover:text-white/80">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 hide-scrollbar">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="font-semibold mb-2 text-white/90">Hi there! 👋</h4>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    I&apos;m Muhammad&apos;s AI assistant. Ask me anything about his skills, projects, or experience!
                  </p>

                  <div className="w-full space-y-2 px-2">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => sendMessage(question)}
                        className="w-full p-3 text-left text-sm rounded-xl cursor-pointer transition-colors"
                        style={{
                          background: 'rgba(37, 99, 235, 0.06)',
                          border: '1px solid rgba(37, 99, 235, 0.1)',
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.12)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.06)'; }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={cn('flex gap-3', message.role === 'user' && 'flex-row-reverse')}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                          message.role === 'user'
                            ? 'bg-blue-600'
                            : ''
                        )}
                        style={message.role === 'assistant' ? { background: 'linear-gradient(135deg, #2563eb, #3b82f6)' } : {}}
                      >
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'max-w-[80%] p-3 rounded-2xl text-sm',
                          message.role === 'user'
                            ? 'rounded-br-md text-white'
                            : 'rounded-bl-md'
                        )}
                        style={
                          message.role === 'user'
                            ? { background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }
                            : {
                                background: 'rgba(37, 99, 235, 0.06)',
                                border: '1px solid rgba(37, 99, 235, 0.1)',
                                color: 'rgba(255, 255, 255, 0.8)',
                              }
                        }
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div
                        className="p-3 rounded-2xl rounded-bl-md"
                        style={{
                          background: 'rgba(37, 99, 235, 0.06)',
                          border: '1px solid rgba(37, 99, 235, 0.1)',
                        }}
                      >
                        <div className="flex gap-1">
                          {[0, 0.2, 0.4].map((delay) => (
                            <motion.span
                              key={delay}
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay }}
                              className="w-2 h-2 rounded-full"
                              style={{ background: 'rgba(37, 99, 235, 0.6)' }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 shrink-0" style={{ borderTop: '1px solid rgba(37, 99, 235, 0.1)' }}>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                  className="flex-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 cursor-pointer border-0 text-white"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
