import { Header, Footer } from '@/components/Navigation';
import { Newspaper, Clock, TrendingUp, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { NEWS_ARTICLES } from '@/lib/news-data';
import { GearsAndApparel } from '@/components/AffiliateBanners';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-neon-lime" />
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Football <span className="text-neon-lime">News</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">欧州サッカーの最新トピックスを凝縮</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {NEWS_ARTICLES.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="block">
                <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 bg-neon-lime text-black text-[9px] font-black uppercase tracking-widest rounded">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold">
                          <Clock className="w-3 h-3" />
                          {article.time}
                        </div>
                      </div>
                      <h2 className="text-xl md:text-3xl font-black italic tracking-tight mb-4 group-hover:text-neon-lime transition-colors leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                </div>
              </Link>
            ))}
          </div>


          {/* Trending Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass rounded-[32px] p-8 border border-neon-lime/20 bg-gradient-to-br from-neon-lime/5 to-transparent">
              <h3 className="text-xs font-black uppercase tracking-widest text-neon-lime mb-8 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Trending Topics
              </h3>
              <div className="space-y-6">
                {[
                  'エムバペ CL得点王へ独走',
                  'CL 準決勝第2戦の見どころ',
                  'バイエルン ブンデス優勝確定',
                  'ラ・リーガ 優勝の行方は最終節へ',
                ].map((topic, i) => (
                  <div key={topic} className="flex items-center gap-4 group cursor-pointer">
                    <span className="text-xl font-black italic text-white/10 group-hover:text-neon-lime transition-colors">0{i+1}</span>
                    <p className="text-sm font-bold group-hover:text-neon-lime transition-colors">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <GearsAndApparel />

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
