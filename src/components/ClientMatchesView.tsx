'use client';

import React, { useState, useMemo } from 'react';
import { CompactMatchRow } from './CompactMatchRow';
import { MatchCard } from './MatchCard';
import { JAPANESE_PLAYERS_TEAMS } from '@/lib/football-data';
import { Filter, Calendar, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientMatchesViewProps {
  initialMatches: any[];
  leagues: { code: string; name: string }[];
}

export const ClientMatchesView: React.FC<ClientMatchesViewProps> = ({ initialMatches, leagues }) => {
  const [activeTab, setActiveTab] = useState<'finished' | 'upcoming'>('finished');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredMatches = useMemo(() => {
    let filtered = initialMatches.filter(match => {
      const statusMatch = (activeTab === 'finished' && match.status === 'FINISHED') ||
                         (activeTab === 'upcoming' && match.status !== 'FINISHED');
      const leagueMatch = selectedLeague === 'all' || match.leagueName === selectedLeague;
      return statusMatch && leagueMatch;
    });

    // Sort based on tab: Results (newest first), Schedule (nearest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.utcDate).getTime();
      const dateB = new Date(b.utcDate).getTime();
      if (activeTab === 'finished') {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Nearest first
      }
    });
  }, [initialMatches, activeTab, selectedLeague]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredMatches.forEach(match => {
      const date = new Date(match.utcDate);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()} (${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]})`;
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(match);
    });
    return groups;
  }, [filteredMatches]);

  return (
    <div className="space-y-8">
      {/* Filters & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-[32px] p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'finished', label: 'Results', icon: Trophy },
            { id: 'upcoming', label: 'Schedule', icon: Calendar },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-neon-lime text-black neon-glow' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select 
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-white/60 focus:outline-none focus:border-neon-lime transition-colors"
          >
            <option value="all">All Leagues</option>
            {leagues.map(l => (
              <option key={l.code} value={l.name}>{l.name}</option>
            ))}
          </select>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/20'}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/20'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Match Display */}
      <div className="space-y-12">
        {Object.entries(groupedByDate).length > 0 ? (
          Object.entries(groupedByDate).map(([date, matches]) => (
            <section key={date} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-neon-lime/10 border border-neon-lime/20 rounded-full">
                  <Calendar className="w-3 h-3 text-neon-lime" />
                  <span className="text-[11px] font-black text-neon-lime uppercase tracking-widest">{date}</span>
                </div>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} leagueName={match.leagueName} />
                  ))}
                </div>
              ) : (
                <div className="glass rounded-[32px] overflow-hidden border border-white/5">
                  {matches.map(match => (
                    <CompactMatchRow key={match.id} match={match} leagueName={match.leagueName} />
                  ))}
                </div>
              )}
            </section>
          ))
        ) : (
          <div className="glass rounded-[32px] p-20 flex flex-col items-center justify-center text-center border border-white/5">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Filter className="w-8 h-8 text-white/10" />
            </div>
            <h3 className="text-xl font-black italic uppercase mb-2">No matches found</h3>
            <p className="text-white/40 text-sm font-medium">Try adjusting your filters or checking a different league.</p>
          </div>
        )}
      </div>
    </div>
  );
};
