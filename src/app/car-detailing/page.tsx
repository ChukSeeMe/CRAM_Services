"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  MapPin, 
  Car, 
  CheckCircle2, 
  X,
  Phone,
  Droplets,
  ChevronRight,
  Zap,
  Gauge,
  Key,
  Clock,
  Tag
} from 'lucide-react';

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

const servicesData = [
  { 
    id: 'body-wash', 
    title: 'Body Wash', 
    caption: 'Premium Exterior Reset', 
    img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800', 
    desc: 'A careful exterior wash service designed to safely remove everyday road film, dust, bug residue, and light grime while protecting your vehicle finish.', 
    benefits: ['Pre-rinse and snow foam', 'Two-bucket contact wash', 'Wheel face clean', 'Towel dry and gloss finish'],
    bestFor: 'Regular maintenance, daily drivers, luxury vehicles, pre-event refreshes, and vehicles needing a safe exterior clean.',
    duration: '45 mins - 2 hours',
    price: 'From £35 - £120+',
    cta: 'Book Body Wash',
    trust: 'Final price depends on vehicle size, condition, access, and selected finish.'
  },
  { 
    id: 'ppf', 
    title: 'Paint Protection Film', 
    caption: 'Invisible body armor.', 
    img: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&q=80&w=800', 
    desc: 'The ultimate defense. We apply a self-healing, optically clear polyurethane film that absorbs rock chips, scratches, and road debris to keep your paint utterly flawless.', 
    benefits: ['Self-healing zero-latency top coat', '10-year durability warranty', 'Invisible edge lapping', 'Impact energy absorption'],
    bestFor: 'Exotic supercars, brand new vehicles, luxury cruisers, and track cars seeking maximum physical damage protection.',
    duration: '2 - 4 Days',
    price: 'From £1,200 - £3,500+',
    cta: 'Book PPF',
    trust: 'Pricing varies by full coverage vs. high-impact areas and vehicle complexity.'
  },
  { 
    id: 'ceramic', 
    title: 'Ceramic Coating', 
    caption: 'Aviation-grade protection.', 
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800', 
    desc: 'Lock in perfection. We apply high-solid nano-ceramic coatings that form a hardened, hydrophobic shield over your paint lasting for years.', 
    benefits: ['Years of durable protection', 'Extreme hydrophobic properties', 'Resists UV rays & etching', 'Deep, mirror-like gloss'],
    bestFor: 'Daily drivers, luxury vehicles, and newly corrected paint surfaces looking for hydrophobic, easy-to-clean brilliance.',
    duration: '1 - 2 Days',
    price: 'From £350 - £850+',
    cta: 'Book Ceramic Coating',
    trust: 'Includes chemical decontamination and single-stage gloss enhancement.'
  },
  { 
    id: 'correction', 
    title: 'Paint Correction', 
    caption: 'Restore depth and clarity.', 
    img: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800', 
    desc: 'Eradicate swirl marks, scratches, and oxidation. Our multi-stage machine polishing reveals perfect depth and clarity.', 
    benefits: ['Removes up to 95% of defects', 'Restores factory clear coat clarity', 'Enhances gloss dramatically', 'Ceramic coating preparation'],
    bestFor: 'Vehicles with swirl marks, surface scratches, buffer trails, and dull or oxidized paintwork.',
    duration: '1 - 3 Days',
    price: 'From £250 - £750+',
    cta: 'Book Paint Correction',
    trust: 'Multi-stage polishing required for deeper scratches. Exact quote provided post paint inspection.'
  },
  { 
    id: 'interior', 
    title: 'Interior Restoration', 
    caption: 'Bespoke cabin rejuvenation.', 
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800', 
    desc: "A comprehensive revitalization of your vehicle’s cabin. From steam cleaning carpets to treating fine leather surfaces, we restore the interior to factory-fresh perfection.", 
    benefits: ['Steam cleaning & sanitization', 'Leather conditioning & protection', 'Alcantara resetting', 'Crevice & vent clearing'],
    bestFor: 'Vehicles needing deep stain removal, leather conditioning, odor elimination, or general cabin rejuvenation.',
    duration: '4 - 8 Hours',
    price: 'From £150 - £450+',
    cta: 'Book Interior Restoration',
    trust: 'Final rate based on soil levels, pet hair presence, and vehicle cabin size.'
  },
  { 
    id: 'fleet', 
    title: 'Commercial Fleets', 
    caption: 'Enterprise scalability.', 
    img: '/fleet.png', 
    desc: 'Optimize your entire operational fleet with our specialized, high-volume detailing cycles designed specifically for enterprise vans, logistics, and company vehicles.', 
    benefits: ['Volume pricing structures', 'Automated maintenance cycles', 'Brand standard preservation', 'On-site mobile execution'],
    bestFor: 'Corporate transport, executive fleets, luxury rental vehicles, and utility fleets needing consistent branding.',
    duration: 'Custom schedules',
    price: 'From £80 - £250+ per vehicle',
    cta: 'Request Fleet Quote',
    trust: 'Volume discounts and recurring service agreement options are available.'
  },
  { 
    id: 'truck', 
    title: 'Heavy Duty Trucks', 
    caption: 'Industrial-grade restoration.', 
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800', 
    desc: 'A rigorous deep clean protocol engineered for semi-trucks, heavy haulers, and industrial equipment. We combat severe road grime and industrial fallout.', 
    benefits: ['Heavy industrial degreasing', 'Aluminum and chrome polishing', 'Cabin deep sanitation', 'Undercarriage extreme pressure wash'],
    bestFor: 'Semi-trucks, agricultural equipment, construction machinery, and heavy-duty utility trucks.',
    duration: '1 - 2 Days',
    price: 'From £150 - £500+',
    cta: 'Book Truck Detail',
    trust: 'Price determined by overall vehicle height, chrome detailing, and level of grease removal.'
  },
];

