"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING = "Hi! I'm the CRAM Services AI assistant. I can help you learn about our AI automation systems, car detailing services, pricing, or how to get started. What would you like to know?";

// WhatsApp icon SVG component
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      const reply = data.reply || data.message || data.response || 'Thank you for your message. A member of our team will follow up shortly.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please WhatsApp us at +44 7448 167943 or email cramserviceshub@gmail.com.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[95] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100vw-3rem)] max-w-[380px] flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-2"
            style={{ maxHeight: 'min(520px, calc(100dvh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D18F08] flex items-center justify-center">
                  <Bot size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">CRAM AI Assistant</p>
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">● Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '300px', maxHeight: '360px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#D18F08] text-black font-medium rounded-br-sm'
                        : 'bg-[#1a1a1a] text-gray-200 border border-white/5 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 size={16} className="text-[#D18F08] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {['AI automation pricing', 'Book car detailing', 'What services do you offer?'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => { setInput(suggestion); }}
                    className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:border-[#D18F08] hover:text-white transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 p-3 flex gap-2 bg-[#0d0d0d]">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D18F08] transition placeholder-gray-600"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-[#D18F08] rounded-xl flex items-center justify-center hover:bg-[#b07806] transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={16} className="text-black" />
              </button>
            </div>

            {/* WhatsApp fallback */}
            <div className="px-4 pb-3 text-center">
              <a
                href="https://wa.me/447448167943"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] text-[#25D366] hover:underline"
              >
                <WhatsAppIcon size={12} /> Prefer WhatsApp? Chat here
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#D18F08] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(209,143,8,0.5)] border border-white/10 hover:bg-[#b07806] transition-colors"
        aria-label="Open CRAM AI chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} className="text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={24} className="text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
