'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, ChevronRight } from 'lucide-react';

interface Team {
  name: string;
  logo: string;
  score?: number;
  isWinner?: boolean;
}

interface MatchProps {
  team1: Team;
  team2: Team;
  stage: string;
}

const Match: React.FC<MatchProps> = ({ team1, team2, stage }) => (
  <div className="relative group">
    <div className="glass rounded-2xl p-4 border border-white/10 hover:border-neon-lime/30 transition-all w-full max-w-[240px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stage}</span>
        </div>
        {team1.isWinner || team2.isWinner ? <Star className="w-3 h-3 text-neon-lime fill-neon-lime" /> : null}
      </div>
      
      <div className="space-y-3">
        <div className={`flex items-center justify-between ${team1.isWinner ? 'text-white' : 'text-white/40'}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">{team1.logo}</span>
            <span className="text-sm font-bold truncate">{team1.name}</span>
          </div>
          <span className="text-sm font-black italic">{team1.score}</span>
        </div>
        <div className={`flex items-center justify-between ${team2.isWinner ? 'text-white' : 'text-white/40'}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg">{team2.logo}</span>
            <span className="text-sm font-bold truncate">{team2.name}</span>
          </div>
          <span className="text-sm font-black italic">{team2.score}</span>
        </div>
      </div>
    </div>
  </div>
);

export const TournamentBracket = () => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-8">
      <div className="flex items-start gap-12 min-w-[1000px] px-4">
        
        {/* Quarter Finals */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-4 bg-white/20 rounded-full" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Quarter Finals</h4>
          </div>
          <div className="space-y-12">
            <Match 
              stage="QF1"
              team1={{ name: 'Bayern', logo: '🔴', score: 3, isWinner: true }}
              team2={{ name: 'Real Madrid', logo: '⚪️', score: 2 }}
            />
            <Match 
              stage="QF2"
              team1={{ name: 'Arsenal', logo: '🛑', score: 3, isWinner: true }}
              team2={{ name: 'Sporting', logo: '🦁', score: 1 }}
            />
            <Match 
              stage="QF3"
              team1={{ name: 'PSG', logo: '🔵🔴', score: 4, isWinner: true }}
              team2={{ name: 'Liverpool', logo: '🔴', score: 2 }}
            />
            <Match 
              stage="QF4"
              team1={{ name: 'Atlético', logo: '⚪️🔴', score: 2, isWinner: true }}
              team2={{ name: 'Man City', logo: '🩵', score: 1 }}
            />
          </div>
        </div>

        {/* Semi Finals */}
        <div className="space-y-8 flex flex-col justify-around py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-4 bg-neon-lime/40 rounded-full" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Semi Finals</h4>
          </div>
          <div className="space-y-32">
            <Match 
              stage="SF1"
              team1={{ name: 'Bayern', logo: '🔴', score: 0 }}
              team2={{ name: 'PSG', logo: '🔵🔴', score: 0 }}
            />
            <Match 
              stage="SF2"
              team1={{ name: 'Arsenal', logo: '🛑', score: 0 }}
              team2={{ name: 'Atlético', logo: '⚪️🔴', score: 0 }}
            />
          </div>
        </div>

        {/* Final */}
        <div className="space-y-8 flex flex-col justify-center py-32">
          <div className="flex items-center gap-3 mb-8 bg-neon-lime/10 px-4 py-2 rounded-full border border-neon-lime/20 self-start">
            <Trophy className="w-4 h-4 text-neon-lime" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-lime">The Grand Final</h4>
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-bright rounded-[32px] p-8 border-2 border-neon-lime/30 shadow-[0_0_50px_rgba(204,255,0,0.1)] w-[300px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/10 blur-[50px] -mr-16 -mt-16" />
            <div className="text-center mb-8">
              <span className="text-[10px] font-black text-neon-lime uppercase tracking-[0.3em] block mb-2">May 30, 2026</span>
              <span className="text-xs text-white/40 font-bold uppercase">Stade de France, Paris</span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl">?</div>
                <span className="text-[10px] font-black uppercase text-center leading-tight">SF1 Winner</span>
              </div>
              <div className="text-2xl font-black italic text-white/10">VS</div>
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl">?</div>
                <span className="text-[10px] font-black uppercase text-center leading-tight">SF2 Winner</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
              <Star className="w-3 h-3 text-neon-lime" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Final Battle in Paris</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
