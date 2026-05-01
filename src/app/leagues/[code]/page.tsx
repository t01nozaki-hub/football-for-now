import { fetchStandings, fetchScorers, fetchMatches, LEAGUE_MAP, translateTeamName, LEAGUES } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { MatchCard } from '@/components/MatchCard';
import { Trophy, Target, Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return LEAGUES.map((code) => ({ code }));
}

export default async function LeaguePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  if (!code) return null;

  let standingData, scorerData, matchData;
  try {
    [standingData, scorerData, matchData] = await Promise.all([
      fetchStandings(code).catch(() => null),
      fetchScorers(code).catch(() => null),
      fetchMatches(code).catch(() => null)
    ]);
  } catch (e) {
    console.error(`Fetch failed for league ${code}:`, e);
  }

  // If even standingData failed, show the fallback
  if (!standingData) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <div className="glass rounded-3xl p-12 border border-white/5">
            <h2 className="text-2xl font-black italic uppercase mb-4 text-neon-lime">Data Syncing</h2>
            <p className="text-white/40 text-sm max-w-xs mx-auto mb-8">
              データの取得を待機しています。API制限により時間がかかる場合があります。
            </p>
            <Link href="/" className="bg-white/5 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const leagueName = LEAGUE_MAP[code] || code;
  const standings = standingData?.standings?.[0]?.table || [];
  const scorers = scorerData?.scorers || [];
  const upcomingMatches = (matchData?.matches || []).slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        {/* League Header */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-lime/5 blur-[100px] -mr-48 -mt-48" />
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 relative z-10">
            {leagueName} <span className="text-neon-lime">Table</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm relative z-10">2025-26 Season Standings</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
          {/* Main Table */}
          <div className="lg:col-span-3 space-y-12">
            <div className="glass rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/5">
                      <th className="px-6 py-5">Pos</th>
                      <th className="px-6 py-5">Club</th>
                      <th className="px-6 py-5">P</th>
                      <th className="px-6 py-5">W</th>
                      <th className="px-6 py-5">D</th>
                      <th className="px-6 py-5">L</th>
                      <th className="px-6 py-5">GD</th>
                      <th className="px-6 py-5">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {standings.map((row: any) => (
                      <tr key={row.team.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 font-mono font-bold text-white/20 group-hover:text-neon-lime">{row.position}</td>
                        <td className="px-6 py-4">
                          <Link href={`/teams/${row.team.id}`} className="flex items-center gap-4 hover:text-neon-lime transition-colors">
                            <img src={row.team.crest} alt="" className="w-6 h-6 object-contain" />
                            <span className="text-sm font-bold truncate max-w-[120px] md:max-w-none">
                              {translateTeamName(row.team.name)}
                            </span>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{row.playedGames}</td>
                        <td className="px-6 py-4 text-sm font-medium">{row.won}</td>
                        <td className="px-6 py-4 text-sm font-medium">{row.draw}</td>
                        <td className="px-6 py-4 text-sm font-medium">{row.lost}</td>
                        <td className="px-6 py-4 text-sm font-mono text-white/40">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                        <td className="px-6 py-4 text-sm font-black italic text-neon-lime">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming League Matches */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-5 h-5 text-neon-lime" />
                <h2 className="text-2xl font-black italic uppercase tracking-tight">Upcoming Fixtures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingMatches.map((match: any) => (
                  <MatchCard key={match.id} match={match} leagueName={leagueName} />
                ))}
                {upcomingMatches.length === 0 && <p className="text-white/20 italic">No matches scheduled.</p>}
              </div>
            </div>
          </div>

          {/* Scorers Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass rounded-[32px] p-8 border border-white/10 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <Target className="w-5 h-5 text-neon-lime" />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Top Scorers</h2>
              </div>
              <div className="space-y-6">
                {scorers.slice(0, 10).map((s: any, idx: number) => (
                  <div key={s.player.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black italic text-white/10 group-hover:text-neon-lime">{idx + 1}</span>
                      <div>
                        <p className="text-xs font-bold leading-tight group-hover:text-neon-lime transition-colors">{s.player.name}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/20">{translateTeamName(s.team.name)}</p>
                      </div>
                    </div>
                    <span className="text-lg font-black italic text-neon-lime group-hover:scale-110 transition-transform">{s.goals}</span>
                  </div>
                ))}
                {scorers.length === 0 && <p className="text-[10px] text-white/20 italic text-center py-10">Scorer data unavailable.</p>}
              </div>
            </div>
            
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
