import { getBlogs } from '@/lib/blogsDb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Footer from '@/components/Footer';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((item) => ({ id: item.id.toString() }));
  } catch {
    // DB unavailable at build time — pages will be generated on demand
    return [];
  }
}

export default async function GalleryDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blogs = await getBlogs();
  const item = blogs.find((g) => g.id.toString() === resolvedParams.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen pb-32">
      {/* Navigation */}
      <div className="absolute top-32 left-6 md:left-12 z-20">
        <Link href="/gallery" className="flex items-center gap-2 text-white/50 hover:text-[#D18F08] transition-colors font-bold text-xs uppercase tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>
      </div>

      {/* Hero Header */}
      <header className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-end pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center md:text-left">
          <span className="text-[#D18F08] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
            {item.category} Insight
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-accent)' }}>
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest mt-8 border-t border-white/10 pt-8">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#D18F08]" /> {item.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#D18F08]" /> {item.author}
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 mt-12 relative z-10">
        <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D18F08]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <article 
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light [&>p]:mb-8 [&>p:first-child]:text-xl [&>p:first-child]:text-white [&>p:first-child]:font-normal"
            dangerouslySetInnerHTML={{ __html: item.content || '<p>Detailed content coming soon.</p>' }}
          />

          <div className="mt-16 pt-12 border-t border-white/10">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Tag size={16} className="text-[#D18F08]" /> Related Tags
            </h4>
            <div className="flex flex-wrap gap-3">
              {item.tags?.map((tag, idx) => (
                <span key={idx} className="bg-[#111] border border-white/5 text-gray-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#D18F08]/30 hover:text-[#D18F08] transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
