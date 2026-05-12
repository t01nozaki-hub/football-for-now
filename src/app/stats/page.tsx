import { Metadata } from 'next';
import { fetchScorers, LEAGUE_MAP, translateTeamName } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { Target, Trophy, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '得点ランキング・統計 | football for now',
  description: '欧州主要リーグの得点ランキング、アシストランキングなどの統計情報をチェック。日本人選手の活躍もデータで確認。',
  alternates: {
    canonical: '/stats/',
  },
};

const LEAGUES = ['PL', 'PD', 'BL1', 'SA', 'FL1'];

export default async function StatsPage() {
  const scorersData = await Promise.all(
    LEAGUES.map(async (code) => {
      try {
        const data = await fetchScorers(code);
        return {
          code,
          name: LEAGUE_MAP[code],
          scorers: (data.scorers || []).slice(0, 10),
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    })
  );

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
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">League <span className="text-neon-lime">Stats</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">各リーグ得点ランキング トップ10</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {scorersData.filter(Boolean).map((league: any) => (
            <div key={league.code} className="glass rounded-[32px] p-8 border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-neon-lime" />
                  <h2 className="text-xl font-black italic uppercase tracking-tight">{league.name}</h2>
                </div>
                <Link href={`/leagues/${league.code}/`} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-neon-lime transition-colors">
                  League Details →
                </Link>
              </div>

              <div className="space-y-4">
                {league.scorers.map((s: any, idx: number) => (
                  <div key={s.player.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-lime/30 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-white/20 w-4">{idx + 1}</span>
                      <div>
                        <p className="text-sm font-bold">{s.player.name}</p>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{translateTeamName(s.team.name)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black italic text-neon-lime">{s.goals}</span>
                      <span className="text-[9px] font-black uppercase text-white/20 ml-1">Goals</span>
                    </div>
                  </div>
                ))}
                {league.scorers.length === 0 && (
                  <p className="text-center text-white/20 text-xs italic py-10">Data currently unavailable.</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
