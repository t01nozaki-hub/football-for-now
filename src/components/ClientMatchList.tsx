'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchCard } from './MatchCard';
import { JAPANESE_PLAYERS_TEAMS } from '@/lib/football-data';
import { Star, Filter } from 'lucide-react';

interface ClientMatchListProps {
  initialMatches: any[];
}

export const ClientMatchList: React.FC<ClientMatchListProps> = ({ initialMatches }) => {
  const [filterJP, setFilterJP] = useState(false);

  const filteredMatches = filterJP
    ? initialMatches.filter(m => 
        JAPANESE_PLAYERS_TEAMS.includes(m.homeTeam.name) || 
        JAPANESE_PLAYERS_TEAMS.includes(m.awayTeam.name)
      )
    : initialMatches;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-neon-lime" />
          <h2 className="text-2xl font-black italic tracking-tight uppercase">Upcoming Matches</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilterJP(!filterJP)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-bold ${
              filterJP 
                ? 'bg-neon-lime border-neon-lime text-black neon-glow' 
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
            }`}
          >
            <Star className={`w-4 h-4 ${filterJP ? 'fill-black' : ''}`} />
            日本人選手所属のみ
          </button>
          
          <button className="p-2 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredMatches.length > 0 ? (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMatches.map((match) => (
              <motion.div key={match.id} layout>
                <MatchCard 
                  match={match} 
                  leagueName={match.leagueName} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-bold mb-2">表示できる試合がありません</h3>
            <p className="text-white/40 text-sm">フィルターを解除するか、別のリーグをチェックしてください。</p>
            <button 
              onClick={() => setFilterJP(false)}
              className="mt-6 text-neon-lime font-bold text-sm underline underline-offset-4"
            >
              すべての試合を表示
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

