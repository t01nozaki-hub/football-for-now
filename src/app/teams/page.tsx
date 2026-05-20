'use client';

import { Header, Footer } from '@/components/Navigation';
import { Globe, Search, ChevronLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchStandings, LEAGUE_MAP, translateTeamName, LEAGUES, MAJOR_TEAMS } from '@/lib/football-data';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group w-fit">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-neon-lime" />
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                  Club <span className="text-neon-lime text-5xl md:text-7xl">Directory</span>
                </h1>
              </div>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                All Teams / 5 Major European Leagues & More
              </p>
            </div>

            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-neon-lime transition-colors" />
              <input 
                type="text" 
                placeholder="チーム名で検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-neon-lime/50 focus:bg-white/10 transition-all placeholder:text-white/10"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="py-32 text-center">
            <div className="inline-block w-10 h-10 border-2 border-neon-lime border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Initializing Data...</p>
          </div>
        ) : (
          <div className="space-y-24 mb-20">
            <AnimatePresence mode="wait">
              {filteredData.length > 0 ? (
                <div className="space-y-24">
                  {filteredData.map((league, leagueIdx) => (
                    <motion.div 
                      key={league.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: leagueIdx * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-neon-lime shadow-xl">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl md:text-3xl font-black italic tracking-tight uppercase leading-none">{league.name}</h2>
                          <Link href={`/leagues/${league.code}/`} className="text-[10px] font-black uppercase tracking-widest text-neon-lime hover:text-white transition-colors mt-2 inline-flex items-center gap-1 group">
                            View Table & Stats <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </Link>
                        </div>
                        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {league.teams.map((team: any, teamIdx: number) => (
                          <motion.div
                            key={team.id}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {MAJOR_TEAMS.some(m => m.id === team.id.toString()) ? (
                              <Link 
                                href={`/teams/${team.id}/`}
                                className="glass rounded-3xl p-6 flex flex-col items-center text-center gap-5 border border-white/5 hover:border-neon-lime/30 hover:bg-white/[0.07] transition-all group h-full justify-center relative overflow-hidden"
                              >
                                <div className="absolute top-0 right-0 w-12 h-12 bg-neon-lime/5 blur-xl rounded-full -mr-6 -mt-6 group-hover:bg-neon-lime/10 transition-colors" />
                                <img 
                                  src={team.crest} 
                                  alt="" 
                                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
                                />
                                <span className="text-[11px] font-black leading-tight group-hover:text-neon-lime transition-colors uppercase tracking-wider">
                                  {translateTeamName(team.name)}
                                </span>
                              </Link>
                            ) : (
                              <div className="glass rounded-3xl p-6 flex flex-col items-center text-center gap-5 border border-white/5 transition-all h-full justify-center relative overflow-hidden opacity-60">
                                <img 
                                  src={team.crest} 
                                  alt="" 
                                  className="w-14 h-14 object-contain drop-shadow-2xl" 
                                />
                                <span className="text-[11px] font-black leading-tight text-white/80 uppercase tracking-wider">
                                  {translateTeamName(team.name)}
                                </span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-32 text-center glass rounded-[40px] border border-white/5 px-6 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-neon-lime/5 to-transparent pointer-events-none" />
                  <p className="text-white/40 font-black uppercase tracking-[0.2em] text-xs mb-10 relative z-10">No clubs found matching "{search}"</p>
                  <div className="flex flex-wrap justify-center gap-3 relative z-10">
                    {['アーセナル', 'レアル', 'バルサ', 'リヴァプール', 'バイエルン', 'インテル'].map(rec => (
                      <button 
                        key={rec} 
                        onClick={() => setSearch(rec)}
                        className="px-6 py-3 bg-white/5 hover:bg-neon-lime hover:text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 hover:border-neon-lime shadow-lg"
                      >
                        Search {rec}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
