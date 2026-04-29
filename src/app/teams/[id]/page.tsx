import { fetchTeamData, fetchTeamMatches, translateTeamName, getJapanesePlayersInTeam, MAJOR_TEAMS } from '@/lib/football-data';
import { Header, Footer } from '@/components/Navigation';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { MatchCard } from '@/components/MatchCard';
import { Shield, Users, Calendar, Trophy, ChevronLeft, Star, Globe } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return MAJOR_TEAMS.map((team) => ({
    id: team.id,
  }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: teamId } = await params;
  
  let team: any = null;
  let matches: any = null;
  let finishedMatches: any = null;

  try {
    team = await fetchTeamData(teamId);
    matches = await fetchTeamMatches(teamId, 'SCHEDULED');
    finishedMatches = await fetchTeamMatches(teamId, 'FINISHED');
  } catch (e) {
    console.error(e);
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-black italic mb-4">TEAM NOT FOUND</h2>
            <Link href="/teams" className="text-neon-lime font-bold uppercase tracking-widest text-xs hover:underline">
              Back to Directory
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jpPlayers = getJapanesePlayersInTeam(team.name);
  const upcoming = matches?.matches || [];
  const results = (finishedMatches?.matches || []).reverse().slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-lime selection:text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link href="/teams" className="flex items-center gap-2 text-white/40 hover:text-neon-lime transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Club Directory</span>
        </Link>

        {/* Hero Section */}
        <div className="glass rounded-[40px] p-8 md:p-12 mb-12 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-lime/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-3xl border border-white/10 p-6 flex items-center justify-center shadow-2xl">
              <img src={team.crest} alt={team.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {team.runningCompetitions?.map((comp: any) => (
                  <span key={comp.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40">
                    {comp.name}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 leading-none">
                {translateTeamName(team.name)}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-6 text-white/40">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  <Shield className="w-4 h-4 text-neon-lime" />
                  Founded in {team.founded || 'N/A'}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neon-lime">
                  <Globe className="w-4 h-4" />
                  {team.area?.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Squad Section */}
          <div className="lg:col-span-2 space-y-8">
            <section className="glass rounded-[32px] p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-6 h-6 text-neon-lime" />
                <h2 className="text-2xl font-black italic tracking-tight uppercase">Current <span className="text-neon-lime">Squad</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.squad?.length > 0 ? (
                  team.squad.map((player: any) => {
                    const isJP = jpPlayers.includes(player.name) || (player.nationality === 'Japan');
                    return (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm ${isJP ? 'bg-neon-lime/20 border border-neon-lime/30' : ''}`}>
                            {isJP ? '🇯🇵' : player.position?.charAt(0) || '?'}
                          </div>
                          <div>
                            <span className={`text-sm font-bold block leading-tight ${isJP ? 'text-neon-lime' : ''}`}>
                              {player.name}
                            </span>
                            <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                              {player.position || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        {isJP && <Star className="w-3 h-3 text-neon-lime fill-neon-lime" />}
                        <span className="text-[10px] font-mono text-white/10">{player.nationality}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-white/20 text-xs font-bold uppercase tracking-widest col-span-2 py-8 text-center">Squad information unavailable</p>
                )}
              </div>
            </section>
          </div>

          {/* Matches Sidebar */}
          <div className="space-y-8">
            <section className="glass rounded-[32px] p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-neon-lime" />
                <h2 className="text-xl font-black italic tracking-tight uppercase">Next <span className="text-neon-lime">Match</span></h2>
              </div>
              {upcoming.length > 0 ? (
                <MatchCard match={upcoming[0]} />
              ) : (
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No scheduled matches</p>
                </div>
              )}
            </section>

            <section className="glass rounded-[32px] p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="w-6 h-6 text-neon-lime" />
                <h2 className="text-xl font-black italic tracking-tight uppercase">Recent <span className="text-neon-lime">Results</span></h2>
              </div>
              <div className="space-y-4">
                {results.length > 0 ? (
                  results.map((match: any) => (
                    <MatchCard key={match.id} match={match} />
                  ))
                ) : (
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 text-center py-4">No recent results</p>
                )}
              </div>
            </section>

            <AdPlaceholder position="sidebar-bottom" />
          </div>
        </div>

        <AdPlaceholder position="footer-top" />
      </main>

      <Footer />
    </div>
  );
}
