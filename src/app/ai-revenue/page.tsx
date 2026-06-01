"use client";

import { FormEvent, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Briefcase,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Headphones,
  LineChart,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Users,
  Workflow,
  Zap
} from 'lucide-react';
import Footer from '@/components/Footer';

const serviceCards = [
  {
    title: 'AI Lead Capture System',
    description: 'Capture enquiries from your website, WhatsApp, social media, and forms. Qualify leads automatically, collect customer details, and route serious enquiries to your team.',
    value: 'Reduces missed opportunities and speeds up follow-up.',
    bestFor: 'Service businesses, agencies, schools, clinics, real estate, car services, consultants.',
    price: 'From £499 setup + £99/month support',
    cta: 'Request Lead System',
    icon: <MessageSquare size={24} />
  },
  {
    title: 'AI Customer Service Chatbot',
    description: 'A trained chatbot that answers FAQs, explains services, collects booking details, handles after-hours enquiries, and supports customers before your team steps in.',
    value: 'Improves response time and reduces repetitive customer questions.',
    bestFor: 'E-commerce, service businesses, education, hospitality, logistics, healthcare support.',
    price: 'From £750 setup + £149/month',
    cta: 'Build My Chatbot',
    icon: <Bot size={24} />
  },
  {
    title: 'AI Voice Receptionist',
    description: 'An AI-powered phone assistant that can answer calls, capture details, book appointments, qualify enquiries, and send summaries to your team.',
    value: 'Helps reduce missed calls and improves customer availability.',
    bestFor: 'Clinics, salons, car services, property firms, local businesses, professional services.',
    price: 'From £1,200 setup + usage costs',
    cta: 'Explore Voice AI',
    icon: <PhoneCall size={24} />
  },
  {
    title: 'Business Analytics Dashboard',
    description: 'Custom dashboards that bring leads, sales, bookings, campaigns, customer activity, and operational KPIs into one clear view.',
    value: 'Gives owners and managers better visibility over performance.',
    bestFor: 'Marketing teams, fleet companies, schools, finance teams, retail, service businesses.',
    price: 'From £1,500 setup',
    cta: 'Request Dashboard',
    icon: <BarChart3 size={24} />
  },
  {
    title: 'Workflow Automation System',
    description: 'Automate repeated tasks such as customer onboarding, booking confirmations, invoice triggers, staff alerts, CRM updates, email follow-ups, and reporting.',
    value: 'Reduces manual admin and helps teams operate consistently.',
    bestFor: 'SMBs, agencies, training providers, consultants, operations-heavy businesses.',
    price: 'From £900 setup',
    cta: 'Automate My Workflow',
    icon: <Workflow size={24} />
  },
  {
    title: 'AI Social Media & Content Engine',
    description: 'Plan content, generate captions, score content ideas, schedule posts, track engagement, and produce performance reports using AI-assisted workflows.',
    value: 'Helps brands post more consistently and understand what content works.',
    bestFor: 'Media brands, influencers, small businesses, agencies, community pages, creators.',
    price: 'From £699 setup + £150/month',
    cta: 'Build Content Engine',
    icon: <LineChart size={24} />
  },
  {
    title: 'AI Sales Follow-Up System',
    description: 'Automatically follow up with leads, send reminders, segment prospects, and help sales teams prioritise warm opportunities.',
    value: 'Improves lead nurturing and reduces lost sales from poor follow-up.',
    bestFor: 'Dealerships, property, consultants, training firms, B2B services.',
    price: 'From £850 setup',
    cta: 'Improve Sales Follow-Up',
    icon: <Headphones size={24} />
  },
  {
    title: 'Custom AI Business Agent',
    description: 'A tailored AI agent trained around your business documents, services, workflows, FAQs, and internal processes.',
    value: 'Helps staff find answers faster and supports consistent internal operations.',
    bestFor: 'Growing teams, education providers, customer support teams, operations teams.',
    price: 'From £1,500 setup',
    cta: 'Plan Custom AI Agent',
    icon: <Users size={24} />
  }
];

const comparisons = [
  { from: 'Missed enquiries', to: 'AI lead capture and instant response workflows' },
  { from: 'Manual admin', to: 'Automated forms, CRM updates, reminders, and reporting' },
  { from: 'Scattered customer conversations', to: 'Connected WhatsApp, website, email, and CRM workflows' },
  { from: 'Guesswork decisions', to: 'Real-time dashboards and performance tracking' },
  { from: 'Slow customer support', to: 'AI chatbot and voice support assistants' }
];

