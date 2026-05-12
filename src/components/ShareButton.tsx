'use client';

import { Share2 } from 'lucide-react';

export const ShareButton = ({ title, url }: { title: string; url?: string }) => {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch (err) {
        // Cancelled or failed
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('リンクをコピーしました！');
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group flex items-center gap-2"
    >
      <Share2 className="w-4 h-4 text-white/60 group-hover:text-neon-lime" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white">Share</span>
    </button>
  );
};
