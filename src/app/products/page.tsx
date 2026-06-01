"use client";

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Lock, 
  Anchor, 
  Globe, 
  ExternalLink
} from 'lucide-react';
import Footer from '@/components/Footer';

const products = [
  {
    id: 'tutor-harbour',
    title: 'Tutor Harbour',
    tagline: 'Elite Tutoring & Mentorship Ecosystem',
    description: 'An educational technology platform engineered to connect students with verified elite tutors. Featuring advanced matching algorithms, lesson tracking systems, and secure classroom interfaces, Tutor Harbour anchors learning success.',
    category: 'EdTech Platform',
    img: '/images/products/tutor_harbour.jpg',
    features: [
      { icon: <Users size={16} />, text: 'Smart matching algorithm connecting learners with specific subject specialists.' },
      { icon: <BookOpen size={16} />, text: 'Integrated student progress dashboards and syllabus tracking.' },
      { icon: <Anchor size={16} />, text: 'Dedicated secure spaces for lesson booking and schedule management.' }
    ],
    status: 'Live Platform',
    accentColor: '#34D399', // Green theme
    ctaText: 'Launch Tutor Harbour',
    href: '#',
    isExternal: false
  },
  {
    id: 'nuru',
    title: 'Nuru',
    tagline: 'Urban Lifestyle & Cultural Discovery App',
    description: 'Discover. Connect. Live Your City. Nuru is a premium urban lifestyle app designed to connect citizens and tourists with local cultural events, hidden hotspots, and small business ecosystems. Bridging community and commerce.',
    category: 'Consumer Mobile App',
    img: '/images/products/nuru.jpg',
    features: [
      { icon: <MapPin size={16} />, text: 'Curated neighborhood maps detailing culinary, artistic, and community hubs.' },
      { icon: <Compass size={16} />, text: 'Real-time event schedules and interactive city exploration guides.' },
      { icon: <Sparkles size={16} />, text: 'Direct business integration for booking tickets and engaging with local vendors.' }
    ],
    status: 'Beta Launch',
    accentColor: '#D18F08', // Gold theme
    ctaText: 'Explore City Guides',
    href: '#',
    isExternal: false
  },
  {
    id: 'dfg',
    title: 'Daily Finance Guard (DFG)',
    tagline: 'Intelligent Wealth Security & Analytics',
    description: 'An enterprise-grade personal and corporate financial safety dashboard. DFG monitors income and expenditure trends, safeguards assets with anomaly detection alerts, and projects long-term growth paths using predictive analytics.',
    category: 'FinTech Dashboard',
    img: '/images/products/dfg.png',
    features: [
      { icon: <ShieldCheck size={16} />, text: 'Real-time financial anomaly and expense leakage detection.' },
      { icon: <TrendingUp size={16} />, text: 'Algorithmic growth projections and predictive budget tools.' },
      { icon: <Lock size={16} />, text: 'Bank-level encrypted dashboard displaying multi-account statistics.' }
    ],
    status: 'Enterprise Beta',
    accentColor: '#3B82F6', // Blue theme
    ctaText: 'Request API Access',
    href: '#',
    isExternal: false
  },
  {
    id: 'afroconnect',
    title: 'AFRO Connect Technology',
    tagline: 'Pan-African Developer Incubator & Tech Media Brand',
    description: 'CRAM\'s flagship technological venture in Africa. AFRO Connect Technology trains and mentors young African developers to build and launch production-grade software applications, while running a specialized digital media platform that spotlights tech breakthroughs, culture, and startups across the continent.',
    category: 'Incubator & Digital Media',
    img: '/images/products/afro_connect.jpg',
    features: [
      { icon: <GraduationCap size={16} />, text: 'Intensive software development training pipelines helping youth build & launch.' },
      { icon: <ShieldCheck size={16} />, text: 'AFRO Connect Scorecard evaluating skills progression, code quality, and launch readiness.' },
      { icon: <Globe size={16} />, text: 'Pan-African developer incubator linking local engineers to global projects.' },
      { icon: <Sparkles size={16} />, text: 'Premier Digital Media channel publicizing technology insights, events, and startup stories.' }
    ],
    status: 'Active Hub',
    accentColor: '#EAB308', // Yellow/Gold theme
    ctaText: 'Visit AfroConnect.tech',
    href: 'https://www.afroconnect.tech',
    isExternal: true
  }
];

