import { fetchMatches, LEAGUE_MAP } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { MatchCard } from '@/components/MatchCard';
import { ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

import { fetchMatches, LEAGUE_MAP, LEAGUES } from '@/lib/football-data';

export default async function MatchesPage() {
  const matchesData = await Promise.all(
    LEAGUES.map(async (code) => {
      try {
        const data = await fetchMatches(code);
        return {
          code,
          name: LEAGUE_MAP[code],
          matches: data.matches || [],
        };
      } catch (e) {
        return { code, name: LEAGUE_MAP[code], matches: [] };
      }
    })
  );

  const allMatches = matchesData
    .flatMap(ld => ld.matches.map((m: any) => ({ ...m, leagueName: ld.name })))
    .sort((a: any, b: any) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

  // Group matches by date
  const groupedMatches: Record<string, any[]> = {};
  allMatches.forEach(match => {
    const date = new Date(match.utcDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', weekday: 'short' });
    if (!groupedMatches[date]) groupedMatches[date] = [];
    groupedMatches[date].push(match);
  });

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
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Match <span className="text-neon-lime">Schedule</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Upcoming European Fixtures / 2025-26 Season</p>
        </div>

        <AdPlaceholder position="header-bottom" />

        <div className="space-y-16 mb-20">
          {Object.entries(groupedMatches).map(([date, matches]) => (
            <div key={date}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-neon-lime" />
                </div>
                <h2 className="text-2xl font-black italic tracking-tight">{date}</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} leagueName={match.leagueName} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <AdPlaceholder position="footer-top" />
      </main>

      <Footer />
    </div>
  );
}
