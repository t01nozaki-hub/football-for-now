import { Metadata } from 'next';
import { Header, Footer } from '@/components/Navigation';
import { ChevronLeft, Info, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '当サイトについて | football for now',
  description: 'football for nowのコンセプトとビジョン。欧州サッカー情報を最速で届けるための取り組みについて。',
  alternates: {
    canonical: '/about/',
  },
};

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">About <span className="text-neon-lime">Us</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">football for now の使命とビジョン</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass rounded-3xl p-8 border border-white/5">
              <h2 className="text-xl font-black italic mb-4 flex items-center gap-2 text-neon-lime">
                <Info className="w-5 h-5" /> Our Mission
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                「今の欧州サッカーを、世界一わかりやすく」をコンセプトに、多忙な現代のサッカーファンのためのタイパ至上主義メディアを目指しています。膨大なデータの中から必要な情報だけを抽出・日本語化し、秒速でキャッチアップできる体験を提供します。
              </p>
            </div>
            <div className="glass rounded-3xl p-8 border border-white/5">
              <h2 className="text-xl font-black italic mb-4 flex items-center gap-2 text-neon-lime">
                <Globe className="w-5 h-5" /> Global Data
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                Football-Data.orgの強力なAPIを活用し、プレミアリーグ、ラ・リーガ、ブンデスリーガなどの主要リーグからリアルタイムに近いデータを取得。正確かつ迅速な情報提供に努めています。
              </p>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 border border-white/5">
            <h2 className="text-2xl font-black italic mb-8">Contact & Company</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-neon-lime mt-1" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-1">Email Support</h3>
                  <p className="text-lg font-bold">support@footballfornow.com</p>
                </div>
              </div>
              <p className="text-sm text-white/40 pt-6 border-t border-white/5">
                ※現在、お問い合わせはメールでのみ受け付けております。返信には数日いただく場合がございますのでご了承ください。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