const industries = [
  { icon: <LineChart className="text-[#D18F08] w-8 h-8" />, title: 'Digital Marketing Agencies', text: 'Automate content planning, client reporting, campaign summaries, lead tracking, and social media performance analysis.' },
  { icon: <Car className="text-[#D18F08] w-8 h-8" />, title: 'Car Detailing & Automotive Businesses', text: 'Automate bookings, customer reminders, quote requests, service recommendations, fleet enquiries, and aftercare follow-ups.' },
  { icon: <GraduationCap className="text-[#D18F08] w-8 h-8" />, title: 'Education & Tutoring Businesses', text: 'Create lesson plans, track student progress, generate parent feedback, analyse behaviour notes, and support SEN teaching workflows.' },
  { icon: <Briefcase className="text-[#D18F08] w-8 h-8" />, title: 'Real Estate & Property', text: 'Capture property enquiries, qualify buyers or tenants, schedule viewings, send follow-ups, and track pipeline performance.' },
  { icon: <ShieldCheck className="text-[#D18F08] w-8 h-8" />, title: 'Healthcare & Wellness', text: 'Handle FAQs, appointment enquiries, intake forms, reminders, and non-clinical support workflows with clear escalation rules.' },
  { icon: <Workflow className="text-[#D18F08] w-8 h-8" />, title: 'Logistics & Fleet Businesses', text: 'Track service requests, automate customer updates, monitor operations, schedule maintenance reminders, and report performance.' },
  { icon: <ClipboardList className="text-[#D18F08] w-8 h-8" />, title: 'Finance & Professional Services', text: 'Automate client intake, document checklists, reminders, reporting dashboards, and workflow status tracking.' },
  { icon: <PhoneCall className="text-[#D18F08] w-8 h-8" />, title: 'Local Service Businesses', text: 'Turn calls, WhatsApp messages, website forms, and social enquiries into structured leads and confirmed bookings.' }
];

const buildSteps = [
  ['Business Audit', 'We review your current workflow, lead sources, tools, customer journey, and operational bottlenecks.'],
  ['Automation Blueprint', 'We map the exact AI workflows, integrations, data points, and handover rules your business needs.'],
  ['Build & Integrate', 'We connect the system to your website, WhatsApp, CRM, email, forms, or dashboards where possible.'],
  ['Test & Train', 'We test responses, booking flows, staff handovers, and data capture before launch.'],
  ['Launch & Improve', 'We monitor performance, collect feedback, and refine the system over time.']
];

const trustCards = [
  'Practical business-first AI, not random tools',
  'Built around your workflow',
  'Clear setup pricing',
  'Human handover where needed',
  'Secure enquiry handling',
  'Dashboard and reporting options',
  'UK/Nigeria business understanding',
  'Experience across AI, data, automation, content, and service businesses'
];

function OriginalAIImage({ className = '' }: { className?: string }) {
  return (
    <img
      src="/dashboard.png"
      alt="Revenue Analytics Dashboard"
      className={className || 'relative z-10 w-full rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(209,143,8,0.15)] transform rotate-1 hover:rotate-0 transition-transform duration-700'}
      loading="lazy"
    />
  );
}

function SupportingAIImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_45px_rgba(209,143,8,0.12)] bg-black">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full min-h-[280px] w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent"></div>
      <div className="absolute inset-0 ring-1 ring-inset ring-[#D18F08]/10"></div>
    </div>
  );
}

interface DemoState {
  loading: boolean;
  result: string | null;
  error: string | null;
}

