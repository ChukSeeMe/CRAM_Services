"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <header className="relative pt-48 pb-20 px-6 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D18F08] opacity-[0.03] blur-[130px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block glass-panel px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-[#D18F08] mb-6 shadow-md border-[#D18F08]/20">
              Legal Center & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-accent)' }}>
              LEGAL STATUS & <span className="text-gold-gradient">POLICIES.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
              Last updated: May 2026. Review our Privacy Policy, Cookie Policy, and Terms of Service covering AI Solutions, Automotive Detailing, and Developer Incubation.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <section className="px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
              <Shield className="text-[#D18F08] w-8 h-8" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Enterprise Shield</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">Comprehensive disclaimers guarding CRAM algorithms, workflows, and third-party software integrations.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
              <Lock className="text-[#D18F08] w-8 h-8" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Data Sovereignty</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">Full GDPR and local data protection act alignment to secure lead captures, emails, and phone logs.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-4">
              <Eye className="text-[#D18F08] w-8 h-8" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Cookie Transparency</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">Clear details on essential, functional, and analytics tracking utilized across our service network.</p>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/15 pb-6">
              <FileText className="text-[#D18F08] w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wide">1. Privacy Policy</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Data protection & GDPR compliance</p>
              </div>
            </div>
            
            <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-light">
              <p>
                At <strong>CRAM Services Network</strong>, we take the privacy of our clients, prospects, and developers seriously. This policy describes how we collect, store, utilize, and protect your information when you request AI consultation, book auto detailing, or register for incubation.
              </p>
              
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">A. Data We Collect</h4>
              <p>
                We only collect information directly provided by you through our consultation and booking forms, including full name, business identity, contact protocols (email: <em>cramserviceshub@gmail.com</em>, phone: <em>+44 7448 167943</em>), and specific vehicle details or operational bottlenecks.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">B. Storage & Security</h4>
              <p>
                All data is captured securely. We implement standard access controls, secure encryption standards (SSL/TLS), and restricted administrative privileges (managed via our Command Center) to protect records from unauthorized access.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">C. Your Rights</h4>
              <p>
                Under the General Data Protection Regulation (GDPR) and regional legislation, you retain the absolute right to access your stored data, request deletions, restrict processing, or obtain portable copies of your records. Reach out to <em>cramserviceshub@gmail.com</em> to exercise these rights.
              </p>
            </div>
          </div>

          {/* Cookie Policy */}
          <div id="cookies" className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/15 pb-6">
              <Eye className="text-[#D18F08] w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wide">2. Cookie Policy</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Smarter interactions, safer sessions</p>
              </div>
            </div>
            
            <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-light">
              <p>
                Our platform uses cookies and similar technologies to remember your preferences, secure forms against automated spam attacks (such as our honeypot system), and gather performance analytics to optimize load speeds.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">A. Essential Cookies</h4>
              <p>
                These cookies are critical to navigating the site and utilizing basic interactive features (e.g. submitting contact portals or accessing the secure Command Center).
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">B. Analytical & Customization Cookies</h4>
              <p>
                We track visitor routes and session statistics to understand page engagement, helping us refine our animations, components, and responsive grid layouts.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">C. Control Options</h4>
              <p>
                You can block or disable cookies through your browser settings, though doing so may prevent certain interactive forms or consultation booking systems from functioning correctly.
              </p>
            </div>
          </div>

          {/* Terms & Service Disclaimers */}
          <div id="terms" className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/15 pb-6">
              <Shield className="text-[#D18F08] w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wide">3. Terms & Service Disclaimers</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Limitation of liability & commercial protections</p>
              </div>
            </div>
            
            <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-light">
              <p>
                By using CRAM Services, you agree to comply with our Terms of Service. These terms include critical commercial protections for our business activities:
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">A. AI & Automation Systems Disclaimer</h4>
              <p>
                AI integrations, lead captures, voice receptionists, and dashboards are advisory frameworks. Clients must verify code logic, check third-party API rates, and monitor customer-facing outputs. CRAM is not liable for data lapses, missed leads, or third-party software rate changes.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">B. Luxury Detailing & Ceramic Coatings Waivers</h4>
              <p>
                Paint correction and film applications require a pre-service inspection. Final results depend on pre-existing paint thickness, oxidation levels, and surface wear. All prices provided are guide ranges only; final quotes must be confirmed after physical inspection and before service commences.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">C. AFRO Connect Technology Developer & Incubation Terms</h4>
              <p>
                Participants of AFRO Connect Technology incubation programs, developer training hubs, and scorecard assessment systems agree that CRAM retains intellectual property rights on incubation software unless explicitly agreed otherwise. AfroConnect.tech link routing is provided as-is without warranty for third-party websites.
              </p>

              <h4 className="text-white font-bold uppercase tracking-wider text-xs mt-6">D. Governing Law</h4>
              <p>
                These terms, policies, and disclaimers are governed and interpreted under the laws of the United Kingdom. Any disputes arising from these services shall fall under the exclusive jurisdiction of the competent courts of the United Kingdom.
              </p>
            </div>
          </div>

          {/* Contact Widget */}
          <div className="glass-panel p-8 rounded-3xl border-transparent hover:border-[#D18F08]/20 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Have questions about our legal policies?</h3>
              <p className="text-xs text-gray-400 font-light">Reach out directly to our compliance officer for clarifications.</p>
            </div>
            <a 
              href="mailto:cramserviceshub@gmail.com"
              className="btn-premium bg-[#D18F08] text-black px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(209,143,8,0.3)] transition-all"
            >
              Email Compliance
            </a>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
