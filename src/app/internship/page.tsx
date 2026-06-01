"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Users, Cpu, Car, CheckCircle2, Building, Flag, Target, Award, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function InternshipPage() {
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

  const tracks = [
    {
       title: 'Technology & AI Skills Acquisition',
       icon: <Cpu size={24} />,
       img: '/cic_tech.png',
       desc: 'Participants receive comprehensive training in modern software development, data systems, and AI applications. This program equips individuals with highly sought-after technical skills for the modern digital economy.',
       metrics: ['Mentorship from Industry Professionals', 'Hands-on Software Development', 'Real-world Project Experience']
    },
    {
       title: 'Advanced Automotive Detailing',
       icon: <Car size={24} />,
       img: '/cic_auto.png',
       desc: 'Practical, hands-on training in high-end automotive restoration and detailing. Trainees learn the precise techniques required for paint correction, ceramic coatings, and luxury vehicle care.',
       metrics: ['Professional Equipment Training', 'Material Science & Application', 'Direct Career Pathways']
    },
    {
       title: 'Professional Development & Leadership',
       icon: <Users size={24} />,
       img: '/cic_hero.png',
       desc: 'Beyond technical skills, our CIC initiatives focus on building well-rounded professionals. We provide training in project management, business communication, and leadership to ensure long-term career success.',
       metrics: ['Communication Workshops', 'Team Leadership Exercises', 'Business Operations Exposure']
    }
  ];

  const impactMetrics = [
    { title: 'Community Investment', value: 'Dedicated', desc: 'Consistent reinvestment of our resources into local skills development.', icon: <HeartHandshake size={30} /> },
    { title: 'Skills Acquisition', value: 'Practical', desc: 'Focusing on actionable, high-value skills that translate directly to employment.', icon: <BookOpen size={30} /> },
    { title: 'Professional Growth', value: 'Supported', desc: 'Providing the mentorship and environment needed for talent to thrive.', icon: <Users size={30} /> },
    { title: 'Equal Opportunity', value: 'Inclusive', desc: 'Creating accessible pathways into elite technical and service industries.', icon: <Flag size={30} /> }
  ];

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden flex items-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <img src="/cic_hero.png" alt="Community Skills Training" className="w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-[#0A0A0A]/70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10 text-center lg:text-left mt-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 flex items-center justify-center lg:justify-start gap-4">
              <HeartHandshake size={14} /> Community Interest Company (CIC)
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.0] mb-8" style={{ fontFamily: 'var(--font-accent)' }}>
              CRAM COMMUNITY <br /> <span className="text-gold-gradient">PROJECTS.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-3xl">
              As a committed Community Interest Company, we believe in empowering individuals through direct skills acquisition programs. We bridge the gap between emerging talent and professional industries by providing high-quality training in technology, AI, and premium services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a href="#impact" className="btn-premium bg-[#111] border border-white/20 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] hover:text-[#D18F08] transition-all">
                Our Impact
              </a>
              <a href="#programs" className="glass-panel text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                Explore Programs
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Impact Metrics */}
      <section id="impact" className="py-24 px-6 border-y border-white/5 relative z-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>EMPOWERING <span className="text-[#D18F08]">POTENTIAL.</span></h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                 Our CIC projects are structured to deliver real, measurable value to the community. By combining our industry expertise with a passion for education, we create sustainable pathways for individuals to develop high-income skills and build rewarding careers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {impactMetrics.map((met, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D18F08]/30 transition-all">
                   <div className="text-[#D18F08] mb-6">{met.icon}</div>
                   <div className="text-2xl font-bold text-white mb-2">{met.value}</div>
                   <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">{met.title}</h4>
                   <p className="text-xs text-gray-400 leading-relaxed font-light">{met.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-32 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>SKILLS ACQUISITION <span className="text-[#D18F08]">PROGRAMS.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive training initiatives designed to equip participants with industry-ready expertise in our core service sectors.
            </p>
          </div>

          <div className="space-y-16">
            {tracks.map((track, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-[#D18F08]/20 transition-all`}
              >
                <div className="w-full lg:w-1/2 h-[400px] overflow-hidden relative">
                   <div className="absolute inset-0 bg-[#D18F08]/10 mix-blend-overlay z-10"></div>
                   <img src={track.img} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-full lg:w-1/2 p-10 lg:p-16">
                   <div className="bg-[#D18F08]/10 text-[#D18F08] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-[#D18F08]/20">
                      {track.icon}
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-accent)' }}>{track.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-8">{track.desc}</p>
                   
                   <div className="space-y-4">
                     <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-4">Program Focus Areas</h4>
                     {track.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs text-gray-300">
                           <CheckCircle2 size={14} className="text-[#D18F08]" /> {m}
                        </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#080808]">
         <div className="max-w-4xl mx-auto text-center glass-panel p-16 rounded-[4rem]">
            <HeartHandshake size={48} className="text-[#D18F08] mx-auto mb-8 opacity-70" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>JOIN OUR <span className="text-gray-500">MISSION.</span></h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-sm leading-relaxed">
               Whether you are looking to acquire new skills, partner with our CIC initiatives, or support our community programs, we welcome collaboration that drives positive impact.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new Event('open-demo-modal'))}
              className="btn-premium bg-white text-black px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#D18F08] transition-all"
            >
               Get Involved
            </button>
         </div>
      </section>
      <Footer />
    </div>
  );
}
