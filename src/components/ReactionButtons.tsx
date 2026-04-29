'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface ReactionButtonsProps {
  matchId: number;
}

const REACTION_TYPES = [
  { emoji: '🔥', label: '熱い', color: 'bg-orange-500' },
  { emoji: '👏', label: '最高', color: 'bg-blue-500' },
  { emoji: '😲', label: '衝撃', color: 'bg-purple-500' },
];

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ matchId }) => {
  const [counts, setCounts] = useState<Record<string, number>>({ '🔥': 0, '👏': 0, '😲': 0 });
  const [lastReaction, setLastReaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      const { data, error } = await supabase
        .from('reactions')
        .select('emoji, count')
        .eq('match_id', matchId);

      if (data && !error) {
        const newCounts = { '🔥': 0, '👏': 0, '😲': 0 };
        data.forEach(row => {
          if (newCounts.hasOwnProperty(row.emoji)) {
            newCounts[row.emoji as keyof typeof newCounts] = row.count;
          }
        });
        setCounts(newCounts);
      }
    };

    fetchReactions();
  }, [matchId]);

  const handleReaction = async (emoji: string) => {
    setCounts(prev => ({ ...prev, [emoji]: prev[emoji] + 1 }));
    setLastReaction(emoji);
    setTimeout(() => setLastReaction(null), 1000);

    // Upsert count in Supabase
    const { data: existing } = await supabase
      .from('reactions')
      .select('count')
      .eq('match_id', matchId)
      .eq('emoji', emoji)
      .single();

    if (existing) {
      await supabase
        .from('reactions')
        .update({ count: existing.count + 1 })
        .eq('match_id', matchId)
        .eq('emoji', emoji);
    } else {
      await supabase
        .from('reactions')
        .insert({ match_id: matchId, emoji, count: 1 });
    }
  };


  return (
    <div className="flex items-center gap-3 mt-4">
      {REACTION_TYPES.map((type) => (
        <button
          key={type.emoji}
          onClick={() => handleReaction(type.emoji)}
          className="flex flex-col items-center gap-1 group relative"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-white/30 transition-all hover:scale-105 active:scale-95">
            <span className="text-sm">{type.emoji}</span>
            <span className="text-[10px] font-mono font-bold text-white/60 group-hover:text-white transition-colors">
              {counts[type.emoji]}
            </span>
          </div>
          
          <AnimatePresence>
            {lastReaction === type.emoji && (
              <motion.span
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -30, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute text-sm pointer-events-none"
              >
                {type.emoji}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};
