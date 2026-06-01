"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 py-24 px-6 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <img src="/cram_logo_cs.png" alt="CRAM" className="h-10 w-auto mb-8" />
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
            The premium service hub for high-growth enterprises and discerning luxury clientele. Connecting advanced AI intelligence with meticulous physical execution.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/120093905/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590148637267" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.1 1-1.1h3V1h-4.3C10.5 1 9 2.5 9 5.8V8z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/cram.serviceshub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://x.com/cram_services" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@cram.services" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.43-.43-.63-.67-.07 2.62-.03 5.24-.04 7.86-.03 2.05-.62 4.14-1.93 5.71-1.4 1.73-3.66 2.76-5.88 2.83-2.6.1-5.22-1.04-6.73-3.15-1.6-2.18-1.92-5.18-1.01-7.75.92-2.67 3.27-4.75 6.09-5.17.65-.1 1.37-.1 2.03-.01v4.11c-.55-.12-1.15-.15-1.7-.05-1.52.23-2.91 1.34-3.4 2.81-.54 1.54-.15 3.39.99 4.54 1.05 1.09 2.75 1.48 4.18.99 1.15-.4 1.95-1.47 2.16-2.67.12-.66.08-1.35.09-2.03C12.54 6.89 12.53 3.45 12.525.02z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-[#D18F08] font-bold mb-6 uppercase tracking-widest text-xs">Menu</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/ai-revenue" className="hover:text-white transition pointer-events-auto z-20">AI Revenue Platform</Link></li>
            <li><Link href="/car-detailing" className="hover:text-white transition pointer-events-auto z-20">Automotive Detailing</Link></li>
            <li><Link href="/products" className="hover:text-white transition pointer-events-auto z-20">Proprietary Products</Link></li>
            <li><button onClick={() => window.dispatchEvent(new Event('open-demo-modal'))} className="hover:text-white transition pointer-events-auto z-20 text-left">Aviation Services</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#D18F08] font-bold mb-6 uppercase tracking-widest text-xs">Connectivity</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="mailto:cramserviceshub@gmail.com" className="hover:text-white transition z-20 relative pointer-events-auto">cramserviceshub@gmail.com</a></li>
            <li><a href="tel:+447448167943" className="hover:text-white transition font-bold z-20 relative pointer-events-auto">+44 7448 167943</a></li>
            <li><a href="https://wa.me/447448167943" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition font-bold z-20 relative pointer-events-auto">WhatsApp Chat</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
          &copy; 2026 CRAM Services Network. All rights reserved.
        </p>
        <div className="flex gap-6 text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/privacy#cookies" className="hover:text-white transition">Cookie Policy</Link>
          <Link href="/privacy#terms" className="hover:text-white transition">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
