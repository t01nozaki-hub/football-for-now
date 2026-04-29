import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  position: string;
}

const AMAZON_ID = 'hp0d-22';
const RAKUTEN_ID = '52c51375.8b8ac17b.52c51376.24d340e2';

const ITEMS = [
  {
    name: '欧州リーグ公式ユニフォーム',
    amazon: `https://www.amazon.co.jp/s?k=欧州サッカー+ユニフォーム&tag=${AMAZON_ID}`,
    rakuten: `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F欧州サッカー%2Bユニフォーム%2F`,
    desc: '憧れのチームのユニフォームをチェック'
  },
  {
    name: '最新サッカースパイク',
    amazon: `https://www.amazon.co.jp/s?k=サッカースパイク+最新&tag=${AMAZON_ID}`,
    rakuten: `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2Fサッカースパイク%2B最新%2F`,
    desc: 'トッププレイヤー愛用のモデルを手に入れよう'
  },
  {
    name: '公式試合球・トレーニングボール',
    amazon: `https://www.amazon.co.jp/s?k=サッカーボール+5号球+公式&tag=${AMAZON_ID}`,
    rakuten: `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2Fサッカーボール%2B5号球%2B公式%2F`,
    desc: '最高峰のタッチをあなたの足元に'
  }
];

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ position }) => {
  // ポジションに応じてアイテムを変えるなどの拡張も可能
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];

  return (
    <div className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden group mb-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neon-lime/10 rounded-lg">
              <ShoppingBag className="w-4 h-4 text-neon-lime" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Gears & Apparel</span>
          </div>
          <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">PR</span>
        </div>

        <div>
          <h4 className="text-sm font-black italic tracking-tight uppercase group-hover:text-neon-lime transition-colors mb-1">
            {item.name}
          </h4>
          <p className="text-[10px] text-white/40 font-medium">
            {item.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <a 
            href={item.amazon} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#FF9900]/20 border border-white/5 hover:border-[#FF9900]/30 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            Amazonで探す
            <ExternalLink className="w-3 h-3" />
          </a>
          <a 
            href={item.rakuten} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#BF0000]/20 border border-white/5 hover:border-[#BF0000]/30 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            楽天市場で探す
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
