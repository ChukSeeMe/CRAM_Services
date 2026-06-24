"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Car, Plane, CheckCircle2, Zap, Users } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  const services = [
    {
      id: 'ai',
      title: 'AI Solutions',
      href: '/ai-revenue',
      icon: <Bot className="w-8 h-8 text-[#D18F08]" />,
      image: '/ai_platform_bg.jpg',
      desc: 'Deploy advanced AI architectures to automate growth and scale revenue engines.',
      cta: 'Enter Platform'
    },
    {
      id: 'automotive',
      title: 'Car Detail & Sales',
      href: '/car-detailing',
      icon: <Car className="w-8 h-8 text-[#D18F08]" />,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800',
      desc: 'Luxury automotive care and a curated inventory of perfected exotic vehicles.',
      cta: 'Explore Inventory'
    },
    {
      id: 'aviation',
      title: 'Jet Detailing',
      href: '#',
      onClick: () => window.dispatchEvent(new Event('open-demo-modal')),
      icon: <Plane className="w-8 h-8 text-[#D18F08]" />,
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
      desc: 'Aviation-grade detailing services delivered with obsessive attention to detail.',
      cta: 'Book Service'
    }
  ];

  const stats = [
    { value: '12+', label: 'AI Agents Deployed' },
    { value: '3', label: 'Service Divisions' },
    { value: 'UK', label: 'Nationwide Coverage' },
    { value: '24/7', label: 'AI Support' },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-10">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden flex-grow flex flex-col items-center justify-center min-h-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D18F08] opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D18F08] opacity-[0.03] blur-[100px] rounded-full pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl"
        >
          <span className="inline-block glass-panel px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-[#D18F08] mb-8 shadow-md">
            The Standard of Engineering Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-accent)' }}>
            ELEVATING THE <br />
            <span className="text-gold-gradient text-shadow-glow">SERVICE FRONTIER</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Delivering unparalleled premium execution across enterprise AI architecture, custom software development, and luxury detailing services.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <div
                onClick={() => service.onClick ? service.onClick() : null}
                className="group relative min-h-[460px] flex flex-col justify-end rounded-[2.5rem] overflow-hidden glass-panel glass-panel-hover cursor-pointer"
              >
                {service.href !== '#' ? (
                  <Link href={service.href} className="absolute inset-0 z-20"></Link>
                ) : null}

                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-110"
                    loading={service.id === 'ai' ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full mt-auto pointer-events-none">
                  <div className="mb-5 p-4 bg-[#0a0a0a]/60 backdrop-blur-md rounded-2xl w-fit border border-white/10 shadow-[0_0_15px_rgba(209,143,8,0.2)]">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[#D18F08] font-bold text-xs uppercase tracking-[0.2em]">
                    {service.cta} <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 px-6 border-y border-white/5 bg-[#080808]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#D18F08] mb-1" style={{ fontFamily: 'var(--font-accent)' }}>{stat.value}</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us / CEO Section */}
      <section className="py-24 md:py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* CEO Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-2/5 flex-shrink-0"
            >
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute inset-0 bg-[#D18F08] opacity-15 blur-[60px] rounded-full"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]">
                  <img
                    src="/ai_provided_image.jpg"
                    alt="CRAM Services Founder & CEO"
                    className="w-full h-full object-cover object-center"
                    style={{ aspectRatio: '3/4', objectPosition: 'top' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>
                </div>
                {/* Name Card */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl px-5 py-4 border-white/15 backdrop-blur-xl">
                  <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'var(--font-accent)' }}>Founder & CEO</p>
                  <p className="text-[#D18F08] text-xs font-bold uppercase tracking-widest mt-0.5">CRAM Services Group</p>
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full lg:w-3/5"
            >
              <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">About Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-accent)' }}>
                BUILT ON <span className="text-gold-gradient">PRECISION</span> AND PURPOSE.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                CRAM Services was founded with a singular mission: to deliver elite-level AI systems, software products, and physical services that genuinely move businesses forward. Based in Coventry, UK, we operate across three divisions — AI Automation, Premium Automotive Detailing, and Aviation Services.
              </p>
              <p className="text-gray-400 leading-relaxed mb-10">
                Our approach is rooted in practicality. We do not sell hype — we design AI systems around your actual workflow, connect them to your real customer touchpoints, and measure success by tangible outcomes. Every service we deliver, whether an AI lead capture system or a concours-level ceramic coating, is executed to the same uncompromising standard.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                {[
                  { icon: <Zap size={18} />, title: 'AI-First', desc: 'Every business solution we build starts with intelligent automation.' },
                  { icon: <CheckCircle2 size={18} />, title: 'Results-Driven', desc: 'We measure success by outcomes, not deliverables.' },
                  { icon: <Users size={18} />, title: 'Community-Led', desc: 'As a CIC, we reinvest in skills development and local talent.' },
                ].map(item => (
                  <div key={item.title} className="glass-panel rounded-2xl p-5 border-[#D18F08]/10">
                    <div className="text-[#D18F08] mb-3">{item.icon}</div>
                    <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ai-revenue"
                  className="btn-premium bg-[#D18F08] text-black px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center"
                >
                  Explore Our AI Services
                </Link>
                <Link
                  href="/internship"
                  className="glass-panel px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] transition-all text-center"
                >
                  Community Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
