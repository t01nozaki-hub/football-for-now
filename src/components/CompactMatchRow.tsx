'use client';

import React from 'react';
import { translateTeamName, getJapanesePlayersInTeam } from '@/lib/football-data';
import { Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Match {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score?: {
    fullTime: { home: number; away: number };
  };
}

interface CompactMatchRowProps {
  match: Match;
  leagueName?: string;
}

export const CompactMatchRow: React.FC<CompactMatchRowProps> = ({ match, leagueName }) => {
  const homeJP = getJapanesePlayersInTeam(match.homeTeam.name);
  const awayJP = getJapanesePlayersInTeam(match.awayTeam.name);
  const isJP = homeJP.length > 0 || awayJP.length > 0;
  const isFinished = match.status === 'FINISHED';
  
  const date = new Date(match.utcDate);
  const time = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className={`group flex items-center gap-4 py-4 px-6 border-b border-white/5 last:border-0 transition-colors ${isJP ? 'bg-neon-lime/[0.03]' : ''}`}
    >
      {/* Time/Status/League */}
      <div className="w-24 flex flex-col items-center gap-1 border-r border-white/5 pr-4 mr-2">
        <span className="text-[11px] font-black text-white/80">{time}</span>
        {leagueName && (
          <span className="text-[8px] font-black text-neon-lime/60 uppercase tracking-[0.1em] text-center line-clamp-1 max-w-full">
            {leagueName}
          </span>
        )}
        <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded ${isFinished ? 'bg-white/5 text-white/20' : 'bg-neon-lime text-black animate-pulse'}`}>
          {isFinished ? 'FIN' : 'LIVE'}
        </span>
      </div>

      {/* Teams & Score */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className="flex-1 flex items-center justify-end gap-3">
          <span className={`text-xs md:text-sm font-bold truncate ${homeJP.length > 0 ? 'text-neon-lime' : 'text-white/80'}`}>
            {translateTeamName(match.homeTeam.name)}
          </span>
          <img src={match.homeTeam.crest} alt="" className="w-6 h-6 object-contain" />
        </div>

        <div className="flex items-center justify-center min-w-[60px] h-8 bg-white/5 rounded-lg border border-white/5">
          {isFinished && match.score ? (
            <div className="flex items-center gap-2 font-black italic text-sm">
              <span className={match.score.fullTime.home > match.score.fullTime.away ? 'text-neon-lime' : ''}>
                {match.score.fullTime.home}
              </span>
              <span className="text-white/10">-</span>
              <span className={match.score.fullTime.away > match.score.fullTime.home ? 'text-neon-lime' : ''}>
                {match.score.fullTime.away}
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-black text-white/20">VS</span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-start gap-3">
          <img src={match.awayTeam.crest} alt="" className="w-6 h-6 object-contain" />
          <span className={`text-xs md:text-sm font-bold truncate ${awayJP.length > 0 ? 'text-neon-lime' : 'text-white/80'}`}>
            {translateTeamName(match.awayTeam.name)}
          </span>
        </div>
      </div>

      {/* Info Badge */}
      <div className="w-12 flex justify-end">
        {isJP ? (
          <div className="w-6 h-6 bg-neon-lime rounded-full flex items-center justify-center neon-glow">
            <Star className="w-3 h-3 text-black fill-black" />
          </div>
        ) : (
          <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-neon-lime transition-colors" />
        )}
      </div>
    </motion.div>
  );
};
