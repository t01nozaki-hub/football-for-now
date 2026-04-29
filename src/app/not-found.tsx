import { Header, Footer } from '@/components/Navigation';
import { ChevronLeft, Ghost } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <Ghost className="w-24 h-24 text-white/5 animate-bounce" />
          <span className="absolute inset-0 flex items-center justify-center text-6xl font-black italic text-neon-lime opacity-20">404</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6">
          OFFSIDE <span className="text-neon-lime">POSITION.</span>
        </h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm mb-12 max-w-md">
          お探しのページはピッチ外へ出てしまったか、存在しないようです。
        </p>

        <Link href="/" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
