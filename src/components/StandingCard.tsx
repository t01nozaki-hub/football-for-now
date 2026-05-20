'use client';

import React from 'react';
import { translateTeamName, JAPANESE_PLAYERS_TEAMS, getJapanesePlayersInTeam, MAJOR_TEAMS } from '@/lib/football-data';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StandingTeam {
  position: number;
  team: {
    id: number;
    name: string;
    crest: string;
  };
  playedGames: number;
  points: number;
  goalDifference: number;
}

interface StandingCardProps {
  leagueName: string;
  leagueCode: string;
  standings: StandingTeam[];
}

export const StandingCard: React.FC<StandingCardProps> = ({ leagueName, leagueCode, standings }) => {

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-5 w-full flex-shrink-0 md:flex-1 transition-all hover:neon-border group"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-neon-lime font-bold text-lg tracking-tight">{leagueName}</h3>
        <span className="text-white/40 text-xs font-mono uppercase">Top 4</span>
      </div>
      
      <div className="space-y-3">
        {standings.slice(0, 4).map((team) => {
          const isJapanesePlayerTeam = JAPANESE_PLAYERS_TEAMS.includes(team.team.name);
          const jpPlayers = getJapanesePlayersInTeam(team.team.name);
          return (
            <div key={team.team.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between group/row">
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-sm font-bold ${team.position === 1 ? 'text-neon-lime' : 'text-white/40'}`}>
                    {team.position}
                  </span>
                  <img src={team.team.crest} alt={team.team.name} className="w-6 h-6 object-contain" />
                  {MAJOR_TEAMS.some(m => m.id === team.team.id.toString()) ? (
                    <Link href={`/teams/${team.team.id}/`} className="text-sm font-medium group-hover/row:text-neon-lime transition-colors hover:underline decoration-neon-lime underline-offset-4">
                      {translateTeamName(team.team.name)}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium group-hover/row:text-white/80 transition-colors">
                      {translateTeamName(team.team.name)}
                    </span>
                  )}

                  {isJapanesePlayerTeam && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-neon-lime/10 border border-neon-lime/20 rounded-full">
                      <Star className="w-3 h-3 text-neon-lime fill-neon-lime" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold w-6 text-right">{team.points}</span>
                </div>
              </div>
              {jpPlayers.length > 0 && (
                <div className="flex gap-2 pl-8">
                  {jpPlayers.map(p => (
                    <span key={p} className="text-[9px] text-white/40 font-bold">{p}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
        <Link 
          href={`/leagues/${leagueCode}/`} 
          className="text-[10px] text-white/40 hover:text-neon-lime transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
        >
          View Full Table →
        </Link>
      </div>


    </motion.div>
  );
};


