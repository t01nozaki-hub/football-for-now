import React from 'react';

interface AdPlaceholderProps {
  position: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
  return (
    <div className="ad-discreet my-8 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/10 bg-white/5">
      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Sponsored Content</span>
      <div className="w-full h-[90px] flex items-center justify-center text-white/10 text-[10px] font-mono italic">
        AD SPACE ({position})
      </div>
    </div>
  );
};
