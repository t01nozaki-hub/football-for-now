import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { translateTeamName, getJapanesePlayersInTeam, JAPANESE_PLAYERS, fetchTeamData, fetchTeamMatches } from '@/lib/football-data';
import { ChevronLeft, Users, Calendar, Trophy, Star, ExternalLink } from 'lucide-react';

import Link from 'next/link';

export async function generateStaticParams() {
  // 主要リーグの主要チームIDおよび日本人所属チームを網羅
  const teamIds = [
    '57', '61', '64', '65', '66', '73', '1044', '328', '338', '340', // PL: Arsenal, Chelsea, Liverpool, ManCity, ManUtd, Spurs, Brighton, Burnley, Leicester, Southampton
    '86', '81', '78', '354', '298', '94', // PD: Real Madrid, Barca, Atletico, Sociedad, Girona, Villarreal
    '5', '4', '3', '721', '503', '28', '19', '18', '17', '16', // BL1: Bayern, Dortmund, Leverkusen, Leipzig, Freiburg, Werder, Frankfurt, Gladbach, Freiburg, Mainz
    '108', '98', '109', '113', '110', '115', '455', // SA: Inter, Milan, Juve, Napoli, Lazio, Roma, Parma
    '524', '548', '523', '516', '521', '512', '529', '547', // FL1: PSG, Monaco, Lyon, Marseille, Lille, Brest, Rennes, Reims
    '675', '678', '674', '682', // DED: Feyenoord, Ajax, PSV, AZ
    '498', '503', '495', // PPL: Sporting, Porto, Benfica
    '568', '562', '563', // Belgium: Genk, Anderlecht, Club Brugge
  ];
  return teamIds.map((id) => ({ id }));
}

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id || id === 'undefined') return null;

  let team, upcomingMatches, recentMatches;
  
  try {
    const [teamData, upcomingData, recentData] = await Promise.all([
      fetchTeamData(id),
      fetchTeamMatches(id, 'SCHEDULED'),
      fetchTeamMatches(id, 'FINISHED')
    ]);
    team = teamData;
    upcomingMatches = upcomingData;
    recentMatches = recentData;
  } catch (e) {
    console.error(`Team fetch failed for ${id}:`, e);
    // ... error UI
  }

  if (!team) return null; // Safety

  const jpPlayers = getJapanesePlayersInTeam(team.name);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        {/* Team Header */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-lime/5 blur-[100px] -mr-48 -mt-48" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <img src={team.crest} alt="" className="w-32 h-32 md:w-48 md:h-48 object-contain" />
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full text-white/60">
                  {team.runningCompetitions[0]?.name || 'League'}
                </span>
                {jpPlayers.length > 0 && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-neon-lime text-black rounded-full">
                    🇯🇵 日本人選手所属
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">
                {translateTeamName(team.name)}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/40 text-sm font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Trophy className="w-4 h-4" /> Founded: {team.founded}</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Venue: {team.venue}</span>
              </div>
            </div>
          </div>
        </div>

        <AdPlaceholder position="header-bottom" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Matches Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Upcoming */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-neon-lime" />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Upcoming</h2>
              </div>
              <div className="space-y-4">
                {upcomingMatches.matches.slice(0, 3).map((match: any) => (
                  <div key={match.id} className="glass rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                    <span className="text-[10px] text-white/40 font-bold block mb-2">
                      {new Date(match.utcDate).toLocaleDateString('ja-JP')}
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold truncate">{translateTeamName(match.homeTeam.name)}</span>
                      <span className="text-[10px] font-black text-white/20 italic">VS</span>
                      <span className="text-sm font-bold truncate text-right">{translateTeamName(match.awayTeam.name)}</span>
                    </div>
                  </div>
                ))}
                {upcomingMatches.matches.length === 0 && <p className="text-white/20 text-sm italic">No scheduled matches</p>}
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <div className="flex items-center gap-3 mb-6 pt-8 border-t border-white/5">
                <Trophy className="w-5 h-5 text-neon-lime" />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Recent Results</h2>
              </div>
              <div className="space-y-4">
                {(recentMatches.matches || []).reverse().slice(0, 3).map((match: any) => (
                  <div key={match.id} className="glass rounded-2xl p-4 border border-white/5 bg-white/5">
                    <span className="text-[10px] text-white/40 font-bold block mb-2">
                      {new Date(match.utcDate).toLocaleDateString('ja-JP')}
                    </span>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold truncate flex-1">{translateTeamName(match.homeTeam.name)}</span>
                      <div className="px-3 py-1 bg-black rounded text-sm font-black italic text-neon-lime">
                        {match.score.fullTime.home} - {match.score.fullTime.away}
                      </div>
                      <span className="text-xs font-bold truncate flex-1 text-right">{translateTeamName(match.awayTeam.name)}</span>
                    </div>
                  </div>
                ))}
                {(!recentMatches.matches || recentMatches.matches.length === 0) && <p className="text-white/20 text-sm italic">No recent results</p>}
              </div>
            </div>
          </div>

          {/* Squad List */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-neon-lime" />
              <h2 className="text-xl font-black italic uppercase tracking-tight">Squad</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.squad.map((player: any) => {
                const isJP = JAPANESE_PLAYERS.some(p => p.name === player.name);
                return (
                  <div key={player.id} className={`glass rounded-2xl p-4 flex items-center justify-between border ${isJP ? 'border-neon-lime/30' : 'border-white/5'}`}>
                    <div>
                      <span className="text-xs font-bold block mb-0.5">{player.name}</span>
                      <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">{player.position}</span>
                    </div>
                    {isJP && (
                      <div className="w-6 h-6 bg-neon-lime rounded-full flex items-center justify-center">
                        <Star className="w-3.5 h-3.5 text-black fill-black" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-white/20">{player.nationality}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* Affiliate / Goods Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-6 bg-neon-lime" />
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Official Goods</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '2024-25 Home Jersey', price: '¥14,500', icon: '👕' },
              { name: 'Official Team Scarf', price: '¥3,200', icon: '🧣' },
              { name: 'Training Jacket', price: '¥11,000', icon: '🧥' },
            ].map(item => (
              <div key={item.name} className="glass rounded-3xl p-6 border border-white/5 flex items-center gap-6 group cursor-pointer hover:border-neon-lime/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">{item.name}</h4>
                  <p className="text-neon-lime font-black text-lg italic">{item.price}</p>
                  <div className="flex items-center gap-1 mt-2 text-[8px] font-black uppercase tracking-widest text-white/20">
                    Amazon.co.jp <ExternalLink className="w-2 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdPlaceholder position="footer-top" />
      </main>

      <Footer />
    </div>
  );
}