async function runAgent(slug: string, payload: object): Promise<string> {
  const res = await fetch(`/api/agents/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Agent request failed');
  return data.output || data.result || data.message || JSON.stringify(data, null, 2);
}

export default function AIRevenue() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Agent demo states
  const [nicheDemo, setNicheDemo] = useState<DemoState>({ loading: false, result: null, error: null });
  const [contentDemo, setContentDemo] = useState<DemoState>({ loading: false, result: null, error: null });
  const [seoDemo, setSeoDemo] = useState<DemoState>({ loading: false, result: null, error: null });

  const nicheBusiness = useRef<HTMLInputElement>(null);
  const nicheLocation = useRef<HTMLInputElement>(null);
  const contentBusiness = useRef<HTMLInputElement>(null);
  const contentAudience = useRef<HTMLInputElement>(null);
  const seoUrl = useRef<HTMLInputElement>(null);

  const runNicheAnalyst = async () => {
    const business = nicheBusiness.current?.value.trim();
    const location = nicheLocation.current?.value.trim();
    if (!business || !location) return;
    setNicheDemo({ loading: true, result: null, error: null });
    try {
      const result = await runAgent('niche-analyst', { input: `business_type: ${business}, location: ${location}` });
      setNicheDemo({ loading: false, result, error: null });
    } catch (e: any) {
      setNicheDemo({ loading: false, result: null, error: e.message });
    }
  };

  const runContentStudio = async () => {
    const business = contentBusiness.current?.value.trim();
    const audience = contentAudience.current?.value.trim();
    if (!business || !audience) return;
    setContentDemo({ loading: true, result: null, error: null });
    try {
      const result = await runAgent('content-studio', { input: `business_name: ${business}, target_audience: ${audience}` });
      setContentDemo({ loading: false, result, error: null });
    } catch (e: any) {
      setContentDemo({ loading: false, result: null, error: e.message });
    }
  };

  const runSeoMonitor = async () => {
    const url = seoUrl.current?.value.trim();
    if (!url) return;
    setSeoDemo({ loading: true, result: null, error: null });
    try {
      const result = await runAgent('seo-monitor', { input: url });
      setSeoDemo({ loading: false, result, error: null });
    } catch (e: any) {
      setSeoDemo({ loading: false, result: null, error: e.message });
    }
  };

  const handleConsultationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    const form = event.currentTarget;
    const formData = new FormData(form);

    const message = [
      `Industry: ${formData.get('industry')}`,
      `Automation goal: ${formData.get('automation')}`,
      `Current tools: ${formData.get('tools')}`,
      `Budget range: ${formData.get('budget')}`,
      `Preferred consultation date: ${formData.get('date')}`,
      `Message: ${formData.get('message')}`
    ].join(' | ');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('business'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message,
          type: 'AI Consultation Request',
          _honey: formData.get('_honey')
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <header className="relative pt-40 pb-28 px-6 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <OriginalAIImage className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#0A0A0A]/60"></div>
          <div className="absolute inset-0 bg-[#050505]/55 backdrop-blur-sm"></div>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D18F08] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 relative z-10 text-center mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-6xl">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 flex items-center justify-center gap-4">
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D18F08]"></span>
              AI Automation for Businesses
              <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D18F08]"></span>
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-8" style={{ fontFamily: 'var(--font-accent)' }}>
              AI AUTOMATION SYSTEMS BUILT TO HELP BUSINESSES <span className="text-gold-gradient">WORK FASTER, SELL SMARTER, AND SCALE BETTER</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
              CRAM Services designs practical AI-powered workflows for businesses that want to capture leads, automate admin, improve customer response, monitor performance, and turn scattered operations into connected systems.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
              <a href="#ai-consultation" className="btn-premium bg-[#D18F08] text-black px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(209,143,8,0.3)]">
                Book AI Consultation
              </a>
              <a href="#ai-services" className="glass-panel px-10 py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] transition-all">
                View AI Services
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
              {['Business workflow automation', 'AI chatbots & voice assistants', 'Dashboards and reporting', 'CRM and WhatsApp integrations', 'Built around your business process'].map((item) => (
                <div key={item} className="glass-panel rounded-2xl px-4 py-3 flex items-start gap-3 border-[#D18F08]/10">
                  <CheckCircle2 size={16} className="text-[#D18F08] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>NOT JUST AI TOOLS — BUSINESS SYSTEMS THAT <span className="text-[#D18F08]">REMOVE BOTTLENECKS.</span></h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Most businesses do not fail because they lack software. They lose money through slow response times, manual admin, missed follow-ups, poor visibility, inconsistent customer service, and weak reporting. CRAM Services builds AI systems around these real operational problems.
            </p>
            <div className="space-y-6">
              {comparisons.map((prop, i) => (
                <motion.div key={prop.from} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between text-sm font-bold tracking-wide border-b border-white/5 pb-4">
                  <span className="text-gray-500 line-through">{prop.from}</span>
                  <ChevronRight size={16} className="text-[#D18F08] mx-4 shrink-0" />
                  <span className="text-white text-right">{prop.to}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative pt-10 lg:pt-0">
            <div className="absolute inset-0 bg-[#D18F08] opacity-10 blur-3xl rounded-full"></div>
            <OriginalAIImage />
          </div>
        </div>
      </section>

      <section id="ai-services" className="py-32 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Buildable Systems</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>AI AUTOMATION SERVICES WE CAN BUILD FOR <span className="text-[#D18F08]">YOUR BUSINESS.</span></h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">Every system is scoped around your workflow, handover rules, data access, team capacity, and commercial priorities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            {serviceCards.map((service, i) => (
              <motion.article key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-panel p-7 rounded-[2rem] group border-transparent hover:border-[#D18F08]/25 transition-all flex flex-col">
                <div className="text-[#D18F08] bg-[#D18F08]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">{service.description}</p>
                <div className="space-y-3 text-sm mb-6">
                  <p><span className="text-white font-bold">Business value:</span> <span className="text-gray-300">{service.value}</span></p>
                  <p><span className="text-white font-bold">Best for:</span> <span className="text-gray-300">{service.bestFor}</span></p>
                </div>
                <div className="mt-auto">
                  <a href="#ai-consultation" className="btn-premium bg-[#D18F08] text-black w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center block">
                    {service.cta}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Commercial Use Cases</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>INDUSTRY <span className="text-[#D18F08]">USE CASES.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {industries.map((industry, i) => (
              <motion.article key={industry.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-panel p-8 rounded-[2rem] group border-transparent hover:border-[#D18F08]/20 transition-colors">
                <div className="bg-[#D18F08]/10 p-4 w-fit rounded-2xl mb-6 shadow-[0_0_15px_rgba(209,143,8,0.1)]">{industry.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{industry.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{industry.text}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
            <SupportingAIImage
              src="/images/ai/ai-operations.png"
              alt="Logistics business operator showing real-world service operations that can be supported by AI automation."
            />
            <div className="glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col justify-center border-[#D18F08]/10">
              <span className="text-[#D18F08] uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Real Operations</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-accent)' }}>AI should support the people already doing the work.</h3>
              <p className="text-gray-300 leading-relaxed">
                CRAM automation systems are designed around real service environments: enquiries, bookings, handovers, reporting, customer updates, and operational visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative pt-10 lg:pt-0">
            <div className="absolute inset-0 bg-[#D18F08] opacity-10 blur-3xl rounded-full"></div>
            <OriginalAIImage />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-10" style={{ fontFamily: 'var(--font-accent)' }}>HOW WE BUILD YOUR <span className="text-[#D18F08]">AI SYSTEM.</span></h2>
            <div className="space-y-5">
              {buildSteps.map(([title, text], index) => (
                <div key={title} className="glass-panel rounded-2xl p-6 flex gap-5">
                  <span className="text-[#D18F08] font-bold text-xl">{index + 1}</span>
                  <div>
                    <h3 className="text-white font-bold mb-2">{title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <ShieldCheck size={42} className="text-[#D18F08] mx-auto mb-5" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-accent)' }}>WHY BUSINESSES SHOULD TRUST <span className="text-[#D18F08]">CRAM SERVICES.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCards.map((card) => (
              <div key={card} className="glass-panel rounded-2xl p-6 flex items-start gap-4">
                <CheckCircle2 size={18} className="text-[#D18F08] shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm font-medium leading-relaxed">{card}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-consultation" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Start Quickly</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-accent)' }}>AI CONSULTATION <span className="text-[#D18F08]">FORM.</span></h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Tell us what you want to automate. The form is designed to be completed in under 60 seconds.
            </p>
            <SupportingAIImage
              src="/images/ai/ai-handshake.png"
              alt="Business consultation handshake showing trust and professional AI automation partnership."
            />
          </div>

          <form onSubmit={handleConsultationSubmit} className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-[3rem] space-y-6">
            {status === 'success' ? (
              <div className="text-center py-14">
                <div className="bg-[#D18F08]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} className="text-[#D18F08]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Thank you.</h3>
                <p className="text-gray-300">Your AI consultation request has been received. We will review your business needs and contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="name" required placeholder="Name" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <input name="business" required placeholder="Business name" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <input name="email" required type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <input name="phone" required type="tel" placeholder="Phone" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <input name="industry" required placeholder="Industry" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <select name="budget" required defaultValue="" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]">
                    <option value="" disabled className="text-black">Budget range</option>
                    <option className="text-black">Under £500</option>
                    <option className="text-black">£500-£1,500</option>
                    <option className="text-black">£1,500-£5,000</option>
                    <option className="text-black">£5,000+</option>
                  </select>
                  <input name="tools" placeholder="Current tools used" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                  <input name="date" type="date" aria-label="Preferred consultation date" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08]" />
                </div>
                <textarea name="automation" required rows={3} placeholder="What do you want to automate?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08] resize-none"></textarea>
                <textarea name="message" rows={3} placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#D18F08] resize-none"></textarea>
                <label className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed">
                  <input required type="checkbox" className="mt-1 accent-[#D18F08]" />
                  <span>I agree for CRAM Services to contact me about this enquiry.</span>
                </label>
                <div className="hidden" aria-hidden="true"><input name="_honey" tabIndex={-1} autoComplete="off" /></div>
                {status === 'error' && <p className="text-red-400 text-sm font-semibold">Something went wrong. Please try again or contact us directly.</p>}
                <button type="submit" disabled={status === 'submitting'} className="btn-premium bg-[#D18F08] text-black w-full py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.25em]">
                  {status === 'submitting' ? 'Sending...' : 'Book AI Consultation'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#080808] border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-[2rem] p-8">
            <Zap className="text-[#D18F08] mb-5" />
            <h2 className="text-xl font-bold text-white mb-4">Custom Pricing Note</h2>
            <p className="text-gray-300 text-sm leading-relaxed">Every AI automation system is custom-built. Final pricing depends on workflow complexity, integrations, data requirements, number of users, support level, and third-party software costs. Request a consultation for a custom quote.</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <ShieldCheck className="text-[#D18F08] mb-5" />
            <h2 className="text-xl font-bold text-white mb-4">Compliance & Security Note</h2>
            <p className="text-gray-300 text-sm leading-relaxed">AI systems may involve customer data. CRAM Services will only collect data required for the service and recommends GDPR-compliant handling, secure storage, access control, and clear privacy notices.</p>
          </div>
        </div>
      </section>
      {/* Live AI Agent Demos */}
      <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Try it free</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>
              LIVE AI AGENT <span className="text-[#D18F08]">DEMOS.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience our AI agents in action — no sign-up required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Demo 1 — Niche Analyst */}
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col gap-5">
              <div>
                <span className="text-[10px] text-[#D18F08] uppercase font-bold tracking-widest">Demo 1</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2" style={{ fontFamily: 'var(--font-accent)' }}>Niche Analyst</h3>
                <p className="text-gray-400 text-sm">Enter your business type and location to get a market opportunity report.</p>
              </div>
              <input ref={nicheBusiness} type="text" placeholder="Business type (e.g. Car detailing)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D18F08] placeholder-gray-600" />
              <input ref={nicheLocation} type="text" placeholder="Location (e.g. Coventry, UK)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D18F08] placeholder-gray-600" />
              <button
                onClick={runNicheAnalyst}
                disabled={nicheDemo.loading}
                className="bg-[#D18F08] text-black font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition disabled:opacity-50"
              >
                {nicheDemo.loading ? 'Analysing...' : 'Analyse Market'}
              </button>
              {nicheDemo.error && <p className="text-red-400 text-xs">{nicheDemo.error}</p>}
              {nicheDemo.result && (
                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {nicheDemo.result}
                </div>
              )}
            </div>

            {/* Demo 2 — Content Studio */}
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col gap-5">
              <div>
                <span className="text-[10px] text-[#D18F08] uppercase font-bold tracking-widest">Demo 2</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2" style={{ fontFamily: 'var(--font-accent)' }}>Content Studio</h3>
                <p className="text-gray-400 text-sm">Enter your business name and target audience to receive sample marketing copy.</p>
              </div>
              <input ref={contentBusiness} type="text" placeholder="Business name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D18F08] placeholder-gray-600" />
              <input ref={contentAudience} type="text" placeholder="Target audience (e.g. SMB owners UK)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D18F08] placeholder-gray-600" />
              <button
                onClick={runContentStudio}
                disabled={contentDemo.loading}
                className="bg-[#D18F08] text-black font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition disabled:opacity-50"
              >
                {contentDemo.loading ? 'Generating...' : 'Generate Copy'}
              </button>
              {contentDemo.error && <p className="text-red-400 text-xs">{contentDemo.error}</p>}
              {contentDemo.result && (
                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {contentDemo.result}
                </div>
              )}
            </div>

            {/* Demo 3 — SEO Monitor */}
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col gap-5">
              <div>
                <span className="text-[10px] text-[#D18F08] uppercase font-bold tracking-widest">Demo 3</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2" style={{ fontFamily: 'var(--font-accent)' }}>SEO Monitor</h3>
                <p className="text-gray-400 text-sm">Enter your website URL to get an SEO score and top 3 quick-win fixes.</p>
              </div>
              <input ref={seoUrl} type="url" placeholder="https://yourwebsite.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D18F08] placeholder-gray-600" />
              <button
                onClick={runSeoMonitor}
                disabled={seoDemo.loading}
                className="bg-[#D18F08] text-black font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition disabled:opacity-50"
              >
                {seoDemo.loading ? 'Scanning...' : 'Analyse SEO'}
              </button>
              {seoDemo.error && <p className="text-red-400 text-xs">{seoDemo.error}</p>}
              {seoDemo.result && (
                <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {seoDemo.result}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
