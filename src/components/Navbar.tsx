"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; href: string; onClick?: () => void }[] = [
    { name: 'AI Solutions', href: '/ai-revenue' },
    { name: 'Car Detailing', href: '/car-detailing' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Community', href: '/internship' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6`}>
        <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-2xl border-white/20' : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img src="/cram_logo_cs.png" alt="CRAM" className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={link.onClick}
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-[#D18F08] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D18F08] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+447448167943" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition">
              <Phone size={14} className="text-[#D18F08]" />
              Support
            </a>
            <button 
              onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
              className="btn-premium bg-[#D18F08] text-black text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-widest hover:shadow-[0_0_20px_rgba(209,143,8,0.4)]"
            >
              Request Demo
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 z-[90] md:hidden"
          >
            <div className="glass-panel rounded-3xl p-8 flex flex-col gap-6 shadow-3xl border-[#D18F08]/20">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-bold uppercase tracking-widest text-[#D18F08]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-white/10 w-full my-2"></div>
              <a href="tel:+447448167943" className="flex items-center gap-4 text-white font-bold">
                <Phone className="text-[#D18F08]" /> Call Support
              </a>
              <button 
                onClick={() => {
                  window.dispatchEvent(new Event('open-demo-modal'));
                  setMobileMenuOpen(false);
                }}
                className="bg-[#D18F08] text-black font-bold py-4 rounded-xl uppercase tracking-widest"
              >
                Request Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
