import { Header, Footer } from '@/components/Navigation';
import { ChevronLeft, Gavel, AlertTriangle, Scale } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-6xl font-black italic mb-4 uppercase tracking-tight">Terms of <span className="text-neon-lime">Service</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">利用規約</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass rounded-3xl p-6 border border-white/5">
              <Gavel className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">基本合意</h3>
              <p className="text-xs text-white/40">当サービスを利用することで、本規約に同意したものとみなされます。</p>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/5">
              <AlertTriangle className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">禁止事項</h3>
              <p className="text-xs text-white/40">不正アクセスやデータの不適切な利用は厳格に禁止されています。</p>
            </div>
            <div className="glass rounded-3xl p-6 border border-white/5">
              <Scale className="w-6 h-6 text-neon-lime mb-4" />
              <h3 className="font-bold mb-2">免責範囲</h3>
              <p className="text-xs text-white/40">情報の正確性等に関する免責事項を事前にご確認ください。</p>
            </div>
          </div>

          <div className="glass rounded-[40px] p-8 md:p-12 border border-white/10 space-y-12 text-sm text-white/60 leading-relaxed">
            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第1条（適用）</h2>
              <p>本規約は，ユーザーと当サイトとの間の本サービスの利用に関わる一切の関係に適用されるものとします。当サイトは本サービスに関し，本規約のほか，各種の規定（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。</p>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第2条（禁止事項）</h2>
              <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
                <li>当サイト，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                <li>本サービスによって得られた情報を商業的に利用する行為</li>
                <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし，またはこれを試みる行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第3条（本サービスの提供の停止等）</h2>
              <p>当サイトは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他，当サイトが本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black italic text-white mb-4 uppercase tracking-tight">第4条（利用規約の変更）</h2>
              <p>当サイトは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。</p>
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
