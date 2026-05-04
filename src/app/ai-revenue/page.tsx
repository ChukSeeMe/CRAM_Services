"use client";

import { motion } from 'framer-motion';
import { Database, Bot, Workflow, BarChart3, ShieldCheck, CheckCircle2, ChevronRight, Server, Cloud, Cpu, LineChart, Briefcase, GraduationCap, Car, CircleDollarSign, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AIRevenue() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const coreCategories = [
    {
      title: 'Autonomous Sales AI',
      icon: <Bot size={24} />,
      capabilities: ['Lead Capture Voice Assistants', '24/7 Conversion Chatbots', 'Predictive Upsell Matrices', 'Automated Closing Engines']
    },
    {
      title: 'Monetization Infrastructure',
      icon: <TrendingUp size={24} />,
      capabilities: ['Real-time Revenue Dashboards', 'Churn Prediction Systems', 'Dynamic Usage Billing Data', 'Automated Financial Reporting']
    },
    {
      title: 'Cost Eradication Systems',
      icon: <Workflow size={24} />,
      capabilities: ['Extreme Workflow Automation', 'Supply Chain Orchestration', 'Cross-Platform API Interfacing', 'Redundant Personnel Replacement']
    }
  ];

  const industries = [
    { icon: <BarChart3 className="text-[#D18F08] w-8 h-8" />, title: 'Finance & FinTech', desc: 'Recover lost transaction revenue and eliminate up to 40% of manual fraud review overhead using predictive intelligence.' },
    { icon: <LineChart className="text-[#D18F08] w-8 h-8" />, title: 'Sports Intelligence', desc: 'Monetize fan-base interaction and algorithmically model high-probability player acquisition ROI.' },
    { icon: <GraduationCap className="text-[#D18F08] w-8 h-8" />, title: 'Education Systems', desc: 'Scale tutor capabilities infinitely via autonomous AI learning platforms, driving 100% margin subscription models.' },
    { icon: <Car className="text-[#D18F08] w-8 h-8" />, title: 'Auto Dealerships', desc: 'Deploy AI sales assistants to nurture leads autonomously, drastically lowering customer acquisition cost (CAC).' },
    { icon: <Briefcase className="text-[#D18F08] w-8 h-8" />, title: 'Luxury & Aviation', desc: 'Zero-latency booking automation designed to capture and retain high-net-worth clients without human friction.' }
  ];

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/dashboard.png" alt="Revenue Analytics Dashboard" className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#0A0A0A]/60"></div>
          <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-sm"></div>
        </div>
        
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D18F08] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 relative z-10 text-center mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="w-full max-w-5xl"
          >
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 flex items-center justify-center gap-4">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D18F08]"></span> 
                CRAM Revenue Architecture 
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D18F08]"></span>
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-bold leading-[0.95] tracking-tight mb-8" style={{ fontFamily: 'var(--font-accent)' }}>
              ACCELERATE <br /> <span className="text-gold-gradient">CASH FLOW.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              We do not just build software. We forge aggressive, highly-intelligent data systems engineered strictly to multiply your business revenue and eradicate operational overhead.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => window.dispatchEvent(new Event('open-demo-modal'))} className="btn-premium bg-[#D18F08] text-black px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(209,143,8,0.3)]">
                Deploy Intelligence
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Monetization Impact Image Embed */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>THE MATHEMATICS OF <span className="text-[#D18F08]">SCALING.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                 CRAM Services transitions your enterprise out of generic overhead and completely automates the fundamental axes of your monetization cycle.
              </p>
              <div className="space-y-6">
               {[
                 { from: 'Generic SaaS Tools', to: 'Bespoke Revenue Systems' },
                 { from: 'Manual Administrative Teams', to: 'Zero-Latency AI Automation' },
                 { from: 'Reactive Historic Reporting', to: 'Predictive Financial Intelligence' }
               ].map((prop, i) => (
                 <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between text-sm font-bold tracking-wide border-b border-white/5 pb-4">
                    <span className="text-gray-600 line-through">{prop.from}</span>
                    <ChevronRight size={16} className="text-[#D18F08] mx-4 shrink-0" />
                    <span className="text-white text-right">{prop.to}</span>
                 </motion.div>
               ))}
              </div>
           </div>
           <div className="relative pt-10 lg:pt-0">
              <div className="absolute inset-0 bg-[#D18F08] opacity-10 blur-3xl rounded-full"></div>
              <img src="/dashboard.png" className="relative z-10 w-full rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(209,143,8,0.15)] transform rotate-1 hover:rotate-0 transition-transform duration-700" alt="B2B Analytic Interface" />
           </div>
        </div>
      </section>

      {/* Core Revenue Categories */}
      <section id="capabilities" className="py-32 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-accent)' }}>DEPLOYMENT <span className="text-[#D18F08]">VECTORS.</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed text-center max-w-2xl mx-auto">
              Our bespoke infrastructures operate tirelessly to secure leads, close sales, and optimize every margin point of your business.
            </p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreCategories.map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="glass-panel text-center md:text-left p-12 rounded-[2.5rem] border-transparent hover:border-[#D18F08]/30 transition-all group hover:-translate-y-2 duration-500">
                <div className="bg-[#D18F08]/10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 text-[#D18F08] mx-auto md:mx-0 shadow-[0_0_20px_rgba(209,143,8,0.1)] group-hover:shadow-[0_0_30px_rgba(209,143,8,0.3)] transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-accent)' }}>{cat.title}</h3>
                <ul className="space-y-5">
                  {cat.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start justify-center md:justify-start gap-4 text-gray-300 text-sm font-medium">
                      <Zap size={16} className="text-[#D18F08] mt-0.5 shrink-0" />
                      <span className="text-left">{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions Showcase */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
             <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Unfair Advantage</span>
             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>ROI BY <span className="text-[#D18F08]">SECTOR.</span></h2>
             <p className="text-gray-400 max-w-2xl mx-auto">We do not believe in SaaS subscriptions that cost you money. We build specific tools designed to inject cash into distinct industries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-10 rounded-[2.5rem] group border-transparent hover:border-[#D18F08]/20 transition-colors">
                <div className="bg-[#D18F08]/10 p-4 w-fit rounded-2xl mb-6 shadow-[0_0_15px_rgba(209,143,8,0.1)]">
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{ind.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative z-10 flex items-center justify-center border-b border-white/5 bg-[#050505]">
        <div className="absolute inset-0 bg-[#D18F08] opacity-[0.01] blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-16 md:p-24 rounded-[4rem] border-transparent shadow-[0_0_50px_rgba(209,143,8,0.05)] hover:border-[#D18F08]/20 transition-all">
          <CircleDollarSign size={48} className="text-[#D18F08] mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-accent)' }}>
            STOP <span className="text-gray-600">MANAGING.</span><br />START <span className="text-[#D18F08]">MULTIPLYING.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Book an architecture review with our team. We will analyze your operational bottlenecks and design the precise AI engine to increase your net revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => window.dispatchEvent(new Event('open-demo-modal'))} className="btn-premium bg-white text-black px-12 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-3xl hover:bg-[#D18F08] transition-all">
              Initialize Revenue Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
