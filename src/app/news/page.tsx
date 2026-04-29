import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Newspaper, Clock, TrendingUp, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const NEWS_ARTICLES = [
  {
    id: 1,
    slug: 'arsenal-cl-semi-atletico',
    title: 'アーセナル、悲願のCL制覇へ。準決勝アトレティコ戦に向け冨安健洋「準備はできている」',
    category: 'チャンピオンズリーグ',
    time: '45分前',
    image: '🔴',
    summary: '準々決勝でスポルティングを下したアーセナル。アトレティコ・マドリードとの準決勝を前に、冨安が守備の要として期待されています。'
  },
  {
    id: 2,
    slug: 'bayern-bundesliga-champions-2026',
    title: 'バイエルン・ミュンヘン、2025/26ブンデスリーガ優勝を確定。伊藤洋輝が主力としてタイトル獲得',
    category: 'ブンデスリーガ',
    time: '3時間前',
    image: '🏆',
    summary: 'シーズン終盤を待たずして王座を奪還。伊藤洋輝は安定した守備とビルドアップで、加入1年目にして優勝の立役者となりました。'
  },
  {
    id: 3,
    slug: 'bernardo-silva-city-exit-rumor',
    title: 'ベルナルド・シウバ、今季限りでマンチェスター・シティ退団か。欧州複数クラブが争奪戦へ',
    category: 'プレミアリーグ',
    time: '6時間前',
    image: '🩵',
    summary: '長年シティの中盤を支えた名手が新天地を求める模様。プレミアリーグの優勝争いの中、去就に注目が集まっています。'
  },
  {
    id: 4,
    slug: 'united-manchester-win-brentford',
    title: 'マンチェスター・U、ブレントフォードに競り勝ちCL出場権争いに踏みとどまる',
    category: 'プレミアリーグ',
    time: '9時間前',
    image: '👹',
    summary: '2-1の逆転勝利。苦戦が続く今季のユナイテッドだが、トップ4入りの可能性を繋ぐ貴重な勝ち点3を獲得。'
  },
  {
    id: 5,
    slug: 'barcelona-la-liga-lead',
    title: 'ラ・リーガ：バルセロナが首位を堅持。レアル・マドリードとの勝ち点差を維持し逃げ切り狙う',
    category: 'ラ・リーガ',
    time: '15時間前',
    image: '🇪🇸',
    summary: 'リーグ最終盤に向けて一歩も譲らないデッドヒート。バルサの若手陣が躍動し、タイトル獲得への期待が高まる。'
  }
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-neon-lime" />
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Football <span className="text-neon-lime">News</span></h1>
          </div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm">欧州サッカーの最新トピックスを凝縮</p>
        </div>

        <AdPlaceholder position="header-bottom" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {NEWS_ARTICLES.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="block">
                <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 bg-neon-lime text-black text-[9px] font-black uppercase tracking-widest rounded">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold">
                          <Clock className="w-3 h-3" />
                          {article.time}
                        </div>
                      </div>
                      <h2 className="text-xl md:text-3xl font-black italic tracking-tight mb-4 group-hover:text-neon-lime transition-colors leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                </div>
              </Link>
            ))}
          </div>


          {/* Trending Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass rounded-[32px] p-8 border border-neon-lime/20 bg-gradient-to-br from-neon-lime/5 to-transparent">
              <h3 className="text-xs font-black uppercase tracking-widest text-neon-lime mb-8 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Trending Topics
              </h3>
              <div className="space-y-6">
                {[
                  'B・シウバ シティ退団へ',
                  'CL アーセナル準決勝展望',
                  'バイエルン ブンデス優勝',
                  'ラ・リーガ 優勝争いの行方',
                ].map((topic, i) => (
                  <div key={topic} className="flex items-center gap-4 group cursor-pointer">
                    <span className="text-xl font-black italic text-white/10 group-hover:text-neon-lime transition-colors">0{i+1}</span>
                    <p className="text-sm font-bold group-hover:text-neon-lime transition-colors">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <AdPlaceholder position="content-middle" />
          </div>
        </div>

        <AdPlaceholder position="footer-top" />
      </main>

      <Footer />
    </div>
  );
}
