import { Header, Footer } from '@/components/Navigation';
import { Tv, ExternalLink, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const BROADCAST_SERVICES = [
  {
    name: 'U-NEXT',
    leagues: ['プレミアリーグ', 'ラ・リーガ'],
    description: 'プレミアリーグ全試合を独占生配信。サッカーパックで視聴可能。',
    price: '月額 2,189円 + サッカーパック',
    features: ['4K配信対応', '見逃し配信', '雑誌読み放題'],
    link: 'https://video.unext.jp/lp/soccer'
  },
  {
    name: 'WOWOW',
    leagues: ['チャンピオンズリーグ', 'ヨーロッパリーグ'],
    description: 'CL・ELの全試合を独占生中継。欧州最高峰の戦いを余すことなく。',
    price: '月額 2,530円',
    features: ['全試合ライブ配信', 'アーカイブ視聴', 'オリジナル特番'],
    link: 'https://www.wowow.co.jp/sports/clel/'
  },
  {
    name: 'DAZN',
    leagues: ['ラ・リーガ', 'セリエA', 'リーグ・アン', 'ベルギーリーグ'],
    description: '欧州サッカーからJリーグまで幅広く網羅。',
    price: '月額 4,200円 (DAZN Standard)',
    features: ['Jリーグ全試合', '内田篤人のFOOTBALL TIME', '複数デバイス対応'],
    link: 'https://www.dazn.com/'
  }
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-neon-lime" />
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Watch <span className="text-neon-lime">Guide</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">2025-26 欧州サッカー視聴方法まとめ</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {BROADCAST_SERVICES.map((service) => (
            <div key={service.name} className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Tv className="w-24 h-24 text-neon-lime" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black italic tracking-tight">{service.name}</h2>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-neon-lime border border-neon-lime/20">
                    RECOMMENDED
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.leagues.map(l => (
                    <span key={l} className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white/60">
                      {l}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-white/80 mb-8 leading-relaxed font-medium">
                  {service.description}
                </p>

                <div className="space-y-3 mb-10">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-white/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 w-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-1">Pricing</span>
                    <span className="text-lg font-black italic">{service.price}</span>
                  </div>
                  <Link 
                    href={service.link} 
                    target="_blank"
                    className="w-full sm:w-auto bg-neon-lime text-black px-8 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:neon-glow transition-all active:scale-95"
                  >
                    公式サイトで詳細を見る <ExternalLink className="w-3.5 h-3.5" />
                  </Link>


                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="glass rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl font-black italic mb-8 uppercase tracking-tight">視聴プランの選び方</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-neon-lime font-black text-lg">プレミアリーグ中心</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                プレミアリーグを全試合観るならU-NEXT一択です。SPOTV NOWとの提携により、世界最高峰のリーグを最高画質で楽しめます。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-neon-lime font-black text-lg">幅広く観たい</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                ラ・リーガ、セリエA、リーグ・アンに加えJリーグも観るならDAZNが最適。複数のリーグを並行して追いかけるファンにおすすめ。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-neon-lime font-black text-lg">コストを抑えたい</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                ABEMAなら一部の注目試合を無料で視聴可能。まずは無料で雰囲気を楽しみ、重要な試合だけプレミアムで観るスタイルも。
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
