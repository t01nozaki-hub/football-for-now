import { fetchMatches, LEAGUE_MAP, LEAGUES } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { MatchCard } from '@/components/MatchCard';
import { ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

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

  // Group matches by league
  const groupedByLeague: Record<string, any[]> = {};
  allMatches.forEach(match => {
    const league = match.leagueName || 'Other';
    if (!groupedByLeague[league]) groupedByLeague[league] = [];
    groupedByLeague[league].push(match);
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
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">League-wise European Fixtures / 2025-26 Season</p>
        </div>

        <AdPlaceholder position="header-bottom" />

        <div className="space-y-20 mb-20">
          {Object.entries(groupedByLeague).map(([leagueName, matches]) => (
            <div key={leagueName}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="text-xl">
                    {leagueName.includes('プレミア') ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : 
                     leagueName.includes('ラ・リーガ') ? '🇪🇸' : 
                     leagueName.includes('ブンデス') ? '🇩🇪' : 
                     leagueName.includes('セリエA') ? '🇮🇹' : 
                     leagueName.includes('チャンピオンズ') ? '🇪🇺' : '⚽'}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black italic tracking-tight uppercase">{leagueName}</h2>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{matches.length} Matches Found</span>
                </div>
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
