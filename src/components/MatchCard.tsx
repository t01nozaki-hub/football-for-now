'use client';

import React from 'react';
import { translateTeamName, getBroadcastChannels, getJapanesePlayersInTeam } from '@/lib/football-data';
import { Star, Tv, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReactionButtons } from './ReactionButtons';
import { getAmazonSearchUrl } from '@/lib/affiliate-config';

interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  stage?: string;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score?: {
    fullTime: { home: number; away: number };
  };
}

interface MatchCardProps {
  match: Match;
  leagueName?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, leagueName }) => {

  const homeJPPlayers = getJapanesePlayersInTeam(match.homeTeam.name);
  const awayJPPlayers = getJapanesePlayersInTeam(match.awayTeam.name);
  const isJPRelevant = homeJPPlayers.length > 0 || awayJPPlayers.length > 0;
  const isFinished = match.status === 'FINISHED';

  const date = new Date(match.utcDate);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()} (${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]})`;
  const jstTime = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  const channels = getBroadcastChannels(leagueName || '');

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`glass rounded-2xl p-6 transition-all group relative overflow-hidden ${isJPRelevant ? 'border-neon-lime/30 shadow-[0_0_20px_rgba(204,255,0,0.05)]' : 'hover:neon-border'}`}
    >
      {/* Date & League & Matchday */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-3 rounded-full ${isFinished ? 'bg-white/20' : isJPRelevant ? 'bg-neon-lime animate-pulse' : 'bg-white/20'}`} />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
              {isFinished ? 'FINISHED' : 'UPCOMING'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white">{formattedDate}</span>
            {!isFinished && <span className="text-xs font-bold text-white/40">{jstTime}</span>}
            <span className="text-[10px] font-bold text-neon-lime bg-neon-lime/10 px-1.5 py-0.5 rounded">
              {match.stage && match.stage !== 'REGULAR_SEASON' 
                ? match.stage.replace(/_/g, ' ') 
                : match.matchday ? `第${match.matchday}節` : ''}
            </span>
          </div>
        </div>
        {leagueName && (
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/40 font-mono tracking-wider">
            {leagueName}
          </span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative">
            <img src={match.homeTeam.crest} alt="" className="w-12 h-12 object-contain" />
            {homeJPPlayers.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-lime rounded-full flex items-center justify-center neon-glow">
                <Star className="w-3 h-3 text-black fill-black" />
              </div>
            )}
          </div>
          <div className="text-center">
            <span className="text-sm font-black block leading-tight mb-1">
              {translateTeamName(match.homeTeam.name)}
            </span>
            {homeJPPlayers.map(p => (
              <span key={p} className="text-[10px] text-neon-lime font-bold block">{p}</span>
            ))}
          </div>
        </div>

        {isFinished && match.score ? (
          <div className="flex flex-col items-center gap-1">
            <div className="text-3xl font-black italic tracking-tighter flex items-center gap-3">
              <span className={match.score.fullTime.home > match.score.fullTime.away ? 'text-neon-lime' : ''}>
                {match.score.fullTime.home}
              </span>
              <span className="text-white/10">-</span>
              <span className={match.score.fullTime.away > match.score.fullTime.home ? 'text-neon-lime' : ''}>
                {match.score.fullTime.away}
              </span>
            </div>
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Full Time</span>
          </div>
        ) : (
          <div className="text-white/10 font-black text-2xl italic">VS</div>
        )}

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative">
            <img src={match.awayTeam.crest} alt="" className="w-12 h-12 object-contain" />
            {awayJPPlayers.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-lime rounded-full flex items-center justify-center neon-glow">
                <Star className="w-3 h-3 text-black fill-black" />
              </div>
            )}
          </div>
          <div className="text-center">
            <span className="text-sm font-black block leading-tight mb-1">
              {translateTeamName(match.awayTeam.name)}
            </span>
            {awayJPPlayers.map(p => (
              <span key={p} className="text-[10px] text-neon-lime font-bold block">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="mb-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 mb-3 text-white/40">
          <span className="text-[10px] font-bold uppercase tracking-widest">Reactions</span>
        </div>
        <ReactionButtons matchId={match.id} />
      </div>

      {/* Broadcast Guide */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-white/60">
          <Tv className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Viewing Guide</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {channels.map((channel) => (
            <span key={channel} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/80">
              {channel}
            </span>
          ))}
        </div>
        
        <a 
          href={getAmazonSearchUrl(`${leagueName || 'サッカー'} 視聴 グッズ`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-neon-lime text-black py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group/btn"
        >
          今すぐ視聴プランをチェック
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
};


