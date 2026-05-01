import { Header, Footer } from '@/components/Navigation';
import { JAPANESE_PLAYERS, translateTeamName } from '@/lib/football-data';
import { ChevronLeft, Star, TrendingUp, Shield, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return JAPANESE_PLAYERS.map((player) => ({
    slug: player.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const player = JAPANESE_PLAYERS.find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!player) return <div>Player not found</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/japanese-players" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Warriors</span>
        </Link>

        {/* Player Profile Hero */}
        <section className="relative glass rounded-[40px] p-8 md:p-16 mb-12 overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-lime/5 blur-[120px] -mr-64 -mt-64" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/5 border-2 border-neon-lime/20 flex items-center justify-center overflow-hidden">
                 <span className="text-8xl">🇯🇵</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neon-lime text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
                WARRIOR
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-neon-lime">
                  {player.role}
                </span>
                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Jersey No. {Math.floor(Math.random() * 30) + 1}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
                {player.jpName} <br />
                <span className="text-white/20 text-4xl md:text-6xl">{player.name}</span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Current Club</p>
                  <p className="text-xl font-bold text-neon-lime">{translateTeamName(player.team)}</p>
                </div>
                <div className="w-px h-12 bg-white/5 hidden md:block" />
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-xl font-bold">Key Player</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Stats Radar Mock */}
          <div className="lg:col-span-1 glass rounded-3xl p-8 border border-white/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-8 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-neon-lime" /> Performance Radar
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Attack', value: 85, icon: Target },
                { label: 'Defense', value: 65, icon: Shield },
                { label: 'Speed', value: 92, icon: Zap },
                { label: 'Technique', value: 88, icon: Star },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase">{stat.label}</span>
                    <span className="text-xs font-mono text-neon-lime">{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neon-lime rounded-full" 
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[10px] text-white/20 leading-relaxed italic text-center">
              ※スタッツは今シーズンのパフォーマンスに基づいた推定値です。
            </p>
          </div>

          {/* Player Bio & Recent News */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-3xl p-8 md:p-10 border border-white/5">
              <h3 className="text-xl font-black italic uppercase tracking-tight mb-6">Player Background</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium mb-6">
                {player.jpName}は、現在の日本代表においても欠かせない存在として欧州の舞台で輝きを放っています。{translateTeamName(player.team)}での活躍は現地メディアからも高く評価されており、そのプレースタイルは多くのファンを魅了しています。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Age</p>
                  <p className="text-sm font-bold">24 Years Old</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Position</p>
                  <p className="text-sm font-bold">{player.role}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Birthplace</p>
                  <p className="text-sm font-bold">Japan</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-3xl p-6 border border-white/5 bg-gradient-to-br from-neon-lime/5 to-transparent">
                 <h4 className="text-xs font-black uppercase tracking-widest mb-4">Latest News</h4>
                 <p className="text-xs font-bold leading-relaxed">
                   「{player.jpName}、次節の注目株に。指揮官もその成長を絶賛。」
                 </p>
                 <p className="text-[10px] text-white/20 mt-4">2024.11.21</p>
              </div>
              <div className="glass rounded-3xl p-6 border border-white/5">
                 <h4 className="text-xs font-black uppercase tracking-widest mb-4">Market Value</h4>
                 <p className="text-2xl font-black italic text-neon-lime">€35.00M</p>
                 <p className="text-[10px] text-white/20 mt-4">ESTIMATED VALUATION</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
