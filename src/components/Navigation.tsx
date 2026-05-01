'use client';

import React, { useState } from 'react';
import { Search, Menu, Bell, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">
            football <span className="text-neon-lime">for now</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-white/60">
            <Link href="/" className="hover:text-neon-lime transition-colors">DASHBOARD</Link>
            <Link href="/news" className="hover:text-neon-lime transition-colors">NEWS</Link>
            <Link href="/matches" className="hover:text-neon-lime transition-colors">MATCHES</Link>
            <Link href="/stats" className="hover:text-neon-lime transition-colors">STATS</Link>
            <Link href="/teams" className="hover:text-neon-lime transition-colors">TEAMS</Link>
            <Link href="/japanese-players" className="hover:text-neon-lime transition-colors">JAPANESE</Link>
            <Link href="/guide" className="hover:text-neon-lime transition-colors">GUIDE</Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfq33u3bp1l85_CMgwbow2O81zWFOZQILfVBXSbxLiYP-_Urw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="hover:text-neon-lime transition-colors">CONTACT</a>



          </nav>

        </div>
        
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                autoFocus
                type="text"
                placeholder="Search team or player..."
                className="bg-white/10 border border-neon-lime/30 rounded-full px-4 py-1.5 text-xs focus:outline-none focus:border-neon-lime w-40 md:w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3">
                <X className="w-3.5 h-3.5 text-white/40 hover:text-white" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          <button className="hidden sm:block p-2 text-white/60 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-lime rounded-full" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-white/10 p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-lg font-black italic tracking-tight">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">DASHBOARD</Link>
            <Link href="/news" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">NEWS</Link>
            <Link href="/matches" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">MATCHES</Link>
            <Link href="/stats" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">STATS</Link>
            <Link href="/teams" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">TEAMS</Link>
            <Link href="/japanese-players" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">JAPANESE</Link>
            <Link href="/guide" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">GUIDE</Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfq33u3bp1l85_CMgwbow2O81zWFOZQILfVBXSbxLiYP-_Urw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="hover:text-neon-lime transition-colors">CONTACT</a>



          </nav>


          <div className="pt-6 border-t border-white/5">
            <button className="w-full bg-neon-lime text-black py-4 rounded-xl font-black text-center">
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-20 pb-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-6">
              football <span className="text-neon-lime">for now</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              世界最高峰の欧州サッカー情報を、どこよりも速く、美しくお届けするタイパ至上主義メディア。
              最新の順位表、試合結果、そして日本人選手の活躍を秒速でチェック。
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'YouTube'].map(s => (
                <div key={s} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-neon-lime hover:text-neon-lime transition-all cursor-pointer group">
                  <span className="text-[10px] font-black uppercase tracking-tighter group-hover:scale-110 transition-transform">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm font-bold text-white/60">
              <li><Link href="/" className="hover:text-neon-lime transition-colors">DASHBOARD</Link></li>
              <li><Link href="/teams" className="hover:text-neon-lime transition-colors">ALL TEAMS</Link></li>
              <li><Link href="/japanese-players" className="hover:text-neon-lime transition-colors">JAPANESE WARRIORS</Link></li>
              <li><Link href="/guide" className="hover:text-neon-lime transition-colors">WATCH GUIDE</Link></li>
              <li><Link href="/matches" className="hover:text-neon-lime transition-colors">MATCH SCHEDULE</Link></li>

            </ul>
          </div>


          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">Legal</h3>
            <ul className="space-y-4 text-sm font-bold text-white/60">
              <li><Link href="/legal/privacy" className="hover:text-neon-lime transition-colors">PRIVACY POLICY</Link></li>
              <li><Link href="/legal/terms" className="hover:text-neon-lime transition-colors">TERMS OF SERVICE</Link></li>
              <li><Link href="/about" className="hover:text-neon-lime transition-colors">ABOUT US</Link></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfq33u3bp1l85_CMgwbow2O81zWFOZQILfVBXSbxLiYP-_Urw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="hover:text-neon-lime transition-colors text-neon-lime">CONTACT (お問い合わせ)</a></li>

            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              © 2024 football for now. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-neon-lime rounded-full animate-pulse" />
              <p className="text-[9px] font-black text-neon-lime/60 uppercase tracking-widest">
                System Active • Last Sync: {new Date().toLocaleDateString('ja-JP')} {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest text-center md:text-right">
            DATA PROVIDED BY FOOTBALL-DATA.ORG.
          </p>
        </div>
        <p className="mt-8 text-[8px] font-medium text-white/10 text-center uppercase tracking-widest">
          football for nowは、Amazon.co.jpを宣伝しリンクすることによって紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
        </p>
      </div>
    </footer>
  );
};
