"use client";

import { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';

export default function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    type: 'General Demo Request',
    _honey: '',
  });

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener('open-demo-modal', openModal);
    return () => window.removeEventListener('open-demo-modal', openModal);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Submission Failed');

      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', company: '', message: '', type: 'General Demo Request', _honey: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="bg-[#0A0A0A] border border-[#D18F08]/30 rounded-3xl overflow-hidden max-w-lg w-full mx-4 shadow-[0_0_50px_rgba(209,143,8,0.2)] flex flex-col relative animate-in zoom-in-95 duration-300">
        <div className="p-8 pb-4 border-b border-[#D18F08]/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Book a Demo</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-white transition bg-black/50 border border-white/10 rounded-full p-2"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle className="text-[#D18F08] w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Request Securely Received</h3>
              <p className="text-gray-400">Our Executive Team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#D18F08] focus:ring-1 focus:ring-[#D18F08] outline-none transition" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Company</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#D18F08] focus:ring-1 focus:ring-[#D18F08] outline-none transition" 
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email *</label>
                  <input required type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#D18F08] focus:ring-1 focus:ring-[#D18F08] outline-none transition" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number *</label>
                  <input required type="tel" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#D18F08] focus:ring-1 focus:ring-[#D18F08] outline-none transition" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</label>
                <textarea rows={3} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-[#D18F08] focus:ring-1 focus:ring-[#D18F08] outline-none transition" 
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              {/* Honeypot field - hidden from users */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="_honey" value={formData._honey} onChange={e => setFormData({...formData, _honey: e.target.value})} tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <div className="text-red-500 text-sm mt-2 font-semibold">An error occurred while submitting your request.</div>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-[#D18F08] hover:bg-[#b07806] text-black font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(209,143,8,0.3)] mt-6 flex justify-center items-center gap-2"
              >
                {status === 'submitting' ? <><Loader2 className="animate-spin" size={20} /> Securing Request...</> : 'Send Request Execution'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
