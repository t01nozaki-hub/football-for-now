'use client';

import { Header, Footer } from '@/components/Navigation';

import { ChevronLeft, Mail, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">Contact <span className="text-neon-lime">Us</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">お問い合わせ・フィードバック</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="glass rounded-3xl p-8 border border-white/5">
                <Mail className="w-8 h-8 text-neon-lime mb-4" />
                <h3 className="text-sm font-black uppercase tracking-widest mb-2">Email</h3>
                <p className="text-lg font-bold">info@footballfornow.com</p>
              </div>
              <div className="glass rounded-3xl p-8 border border-white/5">
                <MessageSquare className="w-8 h-8 text-neon-lime mb-4" />
                <h3 className="text-sm font-black uppercase tracking-widest mb-2">Social</h3>
                <p className="text-lg font-bold">@football_for_now</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="glass rounded-[40px] p-8 md:p-12 border border-white/10">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-lime transition-all" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Email</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-lime transition-all" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Message</label>
                    <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-lime transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full bg-neon-lime text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:neon-glow transition-all active:scale-[0.98]">
                    <Send className="w-4 h-4" /> SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
