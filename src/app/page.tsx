"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Car, Plane } from 'lucide-react';

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
      image: '/ai_provided_image.jpg',
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

  return (
    <div className="min-h-screen flex flex-col pt-10">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden flex-grow flex flex-col items-center justify-center min-h-screen">
        {/* Background Decorative Blobs */}
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
                className="group relative min-h-[500px] flex flex-col justify-end rounded-[2.5rem] overflow-hidden glass-panel glass-panel-hover"
              >
                {service.href !== '#' ? (
                  <Link href={service.href} className="absolute inset-0 z-20"></Link>
                ) : null}
                
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 p-10 flex flex-col justify-end h-full mt-auto pointer-events-none">
                  <div className="mb-6 p-4 bg-[#0a0a0a]/60 backdrop-blur-md rounded-2xl w-fit border border-white/10 shadow-[0_0_15px_rgba(209,143,8,0.2)]">
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

      {/* Footer */}
      <footer className="w-full bg-[#030303] border-t border-white/5 py-24 px-6 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <img src="/cram_logo_cs.png" alt="CRAM" className="h-10 w-auto mb-8" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              The premium service hub for high-growth enterprises and discerning luxury clientele. Connecting advanced AI intelligence with meticulous physical execution.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#D18F08] font-bold mb-6 uppercase tracking-widest text-xs">Menu</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/ai-revenue" className="hover:text-white transition pointer-events-auto z-20">AI Revenue Platform</Link></li>
              <li><Link href="/car-detailing" className="hover:text-white transition pointer-events-auto z-20">Automotive Detailing</Link></li>
              <li><button onClick={() => window.dispatchEvent(new Event('open-demo-modal'))} className="hover:text-white transition pointer-events-auto z-20">Aviation Services</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D18F08] font-bold mb-6 uppercase tracking-widest text-xs">Connectivity</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="mailto:contact@cramservices.com" className="hover:text-white transition z-20 relative pointer-events-auto">contact@cramservices.com</a></li>
              <li><a href="tel:+1800555CRAM" className="hover:text-white transition font-bold z-20 relative pointer-events-auto">+1 (800) 555-CRAM</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            &copy; 2026 CRAM Services Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
