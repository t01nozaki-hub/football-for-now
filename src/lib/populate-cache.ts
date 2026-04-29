import { fetchStandings, fetchScorers, fetchMatches, fetchTeamData, fetchTeamMatches, LEAGUES } from './football-data';

const TEAM_IDS = [
  '57', '61', '64', '65', '66', '73', '1044', '328', '338', '340',
  '86', '81', '78', '354', '298', '94',
  '5', '4', '3', '721', '503', '28', '19', '18', '17', '16',
  '108', '98', '109', '113', '110', '115', '455',
  '524', '548', '523', '516', '521', '512', '529', '547',
  '675', '678', '674', '682',
  '498', '495',
  '568', '562', '563'
];

async function populate() {
  console.log('Starting cache population...');
  
  // 1. Leagues
  for (const code of LEAGUES) {
    console.log(`Fetching league: ${code}`);
    await fetchStandings(code).catch(e => console.error(e));
    await fetchScorers(code).catch(e => console.error(e));
    await fetchMatches(code).catch(e => console.error(e));
  }

  // 2. Teams
  for (const id of TEAM_IDS) {
    console.log(`Fetching team: ${id}`);
    await fetchTeamData(id).catch(e => console.error(e));
    await fetchTeamMatches(id, 'SCHEDULED').catch(e => console.error(e));
    await fetchTeamMatches(id, 'FINISHED').catch(e => console.error(e));
  }

  console.log('Cache population finished.');
}

populate();