const inventoryData = [
  { 
    id: 'sf90', 
    title: 'Ferrari SF90 Stradale', 
    price: '$585,000', 
    img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200', 
    gallery: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=1200',
    ],
    desc: 'The absolute apex of Ferrari engineering. This plug-in hybrid hypercar seamlessly meshes a twin-turbo V8 with three electric motors to deliver earth-shattering acceleration and track-dominating handling.', 
    specs: ['986 Horsepower', '0-60 mph in 2.0s', 'Hybrid V8 Twin-Turbo', 'AWD Torque Vectoring System'] 
  },
  { 
    id: 'cullinan', 
    title: 'Rolls-Royce Cullinan', 
    price: '$415,000', 
    img: '/rr_front.png', 
    gallery: [
       '/rr_front.png',
       '/rr_interior.png',
       'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200'
    ],
    desc: 'The most capable and luxurious SUV on earth. The Cullinan offers the legendary "Magic Carpet Ride" across any terrain, surrounded by the finest handcrafted leathers and bespoke woods.', 
    specs: ['563 Horsepower', '6.75L Twin-Turbo V12', 'Shooting Star Headliner', 'Bespoke Studio Audio'] 
  },
  { 
    id: 'gclass', 
    title: 'Mercedes-Benz G63 AMG', 
    price: '$185,000', 
    img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200', 
    gallery: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1606788075765-a82f1f50a4bf?auto=format&fit=crop&w=1200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200'
    ],
    desc: 'An undisputed cultural icon. The G63 melds brute military-grade 4x4 capability with opulent luxury and a raucous handcrafted AMG V8 engine that commands absolute authority.', 
    specs: ['577 Horsepower', '4.0L V8 Biturbo', '3 Locking Differentials', 'AMG Performance Exhaust'] 
  },
  { 
    id: 'gt3', 
    title: 'Porsche 911 GT3', 
    price: 'Contact for Price', 
    img: '/gt3_front.png', 
    gallery: [
      '/gt3_front.png',
      '/gt3_rear.png',
      'https://images.unsplash.com/photo-1611821064430-0d40221e4e03?auto=format&fit=crop&w=1200'
    ],
    desc: 'Born on the track. The 911 GT3 delivers arguably the purest, most visceral driving experience of any modern sports car, equipped with aero-derived swan-neck wings.', 
    specs: ['502 Horsepower', '4.0L Naturally Aspirated Flat-6', '9,000 RPM Redline limit', 'Racing Derived Aerodynamics'] 
  },
];

