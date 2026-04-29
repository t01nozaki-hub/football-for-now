import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Newspaper, Clock, TrendingUp, ChevronLeft, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';

import { NEWS_ARTICLES } from '@/lib/news-data';

export async function generateStaticParams() {
  return NEWS_ARTICLES.map(article => ({
    slug: article.slug
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find(a => a.slug === slug) || NEWS_ARTICLES[0]; 

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/news" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to News Feed</span>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-neon-lime text-black text-xs font-black uppercase tracking-widest rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                {article.time}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-8 leading-[0.95]">
              {article.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                  ✍️
                </div>
                <div>
                  <p className="text-xs font-bold">Editorial Staff</p>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">football for now</p>
                </div>
              </div>
              <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          <AdPlaceholder position="header-bottom" />

          {/* Featured Image - Only show if it's a real image path/url or specifically requested */}
          {article.image && !['🔴', '🏆', '🩵'].includes(article.image) && (
            <div className="w-full aspect-video rounded-[40px] bg-white/5 border border-white/10 mb-12 overflow-hidden">
              <img src={article.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="glass rounded-[40px] p-8 md:p-16 border border-white/5 mb-20">
            <div className="prose prose-invert max-w-none">
              {article.content.split('\n').map((line, i) => (
                <p key={i} className="text-lg text-white/80 leading-relaxed font-medium mb-6">
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>

          <AdPlaceholder position="footer-top" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
