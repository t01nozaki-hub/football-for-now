'use client';

import { JAPANESE_PLAYERS, MAJOR_TEAMS, translateTeamName } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { Search, ChevronLeft, User, Shield, ExternalLink, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // Filter Players
  const filteredPlayers = JAPANESE_PLAYERS.filter(p => 
    p.name.toLowerCase().includes(query) || p.jpName.includes(query) || p.team.toLowerCase().includes(query)
  );

  // Filter Teams
  const filteredTeams = MAJOR_TEAMS.filter(t => 
    t.name.toLowerCase().includes(query) || t.jpName.includes(query)
  );

  const totalResults = filteredPlayers.length + filteredTeams.length;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">
          Search <span className="text-neon-lime">Results</span>
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest px-4 py-1 bg-white/5 rounded-full border border-white/10">
            Keyword: <span className="text-white">"{query}"</span>
          </p>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{totalResults} matches found</p>
        </div>
      </div>


      {filteredTeams.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-5 h-5 text-neon-lime" />
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Teams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Link key={team.id} href={`/teams/${team.id}/`} className="glass rounded-3xl p-6 border border-white/5 hover:neon-border transition-all group flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tight group-hover:text-neon-lime transition-colors">{team.jpName}</h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{team.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {filteredPlayers.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-5 h-5 text-neon-lime" />
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Japanese Players</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player) => {
              const slug = player.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link key={player.name} href={`/japanese-players/${slug}/`} className="glass rounded-[32px] p-8 border border-white/5 hover:neon-border transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-neon-lime/10 transition-all" />
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                      🇯🇵
                    </div>
                    <User className="w-5 h-5 text-white/10 group-hover:text-neon-lime transition-colors" />
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-1">{player.jpName}</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{player.name}</p>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-3 h-3 text-neon-lime" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Current Club</span>
                    </div>
                    <p className="text-sm font-bold truncate group-hover:text-neon-lime transition-colors">
                      {translateTeamName(player.team)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div className="glass rounded-[40px] p-20 flex flex-col items-center justify-center text-center border border-white/5 bg-gradient-to-b from-white/5 to-transparent mb-20">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8">
            <Search className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">No Matches Found</h3>
          <p className="text-white/40 text-sm font-medium max-w-sm mb-12">
            一致する結果が見つかりませんでした。別のキーワード（選手名、クラブ名など）で再検索してください。
          </p>
          <Link href="/japanese-players/" className="bg-neon-lime text-black px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:neon-glow transition-all">
            Browse All Players
          </Link>
        </div>
      )}

    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-white/20 font-black uppercase tracking-widest animate-pulse">Analyzing matches...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </div>
  );
}
