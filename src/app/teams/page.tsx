'use client';

import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Globe, Search, ChevronLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchStandings, LEAGUE_MAP, translateTeamName, LEAGUES } from '@/lib/football-data';

// Use LEAGUES from lib

export default function TeamListPage() {
  const [search, setSearch] = useState('');
  const [leaguesData, setLeaguesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await Promise.all(
        LEAGUES.map(async (code) => {
          try {
            const res = await fetchStandings(code);
            return {
              code,
              name: LEAGUE_MAP[code],
              teams: res.standings[0].table.map((t: any) => t.team),
            };
          } catch (e) {
            return { code, name: LEAGUE_MAP[code], teams: [] };
          }
        })
      );
      setLeaguesData(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredData = leaguesData.map(league => ({
    ...league,
    teams: league.teams.filter((t: any) => 
      t.name.toLowerCase().includes(search.toLowerCase()) || 
      translateTeamName(t.name).includes(search)
    )
  })).filter(league => league.teams.length > 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-neon-lime" />
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Club <span className="text-neon-lime">Directory</span></h1>
            </div>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">All Teams / 5 Major European Leagues</p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="チーム名で検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-neon-lime transition-all"
            />
          </div>
        </div>

        <AdPlaceholder position="header-bottom" />

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-neon-lime border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Loading Directory...</p>
          </div>
        ) : (
          <div className="space-y-20 mb-20">
            {filteredData.map((league) => (
              <div key={league.code}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-lime">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black italic tracking-tight uppercase">{league.name}</h2>
                    <Link href={`/leagues/${league.code}`} className="text-[10px] font-black uppercase tracking-widest text-neon-lime hover:underline mt-1 inline-block">
                      View Table & Scorers →
                    </Link>
                  </div>
                  <div className="hidden md:block flex-1 h-px bg-white/5" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {league.teams.map((team: any) => (
                    <Link 
                      key={team.id} 
                      href={`/teams/${team.id}`}
                      className="glass rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:neon-border transition-all group"
                    >
                      <img src={team.crest} alt="" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold leading-tight group-hover:text-neon-lime transition-colors">
                        {translateTeamName(team.name)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="py-20 text-center glass rounded-3xl border border-white/5 px-6">
                <p className="text-white/40 font-bold uppercase tracking-widest mb-8">No clubs found matching "{search}"</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['アーセナル', 'レアル', 'バルサ', 'ブライトン', 'バイエルン'].map(rec => (
                    <button 
                      key={rec} 
                      onClick={() => setSearch(rec)}
                      className="px-4 py-2 bg-white/5 hover:bg-neon-lime hover:text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      Search {rec}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <AdPlaceholder position="footer-top" />
      </main>

      <Footer />
    </div>
  );
}
