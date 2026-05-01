'use client';

import { JAPANESE_PLAYERS, translateTeamName } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { Star, ChevronLeft, MapPin, ExternalLink, Search, Filter, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', name: 'ALL' },
  { id: 'Feyenoord Rotterdam', name: 'FEYENOORD' },
  { name: 'PREMIER', id: 'England' },
  { name: 'BUNDES', id: 'Germany' },
  { name: 'LALIGA', id: 'Spain' },
];

export default function JapanesePlayersPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredPlayers = JAPANESE_PLAYERS.filter(p => {
    const matchesSearch = p.jpName.includes(search) || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.team.toLowerCase().includes(search.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'Feyenoord Rotterdam') return matchesSearch && p.team === activeCategory;
    
    // For country-based logic, we'd need more metadata, but for now we can check team suffixes or known clubs
    return matchesSearch;
  });

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
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Japanese <span className="text-neon-lime">Warriors</span></h1>
            </div>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Overseas Players Tracker / 2025-26 Season</p>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    activeCategory === cat.id 
                    ? 'bg-neon-lime text-black border-neon-lime shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
                    : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="選手名、クラブ名で検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-neon-lime transition-all"
              />
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredPlayers.map((player) => {
              const slug = player.name.toLowerCase().replace(/\s+/g, '-');
              const isHighlight = player.team === 'Feyenoord Rotterdam';

              return (
                <motion.div
                  key={player.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link 
                    href={`/japanese-players/${slug}`}
                    className={`glass rounded-3xl p-6 relative overflow-hidden group hover:neon-border transition-all block h-full ${
                      isHighlight ? 'border-neon-lime/20 bg-neon-lime/5' : 'border-white/5'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-neon-lime/10 transition-all" />
                    
                    <div className="flex items-start justify-between mb-8">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:rotate-6 transition-transform">
                          🇯🇵
                        </div>
                        {isHighlight && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-lime rounded-full flex items-center justify-center border-2 border-black">
                            <ShieldCheck className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Name</span>
                        <span className="text-2xl font-black italic text-neon-lime leading-tight">{player.jpName}</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-0.5">Club</span>
                          <span className="text-sm font-bold group-hover:text-neon-lime transition-colors leading-tight">
                            {translateTeamName(player.team)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <Star className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-0.5">Position</span>
                          <span className="text-sm font-black italic text-white/60 tracking-wider uppercase">{player.role}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-neon-lime transition-colors">
                        PLAYER PROFILE <ExternalLink className="w-3 h-3" />
                      </span>
                      <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        isHighlight ? 'bg-neon-lime text-black' : 'bg-white/10 text-white/60'
                      }`}>
                        {isHighlight ? 'CHAMPIONS LEAGUE' : 'ACTIVE'}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredPlayers.length === 0 && (
            <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/5">
              <p className="text-white/40 font-bold uppercase tracking-widest">No players match your search.</p>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