export default function ProductsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      {/* Hero Section */}
      <header className="relative pt-48 pb-20 px-6 overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D18F08] opacity-[0.04] blur-[130px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#D18F08] opacity-[0.02] blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block glass-panel px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-[#D18F08] mb-6 shadow-md border-[#D18F08]/20">
              Proprietary Product Ecosystem
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-accent)' }}>
              CRAM <span className="text-gold-gradient">PROPRIETARY PRODUCTS.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Bespoke digital applications built, nurtured, and scaled by CRAM engineering to optimize education, city life, and wealth security.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Products Showcase */}
      <section className="px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="space-y-24"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch bg-[#0A0A0A]/80 border border-white/5 rounded-[3rem] p-8 md:p-12 lg:p-16 hover:border-[#D18F08]/25 transition-all duration-500 group relative overflow-hidden`}
              >
                {/* Glowing light effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D18F08]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Product Logo / Image */}
                <div className="w-full lg:w-2/5 flex items-center justify-center relative">
                  <div className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700 border border-white/10 bg-[#050505] flex items-center justify-center p-4">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-contain rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  {/* Decorative glowing backblob */}
                  <div 
                    className="absolute w-[80%] h-[80%] opacity-10 blur-[80px] rounded-full pointer-events-none -z-10 group-hover:opacity-15 transition-opacity"
                    style={{ backgroundColor: product.accentColor }}
                  ></div>
                </div>

                {/* Product Content Details */}
                <div className="w-full lg:w-3/5 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D18F08] bg-[#D18F08]/10 px-3.5 py-1.5 rounded-full border border-[#D18F08]/25">
                      {product.category}
                    </span>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{ 
                        borderColor: `${product.accentColor}30`, 
                        color: product.accentColor,
                        backgroundColor: `${product.accentColor}08`
                      }}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>
                    {product.title}
                  </h2>
                  <p className="text-[#D18F08] text-sm md:text-base font-semibold mb-6 tracking-wide uppercase">
                    {product.tagline}
                  </p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-light">
                    {product.description}
                  </p>

                  {/* Core Features */}
                  <div className="space-y-4 mb-10 border-t border-white/5 pt-8">
                    <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-gray-500 mb-4">Core Ecosystem Features</h4>
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 text-xs md:text-sm text-gray-300 leading-relaxed">
                        <div 
                          className="p-1.5 rounded-lg border shrink-0 mt-0.5"
                          style={{ 
                            borderColor: `${product.accentColor}25`, 
                            color: product.accentColor,
                            backgroundColor: `${product.accentColor}05`
                          }}
                        >
                          {feature.icon}
                        </div>
                        <span className="mt-1">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                    {product.isExternal ? (
                      <a 
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium w-full sm:w-auto text-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-[0_0_20px_rgba(209,143,8,0.25)] transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#D18F08' }}
                      >
                        {product.ctaText} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button 
                        onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
                        className="btn-premium w-full sm:w-auto text-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-[0_0_20px_rgba(209,143,8,0.25)] transition-all"
                        style={{ backgroundColor: '#D18F08' }}
                      >
                        {product.ctaText}
                      </button>
                    )}
                    
                    <button 
                      onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
                      className="glass-panel w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-300 hover:border-white/40 transition-all text-center flex items-center justify-center gap-2 group/btn"
                    >
                      Request Details <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* bottom CTA Banner */}
      <section className="py-24 px-6 border-t border-white/5 mt-32 bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 md:p-16 rounded-[4rem] border-[#D18F08]/15 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-transparent via-[#D18F08] to-transparent"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-accent)' }}>
            WANT TO BUILD YOUR <span className="text-[#D18F08]">OWN PRODUCT?</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
            CRAM Services partners with ambitious founders and enterprise brands to design, engineer, and deploy high-performance software products, mobile applications, and AI platforms.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
            className="btn-premium bg-white text-black px-10 py-4.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#D18F08] transition-all"
          >
            Consult Our Engineering Team
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
