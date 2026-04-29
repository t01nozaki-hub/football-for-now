import { fetchStandings, fetchMatches, LEAGUE_MAP, JAPANESE_PLAYERS, LEAGUES } from '@/lib/football-data';
import { StandingCard } from '@/components/StandingCard';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Header, Footer } from '@/components/Navigation';
import { ClientMatchList } from '@/components/ClientMatchList';
import { TournamentBracket } from '@/components/TournamentBracket';
import { MatchCard } from '@/components/MatchCard';
import { ArrowUpRight } from 'lucide-react';

import Link from 'next/link';

// Use LEAGUES from lib

export default async function Home() {
  const standingsData = await Promise.all(
    LEAGUES.map(async (code) => {
      try {
        const data = await fetchStandings(code);
        return {
          code,
          name: LEAGUE_MAP[code],
          standings: data.standings[0].table,
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    })
  );

  const matchesData = await Promise.all(
    LEAGUES.map(async (code) => {
      try {
        // ステータス指定なしで、直近の終了済み試合と今後の試合の両方を取得
        const data = await fetchMatches(code);
        return {
          code,
          name: LEAGUE_MAP[code],
          matches: data.matches || [],
        };
      } catch (e) {
        console.error(e);
        return { code, name: LEAGUE_MAP[code], matches: [] };
      }
    })
  );

  const matches = matchesData
    .flatMap(ld => ld.matches.map((m: any) => ({ ...m, leagueName: ld.name })))
    .sort((a: any, b: any) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()); // 最新順

  const upcomingMatches = [...matches]
    .filter(m => m.status === 'SCHEDULED')
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
              FOOTBALL <span className="text-neon-lime">DASHBOARD</span>
            </h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Real-time European Soccer Statistics & Schedule
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60">
                <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse" />
                API Sync Active
              </div>
          </div>
        </div>

        {/* League Quick View Grid - Differentiation through Clarity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {standingsData.filter(d => d !== null).map((league: any) => (
            <Link key={league.code} href={`/leagues/${league.code}`} className="glass rounded-[32px] p-6 border border-white/5 hover:neon-border transition-all group relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm">
                    {league.code === 'PL' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : league.code === 'PD' ? '🇪🇸' : league.code === 'BL1' ? '🇩🇪' : league.code === 'SA' ? '🇮🇹' : '🇫🇷'}
                  </div>
                  <h3 className="font-black italic text-[11px] tracking-tight uppercase">{league.name}</h3>
                </div>
                <ArrowUpRight className="w-3 h-3 text-white/10 group-hover:text-neon-lime transition-all" />
              </div>

              <div className="space-y-3">
                {league.standings.slice(0, 3).map((team: any, i: number) => {
                  const isJP = JAPANESE_PLAYERS.some(p => p.team === team.team.name);
                  return (
                    <div key={team.team.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[9px] font-black text-white/10">0{i+1}</span>
                        <img src={team.team.crest} alt="" className="w-3.5 h-3.5 object-contain" />
                        <span className={`text-[10px] font-bold truncate ${isJP ? 'text-neon-lime' : 'text-white/60'}`}>
                          {team.team.name.replace('FC', '').replace('CF', '').trim()}
                        </span>
                      </div>
                      <span className="text-[9px] font-black">{team.points}</span>
                    </div>
                  );
                })}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-12">
            {/* Tournament Bracket Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-neon-lime" />
                  <h2 className="text-2xl font-black italic tracking-tight uppercase">CL <span className="text-neon-lime">Tournament</span></h2>
                </div>
              </div>
              <TournamentBracket />
            </section>

            {/* Matches Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-neon-lime" />
                  <h2 className="text-2xl font-black italic tracking-tight uppercase">Recent <span className="text-neon-lime">Results</span></h2>
                </div>
                <Link href="/matches" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-neon-lime transition-colors">View All Results</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.filter((m: any) => m.status === 'FINISHED').slice(0, 4).map((match: any) => (
                  <MatchCard key={match.id} match={match} />
                ))}
                {matches.filter((m: any) => m.status === 'FINISHED').length === 0 && (
                  <div className="col-span-2 glass rounded-3xl p-8 border border-white/5 text-center text-white/20 text-xs font-bold uppercase tracking-widest">
                    No recent results available
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-neon-lime" />
                  <h2 className="text-2xl font-black italic tracking-tight uppercase">Upcoming <span className="text-neon-lime">Fixtures</span></h2>
                </div>
                <Link href="/matches" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-neon-lime transition-colors">View Full Schedule</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.filter((m: any) => m.status === 'SCHEDULED').slice(0, 6).map((match: any) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Featured Warriors Quick Access */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-neon-lime" />
              <h3 className="text-xl font-black italic tracking-tight uppercase">Japanese <span className="text-neon-lime">Warriors</span></h3>
            </div>
            <Link href="/japanese-players" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-neon-lime transition-colors">
              Full Directory →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {JAPANESE_PLAYERS.slice(0, 8).map((player) => {
               const slug = player.name.toLowerCase().replace(/\s+/g, '-');
               return (
                 <Link key={player.name} href={`/japanese-players/${slug}`} className="glass rounded-2xl p-4 flex flex-col items-center gap-3 group cursor-pointer hover:neon-border transition-all">
                   <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-3xl">
                     🇯🇵
                   </div>
                   <div className="text-center">
                     <span className="text-[10px] font-black block mb-0.5 group-hover:text-neon-lime transition-colors">
                       {player.jpName}
                     </span>
                     <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter whitespace-nowrap">
                       {player.team.split(' ')[0]}
                     </span>
                   </div>
                 </Link>
               );
            })}
          </div>
        </section>

        <AdPlaceholder position="header-bottom" />

        {/* CL Tournament Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-neon-lime" />
              <h2 className="text-2xl font-black italic tracking-tight uppercase">CL <span className="text-neon-lime">Tournament</span></h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Next: Final</span>
            </div>
          </div>
          <TournamentBracket />
        </section>
        <AdPlaceholder position="content-middle" />

        {/* Match List Section */}
        <section className="mb-16">
          <ClientMatchList initialMatches={matches} />
        </section>

        <AdPlaceholder position="footer-top" />

      </main>

      <Footer />
    </div>
  );
}
