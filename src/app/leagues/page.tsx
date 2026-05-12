import { Metadata } from 'next';
import { Header, Footer } from '@/components/Navigation';
import { Trophy, Globe, ChevronLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { LEAGUES, LEAGUE_MAP } from '@/lib/football-data';

export const metadata: Metadata = {
  title: '欧州リーグ一覧 | football for now',
  description: 'プレミアリーグ、ラ・リーガ、ブンデスリーガなど、欧州主要リーグの最新情報を網羅。各リーグの順位表や試合日程へ素早くアクセス。',
  alternates: {
    canonical: '/leagues/',
  },
};

export const dynamic = 'force-static';

export default function LeaguesPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group w-fit">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-neon-lime" />
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              League <span className="text-neon-lime text-5xl md:text-7xl">Directory</span>
            </h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
            Major European Competitions & International Tournaments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {LEAGUES.map((code) => (
            <Link 
              key={code} 
              href={`/leagues/${code}/`}
              className="glass rounded-[32px] p-8 border border-white/5 hover:neon-border transition-all group relative overflow-hidden h-64 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-neon-lime/10 transition-colors" />
              
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                  {code === 'PL' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : 
                   code === 'PD' ? '🇪🇸' : 
                   code === 'BL1' ? '🇩🇪' : 
                   code === 'SA' ? '🇮🇹' : 
                   code === 'FL1' ? '🇫🇷' : 
                   code === 'CL' ? '🏆' : 
                   code === 'EC' ? '🇪🇺' : '⚽'}
                </div>
                <ArrowUpRight className="w-6 h-6 text-white/10 group-hover:text-neon-lime transition-all" />
              </div>

              <div>
                <div className="text-[10px] font-black text-neon-lime/60 uppercase tracking-[0.2em] mb-2">{code}</div>
                <h3 className="text-2xl font-black italic tracking-tight uppercase group-hover:text-neon-lime transition-colors">
                  {LEAGUE_MAP[code] || code}
                </h3>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-2">
                  View Standings, Results & Scorers
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
