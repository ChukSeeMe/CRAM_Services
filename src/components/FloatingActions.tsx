"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageSquare, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    { 
      name: 'Call Us', 
      icon: <Phone size={20} />, 
      href: 'tel:+447448167943',
      color: 'bg-white text-black'
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageSquare size={20} />, 
      href: 'https://wa.me/447448167943',
      color: 'bg-[#25D366] text-white'
    },
    { 
      name: 'Book Demo', 
      icon: <Calendar size={20} />, 
      onClick: () => {
        window.dispatchEvent(new Event('open-demo-modal'));
        setIsOpen(false);
      },
      color: 'bg-[#D18F08] text-black'
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[90] md:hidden">
      <AnimatePresence>
        {isVisible && (
          <div className="relative flex flex-col items-end gap-4">
            {/* Action Buttons */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="flex flex-col items-end gap-3 mb-2"
                >
                  {actions.map((action, i) => (
                    <motion.div
                      key={action.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                        {action.name}
                      </span>
                      {action.href ? (
                        <a 
                          href={action.href}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl ${action.color}`}
                        >
                          {action.icon}
                        </a>
                      ) : (
                        <button 
                          onClick={action.onClick}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl ${action.color}`}
                        >
                          {action.icon}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-16 h-16 bg-[#D18F08] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(209,143,8,0.5)] border border-white/20 z-[91]"
            >
              {isOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
