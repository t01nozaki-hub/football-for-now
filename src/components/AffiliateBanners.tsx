'use client';

import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { getAmazonSearchUrl, getRakutenSearchUrl } from '@/lib/affiliate-config';

export const GearsAndApparel = () => {
  const keyword = '欧州サッカー ユニフォーム 2025-26';
  
  return (
    <div className="glass rounded-[32px] p-8 border border-neon-lime/20 bg-gradient-to-br from-neon-lime/5 to-transparent relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <ShoppingBag className="w-16 h-16 text-neon-lime" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xs font-black uppercase tracking-widest text-neon-lime mb-2 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" /> Gears & Apparel
        </h3>
        <h4 className="text-xl font-black italic uppercase tracking-tight mb-4">
          最新サッカー<span className="text-neon-lime">ギア</span>をチェック
        </h4>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-8 leading-relaxed">
          推しチームのユニフォームや最新スパイクを手に入れよう。
        </p>
        
        <div className="space-y-3">
          <a 
            href={getAmazonSearchUrl(keyword)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-white/5 border border-white/10 hover:border-neon-lime/50 hover:bg-white/10 rounded-xl px-5 py-4 transition-all group/btn"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-white/80 group-hover/btn:text-white">Amazonで探す</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover/btn:text-neon-lime" />
          </a>
          <a 
            href={getRakutenSearchUrl(keyword)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full bg-white/5 border border-white/10 hover:border-neon-lime/50 hover:bg-white/10 rounded-xl px-5 py-4 transition-all group/btn"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-white/80 group-hover/btn:text-white">楽天市場で探す</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover/btn:text-neon-lime" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ViewingGearBanner = ({ leagueName }: { leagueName?: string }) => {
  const keyword = `${leagueName || 'サッカー'} 視聴 グッズ`;
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-neon-lime/30 transition-all group">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">快適な観戦環境を整える</h4>
      <div className="flex gap-3">
        <a 
          href={getAmazonSearchUrl(keyword)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-lg text-center transition-all"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Amazon</span>
        </a>
        <a 
          href={getRakutenSearchUrl(keyword)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-lg text-center transition-all"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60">楽天</span>
        </a>
      </div>
    </div>
  );
};
