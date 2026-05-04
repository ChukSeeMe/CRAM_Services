"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Layers, Search, ArrowRight, Zap, Car } from 'lucide-react';
import Link from 'next/link';

const categories = ["All", "Automotive", "Technology", "Process", "Community"];

const newsItems = [
  {
    date: 'OCTOBER 2026',
    title: 'CRAM Services Expands AI Predictive Infrastructure',
    excerpt: 'Our newly deployed algorithmic models are increasing client revenue capture by an average of 42% within the first quarter of integration.',
    category: 'Technology'
  },
  {
    date: 'SEPTEMBER 2026',
    title: 'New Executive Fleet Detailing Contracts Signed',
    excerpt: 'We are proud to announce our partnership with three major logistics firms to handle the complete detailing and preservation of their executive fleets.',
    category: 'Automotive'
  },
  {
    date: 'AUGUST 2026',
    title: 'Community Interest Company (CIC) Graduation',
    excerpt: 'Over 50 young professionals graduated from our summer skills acquisition program, moving directly into high-paying roles in tech and automotive sectors.',
    category: 'Community'
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter(item => 
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden flex items-center min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D18F08]/5 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 flex items-center justify-center gap-4">
              <Camera size={14} /> MEDIA & INSIGHTS
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.0] mb-8" style={{ fontFamily: 'var(--font-accent)' }}>
              THE CRAM <span className="text-gold-gradient">GALLERY.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Explore our premium services, behind-the-scenes processes, and the community initiatives driving our mission forward.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#D18F08] text-black shadow-[0_0_20px_rgba(209,143,8,0.4)]' 
                    : 'bg-[#111] text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <Link href={`/gallery/${item.id}`} key={item.id} className={`block ${activeCategory === 'All' ? item.span : 'col-span-1 row-span-1 h-[250px]'}`}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`relative group overflow-hidden rounded-3xl bg-[#111] border border-white/5 hover:border-[#D18F08]/40 h-full w-full`}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-[#D18F08] text-[10px] uppercase tracking-widest font-bold mb-2 block">{item.category}</span>
                      <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-accent)' }}>{item.title}</h3>
                    </div>
                    
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10 text-white">
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-32 px-6 bg-[#080808] border-t border-white/5 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-3xl">
              <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Company Announcements</span>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-accent)' }}>NEWS & <span className="text-white/30">UPDATES.</span></h2>
            </div>
            <Link href="/contact" className="btn-premium bg-[#111] border border-white/20 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] hover:text-[#D18F08] transition-all whitespace-nowrap">
              Press Inquiries
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news, idx) => (
              <div key={idx} className="glass-panel p-10 rounded-3xl group hover:border-[#D18F08]/30 transition-all flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  {news.category === 'Technology' && <Zap size={16} className="text-[#D18F08]" />}
                  {news.category === 'Automotive' && <Car size={16} className="text-[#D18F08]" />}
                  {news.category === 'Community' && <Layers size={16} className="text-[#D18F08]" />}
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{news.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#D18F08] transition-colors" style={{ fontFamily: 'var(--font-accent)' }}>
                  {news.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 flex-grow">
                  {news.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#D18F08] text-xs font-bold uppercase tracking-widest cursor-pointer group/link mt-auto">
                  Read Full Article <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