export default function CarDetailingPage() {
  const [activeService, setActiveService] = useState<typeof servicesData[0] | null>(null);
  const [activeCar, setActiveCar] = useState<typeof inventoryData[0] | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedService, setSelectedService] = useState<string>('Ceramic Coating');

  const openCarModal = (car: typeof inventoryData[0]) => {
    setActiveCar(car);
    setSelectedGalleryImg(car.gallery[0]);
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('submitting');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email') || 'N/A',
          phone: formData.get('phone'),
          company: formData.get('vehicle'),
          message: `Service: ${formData.get('service')} | Location: ${formData.get('location')} | Notes: ${formData.get('notes')}`,
          type: 'Car Detailing Booking',
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setBookingStatus('success');
    } catch {
      setBookingStatus('idle');
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-10">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-start"
          >
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#D18F08]"></span> Automotive Perfection
            </span>
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-accent)' }}>
              THE ART OF <br /> <span className="text-gold-gradient">EXECUTION.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mb-12 leading-relaxed">
              Bespoke automotive enhancement and a curated inventory of perfected exotic vehicles. Experience the absolute pinnacle of luxury care and precision engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#contact" className="btn-premium bg-[#D18F08] text-black px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest">Book Execution</a>
              <a href="#services" className="glass-panel px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#D18F08] transition-all">Explore Services</a>
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-col justify-center gap-8">
            {[
              { icon: <Shield className="text-[#D18F08]" />, title: 'Certified Protection', desc: 'Sovereign protection for your automotive assets.' },
              { icon: <Droplets className="text-[#D18F08]" />, title: 'Advanced Hydro', desc: 'Extreme water repellency and self-cleaning tech.' },
              { icon: <Sparkles className="text-[#D18F08]" />, title: 'Concierge Care', desc: 'Bespoke service tailored to your precise schedule.' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-6 glass-panel p-6 rounded-3xl border-transparent hover:border-[#D18F08]/30 transition-all bg-[#0a0a0a]/60 backdrop-blur-xl"
              >
                <div className="bg-[#D18F08]/10 p-4 rounded-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-sm">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>SERVICE <span className="text-[#D18F08]">TIERS.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed">Select a specialized treatment protocol meticulously engineered for your vehicle&apos;s specific needs, including fleet and industrial capacity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative min-h-[500px] flex flex-col justify-end rounded-[2.5rem] overflow-hidden glass-panel glass-panel-hover"
                onClick={() => setActiveService(service)}
              >
                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="relative z-10 p-10 flex flex-col justify-end h-full mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-accent)' }}>{service.title}</h3>
                  <p className="text-[#D18F08] text-[10px] font-bold uppercase tracking-[0.2em] bg-black/60 w-fit px-3 py-1 rounded-full">{service.caption}</p>
                  <button className="mt-6 flex items-center gap-2 bg-[#D18F08]/20 w-fit px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    View Protocol <ChevronRight size={14} className="text-[#D18F08]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
            onClick={() => setActiveService(null)}
          >
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] flex flex-col lg:flex-row relative overflow-hidden shadow-3xl max-h-[90vh] overflow-y-auto lg:overflow-visible"
               onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-6 right-6 z-20 text-white bg-white/5 p-3 rounded-full hover:bg-[#D18F08] hover:text-black transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="w-full lg:w-1/2 h-64 lg:h-auto relative min-h-[300px] lg:min-h-0">
                <img src={activeService.img} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0A0A0A] lg:from-transparent to-transparent lg:to-[#0A0A0A]"></div>
              </div>
              
              <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center overflow-y-auto">
                <span className="text-[#D18F08] uppercase tracking-[.3em] text-[10px] font-bold mb-4">{activeService.caption}</span>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>{activeService.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{activeService.desc}</p>
                
                {/* Price & Duration Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-white/5 border border-white/5 p-5 rounded-2xl">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      <Tag size={12} className="text-[#D18F08]" /> Guide Price
                    </div>
                    <p className="text-lg font-bold text-white tracking-wide">{activeService.price}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                      <Clock size={12} className="text-[#D18F08]" /> Duration
                    </div>
                    <p className="text-lg font-bold text-white tracking-wide">{activeService.duration}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {activeService.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#D18F08] rotate-45"></div> {b}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs text-gray-400 leading-relaxed">
                    <span className="font-bold text-white uppercase tracking-wider block mb-1">Best For:</span>
                    {activeService.bestFor}
                  </div>
                  <div className="text-[10px] text-gray-500 italic bg-[#D18F08]/5 border border-[#D18F08]/10 p-3 rounded-xl">
                    * {activeService.trust}
                  </div>
                </div>

                <a 
                  href="#contact" 
                  onClick={() => {
                    setSelectedService(activeService.title);
                    setActiveService(null);
                  }} 
                  className="btn-premium bg-[#D18F08] text-black w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center shadow-[0_0_20px_rgba(209,143,8,0.2)] block hover:bg-white hover:text-black transition-all"
                >
                  Book This Service
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Modal with Gallery */}
      <AnimatePresence>
        {activeCar && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
            onClick={() => setActiveCar(null)}
          >
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] flex flex-col lg:flex-row relative overflow-hidden shadow-3xl"
               onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveCar(null)}
                className="absolute top-6 right-6 z-20 text-white bg-white/5 p-3 rounded-full hover:bg-[#D18F08] hover:text-black transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative flex flex-col bg-black">
                <div className="relative flex-grow overflow-hidden">
                  <motion.img 
                    key={selectedGalleryImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={selectedGalleryImg || activeCar.gallery[0]} 
                    className="w-full h-full object-cover" 
                    alt={activeCar.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]"></div>
                </div>
                {/* Thumbnails */}
                <div className="h-24 md:h-32 bg-[#050505] border-t border-white/5 flex p-3 gap-3 overflow-x-auto custom-scrollbar">
                  {activeCar.gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedGalleryImg(img)}
                      className={`relative w-24 md:w-32 h-full flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${selectedGalleryImg === img ? 'border-[#D18F08] scale-95 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center overflow-y-auto">
                <span className="text-[#D18F08] uppercase tracking-[.3em] text-[10px] font-bold mb-4">Exotic Inventory</span>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-accent)' }}>{activeCar.title}</h2>
                <div className="mb-6">
                  <span className="text-3xl text-white font-bold tracking-wider">{activeCar.price}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light">{activeCar.desc}</p>
                
                <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <Key size={14} className="text-[#D18F08]" /> Technical Specifications
                </h4>
                <div className="space-y-4 mb-10 bg-white/5 border border-white/5 p-6 rounded-3xl">
                  {activeCar.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs text-gray-400">
                      <Zap size={12} className="text-[#D18F08]" /> {spec}
                    </div>
                  ))}
                </div>
                <a href="#contact" onClick={() => setActiveCar(null)} className="btn-premium bg-[#111] border border-white/20 hover:border-[#D18F08] text-white w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center transition-all mt-auto">
                  Request Information
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Sales Section */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Premium Inventory</span>
            <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: 'var(--font-accent)' }}>BOUGHT. <span className="text-[#D18F08]">PERFECTED.</span> SOLD.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {inventoryData.map((car) => (
              <div 
                key={car.id} 
                onClick={() => openCarModal(car)}
                className="group glass-panel rounded-[3rem] overflow-hidden border-transparent hover:border-[#D18F08]/40 transition-all duration-500 shadow-3xl flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-md text-white border border-[#D18F08]/30 text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full">View Gallery</div>
                  <img src={car.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                </div>
                <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-accent)' }}>{car.title}</h3>
                    <p className="text-[#D18F08] font-bold text-lg tracking-wider">{car.price}</p>
                  </div>
                  <button className="btn-premium border border-white/10 bg-white/5 text-white group-hover:bg-[#D18F08] group-hover:border-[#D18F08] group-hover:text-black px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 border-t border-white/5 relative overflow-hidden bg-[#050505]">
          <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[#D18F08] opacity-[0.02] blur-[150px] rounded-full"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
            <div className="w-full lg:w-1/3">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-accent)' }}>LET&apos;S BOOK <br /><span className="text-[#D18F08]">PERFECTION.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
                Submit your request and our automotive concierge will contact you to finalize your detail schedule or vehicle inquiry.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-[#D18F08]/10 p-4 rounded-2xl text-[#D18F08] border border-[#D18F08]/20"><Phone size={24} /></div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Direct Line</p>
                    <a href="tel:+447448167943" className="text-xl font-bold hover:text-[#D18F08] transition text-white">+44 7448 167943</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-[#25D366]/10 p-4 rounded-2xl text-[#25D366] border border-[#25D366]/20"><WhatsAppIcon size={24} /></div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">WhatsApp Chat</p>
                    <a href="https://wa.me/447448167943" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-[#25D366] transition text-white">Chat on WhatsApp</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-[#D18F08]/10 p-4 rounded-2xl text-[#D18F08] border border-[#D18F08]/20"><MapPin size={24} /></div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Service Area</p>
                    <p className="text-xl font-bold text-white leading-tight">Mobile Concierge Nationwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              {bookingStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-20 rounded-[4rem] text-center border-[#D18F08]/30">
                  <div className="bg-[#D18F08]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(209,143,8,0.2)]">
                    <CheckCircle2 size={40} className="text-[#D18F08]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>Booking Received</h3>
                  <p className="text-gray-400 text-lg">Our experts will review your request and contact you within the hour.</p>
                </motion.div>
              ) : (
                <form className="glass-panel p-12 md:p-16 rounded-[4rem] space-y-8 border-transparent hover:border-white/5 transition-all" onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Full Name</label>
                       <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all" placeholder="John Wick" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Email Address</label>
                       <input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Phone Number</label>
                       <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all" placeholder="+44 7448 167943" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Vehicle Asset</label>
                       <input name="vehicle" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all" placeholder="e.g. Porsche 911" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Service Tier</label>
                       <select 
                         name="service" 
                         value={selectedService}
                         onChange={(e) => setSelectedService(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all appearance-none cursor-pointer"
                       >
                          <option className="text-black" value="Body Wash">Body Wash / Mobile Wash</option>
                          <option className="text-black" value="Paint Protection Film">Paint Protection Film</option>
                          <option className="text-black" value="Ceramic Coating">Ceramic Coating</option>
                          <option className="text-black" value="Paint Correction">Paint Correction</option>
                          <option className="text-black" value="Interior Restoration">Interior Restoration</option>
                          <option className="text-black" value="Commercial Fleets">Commercial Fleets</option>
                          <option className="text-black" value="Heavy Duty Trucks">Heavy Duty Trucks</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Execution Location</label>
                     <input name="location" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all" placeholder="Enter service address" />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-[.3em] text-gray-500 px-1">Service Constraints / Notes</label>
                     <textarea name="notes" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#D18F08] transition-all resize-none" placeholder="Detail any specific requirements..."></textarea>
                  </div>

                  <button type="submit" disabled={bookingStatus === 'submitting'} className="btn-premium bg-[#D18F08] text-black w-full py-6 rounded-2xl text-xs font-bold uppercase tracking-[.3em] shadow-3xl flex items-center justify-center gap-4">
                    {bookingStatus === 'submitting' ? 'Transmitting...' : 'Submit Booking Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <Link href="/">
            <img src="/cram_logo_cs.png" alt="CRAM" className="h-8 w-auto" />
          </Link>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/120093905/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="LinkedIn">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590148637267" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Facebook">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.1 1-1.1h3V1h-4.3C10.5 1 9 2.5 9 5.8V8z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/cram.serviceshub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Instagram">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="https://x.com/cram_services" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="Twitter">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@cram.services" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D18F08] transition" aria-label="TikTok">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.43-.43-.63-.67-.07 2.62-.03 5.24-.04 7.86-.03 2.05-.62 4.14-1.93 5.71-1.4 1.73-3.66 2.76-5.88 2.83-2.6.1-5.22-1.04-6.73-3.15-1.6-2.18-1.92-5.18-1.01-7.75.92-2.67 3.27-4.75 6.09-5.17.65-.1 1.37-.1 2.03-.01v4.11c-.55-.12-1.15-.15-1.7-.05-1.52.23-2.91 1.34-3.4 2.81-.54 1.54-.15 3.39.99 4.54 1.05 1.09 2.75 1.48 4.18.99 1.15-.4 1.95-1.47 2.16-2.67.12-.66.08-1.35.09-2.03C12.54 6.89 12.53 3.45 12.525.02z" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">&copy; 2026 CRAM AUTOMOTIVE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
