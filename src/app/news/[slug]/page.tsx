import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { Newspaper, Clock, TrendingUp, ChevronLeft, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';

const NEWS_ARTICLES = [
  {
    id: 1,
    slug: 'arsenal-cl-semi-atletico',
    title: 'アーセナル、悲願のCL制覇へ。準決勝アトレティコ戦に向け冨安健洋「準備はできている」',
    category: 'チャンピオンズリーグ',
    time: '45分前',
    image: '🔴',
    content: `
      プレミアリーグの雄、アーセナルがいよいよ悲願の欧州制覇に向けて最終局面を迎えようとしています。
      
      準々決勝で難敵スポルティングCPを退けたガナーズ。準決勝の相手は、鉄壁の守備を誇るシメオネ監督率いるアトレティコ・マドリードです。
      
      この大一番に向けて、守備のマルチロールとして絶大な信頼を得ている冨安健洋は「相手の守備を崩すのは容易ではないが、自分たちのフットボールを信じている。個人的にもコンディションは最高で、いつでもいける準備はできている」と力強く語りました。
      
      アルテタ監督も「トミの存在はチームに規律と安定感をもたらす。彼のような選手がこの大舞台で必要だ」と絶賛。ロンドンにCLトロフィーを持ち帰ることができるか、世界中の注目が集まっています。
    `
  },
  {
    id: 2,
    slug: 'bayern-bundesliga-champions-2026',
    title: 'バイエルン・ミュンヘン、2025/26ブンデスリーガ優勝を確定。伊藤洋輝が主力としてタイトル獲得',
    category: 'ブンデスリーガ',
    time: '3時間前',
    image: '🏆',
    content: `
      ドイツ・ブンデスリーガの絶対王者バイエルン・ミュンヘンが、2025/26シーズンの王者に輝きました。
      
      リーグ終盤戦を残しての早々の優勝決定。今季のバイエルンを支えたのは、新加入ながら最終ラインの柱となった伊藤洋輝です。
      
      左サイドバックとセンターバックをハイレベルにこなし、全試合を通じて安定したパフォーマンスを維持。ドイツメディアは「イトウの獲得は今季のバイエルンにとって最高の補強だった。彼の冷静なビルドアップがチームにリズムをもたらした」と絶賛しています。
      
      伊藤にとっては欧州移籍後初の主要タイトル獲得。CL準決勝進出も決めており、歴史的な2冠達成に向けてさらなる飛躍が期待されます。
    `
  },
  {
    id: 3,
    slug: 'bernardo-silva-city-exit-rumor',
    title: 'ベルナルド・シウバ、今季限りでマンチェスター・シティ退団か。欧州複数クラブが争奪戦へ',
    category: 'プレミアリーグ',
    time: '6時間前',
    image: '🩵',
    content: `
      マンチェスター・シティの中盤の魔術師、ベルナルド・シウバに退団の噂が浮上しています。
      
      複数の報道によると、シウバは今シーズン終了後に新たな挑戦を求めてクラブを離れる意向を固めているとのこと。バルセロナやパリ・サンジェルマンなど、欧州のビッグクラブが獲得に向けて既に動き出していると報じられています。
      
      グアルディオラ監督は「彼は代えのきかない選手だが、選手の意思も尊重したい」とコメント。シティの黄金時代を支えた功労者の去就は、今夏の移籍市場における最大の焦点となりそうです。
    `
  }
];

export async function generateStaticParams() {
  return NEWS_ARTICLES.map(article => ({
    slug: article.slug
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find(a => a.slug === slug) || NEWS_ARTICLES[0]; 

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/news" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to News Feed</span>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-neon-lime text-black text-xs font-black uppercase tracking-widest rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                {article.time}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-8 leading-[0.95]">
              {article.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                  ✍️
                </div>
                <div>
                  <p className="text-xs font-bold">Editorial Staff</p>
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">football for now</p>
                </div>
              </div>
              <button className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          <AdPlaceholder position="header-bottom" />

          {/* Featured Image - Only show if it's a real image path/url or specifically requested */}
          {article.image && !['🔴', '🏆', '🩵'].includes(article.image) && (
            <div className="w-full aspect-video rounded-[40px] bg-white/5 border border-white/10 mb-12 overflow-hidden">
              <img src={article.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="glass rounded-[40px] p-8 md:p-16 border border-white/5 mb-20">
            <div className="prose prose-invert max-w-none">
              {article.content.split('\n').map((line, i) => (
                <p key={i} className="text-lg text-white/80 leading-relaxed font-medium mb-6">
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>

          <AdPlaceholder position="footer-top" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
