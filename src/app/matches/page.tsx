import { fetchMatches, LEAGUE_MAP, LEAGUES } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { ClientMatchesView } from '@/components/ClientMatchesView';
import { ChevronLeft } from 'lucide-react';
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
    .sort((a: any, b: any) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  const leaguesList = LEAGUES.map(code => ({ code, name: LEAGUE_MAP[code] }));

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
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Match <span className="text-neon-lime">Timeline</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm text-balance">欧州主要リーグの全日程・結果をタイムライン形式で整理</p>
        </div>

        <ClientMatchesView initialMatches={allMatches} leagues={leaguesList} />

      </main>

      <Footer />
    </div>
  );
}
