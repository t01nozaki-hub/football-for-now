import { Metadata } from 'next';
import { Header, Footer } from '@/components/Navigation';
import { ChevronLeft, Shield, Lock, Eye } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | football for now',
  description: 'football for nowの個人情報保護方針。Cookieの利用や広告配信、アクセス解析ツールについての詳細。',
  alternates: {
    canonical: '/legal/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black italic mb-4 uppercase tracking-tight">Privacy <span className="text-neon-lime">Policy</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">個人情報の取扱いについて</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass rounded-3xl p-6 border border-white/5">
              <Shield className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">情報の保護</h3>
              <p className="text-xs text-white/40">最新のセキュリティ対策を講じ、不正アクセスから情報を守ります。</p>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/5">
              <Lock className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">秘密保持</h3>
              <p className="text-xs text-white/40">法令に基づく場合を除き、第三者に情報を公開することはありません。</p>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/5">
              <Eye className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">透明性</h3>
              <p className="text-xs text-white/40">情報の収集目的と利用範囲を明確にし、透明性を確保します。</p>
            </div>
          </div>

          <div className="glass rounded-[40px] p-8 md:p-12 border border-white/10 space-y-12 text-sm text-white/60 leading-relaxed">
            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第1条（個人情報の定義）</h2>
              <p>「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報（個人識別情報）を指します。</p>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第2条（個人情報の収集方法）</h2>
              <p>当サイトでは、お問い合わせやコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。これらの個人情報は、質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。</p>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第3条（広告の配信について）</h2>
              <p>当サイトは、第三者配信の広告サービス「Googleアドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。これによってユーザーのブラウザを識別できるようになりますが、個人を特定するものではありません。Cookieを無効にする設定およびGoogleアドセンスに関する詳細は「広告 – ポリシーと規約 – Google」をご覧ください。</p>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第4条（アクセス解析ツールについて）</h2>
              <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細はGoogleアナリティクスサービス利用規約のページをご覧ください。</p>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第5条（免責事項）</h2>
              <p>当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するよう努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
            </section>

            <section className="pt-12 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">制定日：2024年11月22日</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
