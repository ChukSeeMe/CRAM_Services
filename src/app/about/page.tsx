"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Zap, CheckCircle2, HeartHandshake, ArrowRight, Bot, Car, Plane } from 'lucide-react';
import Footer from '@/components/Footer';

const stats = [
  { value: '12+', label: 'AI Agents Deployed' },
  { value: '3', label: 'Service Divisions' },
  { value: 'UK', label: 'Nationwide Coverage' },
  { value: 'CIC', label: 'Community Company' },
];

const values = [
  {
    icon: <Zap size={22} />,
    title: 'AI-First',
    desc: 'Every business solution we build starts with intelligent automation at its core — not as a feature, but as the foundation.',
  },
  {
    icon: <CheckCircle2 size={22} />,
    title: 'Results-Driven',
    desc: 'We measure success by tangible outcomes — more leads, less wasted time, and real revenue impact — not just deliverables.',
  },
  {
    icon: <HeartHandshake size={22} />,
    title: 'Community-Led',
    desc: 'As a registered CIC, we reinvest in local skills development, creating pathways for the next generation of tech and service professionals.',
  },
];

const divisions = [
  {
    icon: <Bot size={20} />,
    name: 'AI Automation Systems',
    desc: 'Lead capture, customer chatbots, voice AI, content engines, sales automation. Built for your workflow.',
    href: '/ai-revenue',
  },
  {
    icon: <Car size={20} />,
    name: 'Premium Automotive Detailing',
    desc: 'Concierge-level car care from a basic wash to ceramic coatings and paint protection film. Fully mobile, UK-wide.',
    href: '/car-detailing',
  },
  {
    icon: <Plane size={20} />,
    name: 'Jet Detailing',
    desc: 'Aviation-grade aircraft cleaning and detailing services delivered to the same exacting standard as everything else we do.',
    href: '#',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen">

      {/* Hero */}
      <header className="relative pt-40 pb-24 px-6 overflow-hidden flex items-center min-h-[55vh]">
        <div className="hidden md:block absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D18F08]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 flex items-center gap-4">
              <Users size={14} /> About CRAM Services
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.0] mb-8 max-w-4xl"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              BUILT ON <span className="text-gold-gradient">PRECISION</span> AND PURPOSE.
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed">
              CRAM Services is a UK-based company headquartered in Coventry, operating across three elite service divisions. We combine intelligent technology with uncompromising physical execution — and we do it as a Community Interest Company.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Stats Strip */}
      <section className="border-y border-white/5 bg-[#080808] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#D18F08] mb-1" style={{ fontFamily: 'var(--font-accent)' }}>
                {s.value}
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEO / Founder Section */}
      <section className="py-24 md:py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-[#D18F08]/20 transition-all">

            {/* CEO Image */}
            <div className="w-full lg:w-2/5 h-[480px] lg:h-[600px] overflow-hidden relative flex-shrink-0">
              <div className="absolute inset-0 bg-[#D18F08]/10 mix-blend-overlay z-10"></div>
              <img
                src="/ai_provided_image.jpg"
                alt="CRAM Services Founder & CEO"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-20"></div>
              {/* Name Card */}
              <div className="absolute bottom-6 left-6 z-30 glass-panel rounded-2xl px-5 py-4">
                <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-accent)' }}>
                  Founder &amp; CEO
                </p>
                <p className="text-[#D18F08] text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  CRAM Services Group
                </p>
              </div>
            </div>

            {/* CEO Bio */}
            <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
              <span className="text-[#D18F08] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                Leadership
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                THE VISION BEHIND THE BRAND.
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-5">
                CRAM Services was founded with a singular mission: to deliver elite-level AI systems, software products, and physical services that genuinely move businesses forward. Not through hype — through execution.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                The company operates at the intersection of technology and service excellence. Our AI division builds practical systems that automate the most time-consuming parts of running a business. Our automotive and aviation divisions deliver the same obsessive quality in physical form — every detail, every time.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                As a registered Community Interest Company (CIC) based in Coventry, we also invest a portion of our work back into the community — running skills acquisition programmes that create real career pathways in tech and premium services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ai-revenue"
                  className="btn-premium bg-[#D18F08] text-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center inline-flex items-center justify-center gap-2"
                >
                  Explore AI Services <ArrowRight size={14} />
                </Link>
                <Link
                  href="/internship"
                  className="glass-panel px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] transition-all text-center"
                >
                  Community Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 px-6 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-[#D18F08] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
              Our Principles
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              HOW WE WORK. <span className="text-white/25">WHY IT MATTERS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D18F08]/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#D18F08]/10 text-[#D18F08] rounded-2xl flex items-center justify-center mb-6 border border-[#D18F08]/20">
                  {v.icon}
                </div>
                <h3
                  className="text-white font-bold text-xl mb-3"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  {v.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Divisions */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[#D18F08] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
              What We Do
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              THREE DIVISIONS. <span className="text-white/25">ONE STANDARD.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {d.href !== '#' ? (
                  <Link
                    href={d.href}
                    className="block glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D18F08]/40 transition-all group h-full"
                  >
                    <DivisionCard division={d} />
                  </Link>
                ) : (
                  <button
                    onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
                    className="w-full text-left glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D18F08]/40 transition-all group"
                  >
                    <DivisionCard division={d} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 md:p-20 rounded-[4rem]">
          <Users size={44} className="text-[#D18F08] mx-auto mb-8 opacity-70" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            READY TO <span className="text-white/30">WORK TOGETHER?</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need an AI system, a car detail, or want to know more about our CIC programmes — the team is ready to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
              className="btn-premium bg-[#D18F08] text-black px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(209,143,8,0.4)] transition-all"
            >
              Request a Demo
            </button>
            <a
              href="https://wa.me/447448167943"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DivisionCard({ division }: { division: { icon: React.ReactNode; name: string; desc: string } }) {
  return (
    <>
      <div className="w-12 h-12 bg-[#D18F08]/10 text-[#D18F08] rounded-2xl flex items-center justify-center mb-6 border border-[#D18F08]/20 group-hover:bg-[#D18F08]/20 transition-all">
        {division.icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-accent)' }}>
        {division.name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{division.desc}</p>
      <span className="text-[#D18F08] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
        Learn More <ArrowRight size={14} />
      </span>
    </>
  );
}
