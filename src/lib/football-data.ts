const API_TOKEN = '74deb885ab8f42788668f23b17495d75';
const BASE_URL = 'https://api.football-data.org/v4';

import { getWithBuildCache } from './build-cache';

// Rate limit helper for Free Tier (10 requests/minute)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: any, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        console.warn(`Rate limit (429) hit for ${url}. Waiting 15s...`);
        await sleep(15000);
        continue;
      }
      if (!res.ok) {
        console.error(`API Error ${res.status}: ${res.statusText} for ${url}`);
        await sleep(5000);
        continue;
      }
      await sleep(7000); // 7s between requests
      return res.json();
    } catch (e) {
      console.error(`Fetch exception for ${url}:`, e);
      if (i === retries - 1) throw e;
      await sleep(5000);
    }
  }
  throw new Error(`Failed to fetch after ${retries} retries`);
}

export const LEAGUE_MAP: Record<string, string> = {
  'PL': 'プレミアリーグ',
  'PD': 'ラ・リーガ',
  'BL1': 'ブンデスリーガ',
  'SA': 'セリエA',
  'FL1': 'リーグ・アン',
  'CL': 'チャンピオンズリーグ',
  'EL': 'ヨーロッパリーグ',
  'DED': 'エールディヴィジ',
  'PPL': 'プリメイラ・リーガ',
  'WC': 'ワールドカップ',
};

export const LEAGUES = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'CL', 'EL', 'DED', 'PPL'];

export const getBroadcastChannels = (leagueName: string): string[] => {
  const map: Record<string, string[]> = {
    'プレミアリーグ': ['U-NEXT', 'SPOTV NOW'],
    'ラ・リーガ': ['U-NEXT', 'DAZN'],
    'ブンデスリーガ': ['スカパー！', 'ABEMA'],
    'セリエA': ['DAZN', 'SPOTV NOW'],
    'リーグ・アン': ['DAZN'],
    'ワールドカップ': ['ABEMA', 'NHK', 'テレビ朝日'],
  };
  return map[leagueName] || ['DAZN'];
};

export const JAPANESE_PLAYERS = [
  { name: 'Kaoru Mitoma', jpName: '三笘 薫', team: 'Brighton & Hove Albion FC', role: 'FW' },
  { name: 'Takefusa Kubo', jpName: '久保 建英', team: 'Real Sociedad de Fútbol', role: 'FW' },
  { name: 'Wataru Endo', jpName: '遠藤 航', team: 'Liverpool FC', role: 'MF' },
  { name: 'Takehiro Tomiyasu', jpName: '冨安 健洋', team: 'Feyenoord Rotterdam', role: 'DF' },
  { name: 'Ko Itakura', jpName: '板倉 滉', team: 'Feyenoord Rotterdam', role: 'DF' },
  { name: 'Ayase Ueda', jpName: '上田 綺世', team: 'Feyenoord Rotterdam', role: 'FW' },
  { name: 'Hiroki Ito', jpName: '伊藤 洋輝', team: 'FC Bayern München', role: 'DF' },
  { name: 'Takumi Minamino', jpName: '南野 拓実', team: 'AS Monaco FC', role: 'MF' },
  { name: 'Daichi Kamada', jpName: '鎌田 大地', team: 'Crystal Palace FC', role: 'MF' },
  { name: 'Ritsu Doan', jpName: '堂安 律', team: 'SC Freiburg', role: 'MF' },
  { name: 'Zion Suzuki', jpName: '鈴木 彩艶', team: 'Parma Calcio 1913', role: 'GK' },
  { name: 'Takuma Asano', jpName: '浅野 拓磨', team: 'RCD Mallorca', role: 'FW' },
  { name: 'Kaishu Sano', jpName: '佐野 海舟', team: '1. FSV Mainz 05', role: 'MF' },
  { name: 'Yukinari Sugawara', jpName: '菅原 由勢', team: 'Southampton FC', role: 'DF' },
  { name: 'Junya Ito', jpName: '伊東 純也', team: 'KRC Genk', role: 'FW' },
  { name: 'Keito Nakamura', jpName: '中村 敬斗', team: 'Stade de Reims', role: 'FW' },
  { name: 'Shuto Machino', jpName: '町野 修斗', team: 'Holstein Kiel', role: 'FW' },
  { name: 'Ado Onaiwu', jpName: 'オナイウ 阿道', team: 'AJ Auxerre', role: 'FW' },
  { name: 'Koji Miyoshi', jpName: '三好 康児', team: 'VfL Bochum 1848', role: 'MF' },
  { name: 'Anrie Chase', jpName: 'チェイス アンリ', team: 'VfB Stuttgart', role: 'DF' },
];

export const JAPANESE_PLAYERS_TEAMS = JAPANESE_PLAYERS.map(p => p.team);

const TEAM_NAME_MAP: Record<string, string> = {
  'Arsenal FC': 'アーセナル',
  'Manchester City FC': 'マンチェスター・シティ',
  'Liverpool FC': 'リヴァプール',
  'Aston Villa FC': 'アストン・ヴィラ',
  'Tottenham Hotspur FC': 'トッテナム',
  'Newcastle United FC': 'ニューカッスル',
  'Manchester United FC': 'マンチェスター・ユナイテッド',
  'West Ham United FC': 'ウェストハム',
  'Chelsea FC': 'チェルシー',
  'Brighton & Hove Albion FC': 'ブライトン',
  'Wolverhampton Wanderers FC': 'ウルヴァーハンプトン',
  'Fulham FC': 'フルハム',
  'AFC Bournemouth': 'ボーンマス',
  'Crystal Palace FC': 'クリスタル・パレス',
  'Everton FC': 'エヴァートン',
  'Brentford FC': 'ブレントフォード',
  'Nottingham Forest FC': 'ノッティンガム・フォレスト',
  'Luton Town FC': 'ルートン・タウン',
  'Burnley FC': 'バーンリー',
  'Sheffield United FC': 'シェフィールド・ユナイテッド',
  'Leicester City FC': 'レスター',
  'Ipswich Town FC': 'イプスウィッチ',
  'Southampton FC': 'サウサンプトン',
  'Real Madrid CF': 'レアル・マドリード',
  'FC Barcelona': 'バルセロナ',
  'Girona FC': 'ジローナ',
  'Club Atlético de Madrid': 'アトレティコ・マドリード',
  'Athletic Club': 'アスレティック・ビルバオ',
  'Real Sociedad de Fútbol': 'レアル・ソシエダ',
  'Real Betis Balompié': 'レアル・ベティス',
  'Villarreal CF': 'ビジャレアル',
  'Valencia CF': 'バレンシア',
  'Deportivo Alavés': 'アラベス',
  'CA Osasuna': 'オサスナ',
  'Getafe CF': 'ヘタフェ',
  'RC Celta de Vigo': 'セルタ',
  'Sevilla FC': 'セビージャ',
  'RCD Mallorca': 'マジョルカ',
  'UD Las Palmas': 'ラス・パルマス',
  'Rayo Vallecano de Madrid': 'ラヨ・バジェカーノ',
  'Cádiz CF': 'カディス',
  'Granada CF': 'グラナダ',
  'UD Almería': 'アルメリア',
  'Bayer 04 Leverkusen': 'レヴァークーゼン',
  'FC Bayern München': 'バイエルン',
  'VfB Stuttgart': 'シュトゥットガルト',
  'RB Leipzig': 'ライプツィヒ',
  'Borussia Dortmund': 'ドルトムント',
  'Eintracht Frankfurt': 'フランクフルト',
  'TSG 1899 Hoffenheim': 'ホッフェンハイム',
  'SC Freiburg': 'フライブルク',
  '1. FC Heidenheim 1846': 'ハイデンハイム',
  'SV Werder Bremen': 'ブレーメン',
  'FC Augsburg': 'アウクスブルク',
  'VfL Wolfsburg': 'ヴォルフスブルク',
  '1. FSV Mainz 05': 'マインツ',
  'Borussia Mönchengladbach': 'メンヒェングラートバッハ',
  '1. FC Union Berlin': 'ウニオン・ベルリン',
  'VfL Bochum 1848': 'ボーフム',
  '1. FC Köln': 'ケルン',
  'SV Darmstadt 98': 'ダルムシュタット',
  'FC Internazionale Milano': 'インテル',
  'AC Milan': 'ミラン',
  'Juventus FC': 'ユヴェントス',
  'Atalanta BC': 'アタランタ',
  'Bologna FC 1909': 'ボローニャ',
  'AS Roma': 'ローマ',
  'SS Lazio': 'ラツィオ',
  'ACF Fiorentina': 'フィオレンティーナ',
  'Torino FC': 'トリノ',
  'SSC Napoli': 'ナポリ',
  'Genoa CFC': 'ジェノア',
  'AC Monza': 'モンツァ',
  'Hellas Verona FC': 'ヴェローナ',
  'US Lecce': 'レッチェ',
  'Udinese Calcio': 'ウディネーゼ',
  'Cagliari Calcio': 'カリアリ',
  'Empoli FC': 'エンポリ',
  'Frosinone Calcio': 'フロジノーネ',
  'US Sassuolo Calcio': 'サッスオーロ',
  'US Salernitana 1919': 'サレルニターナ',
  'Paris Saint-Germain FC': 'パリ・サンジェルマン',
  'AS Monaco FC': 'モナコ',
  'Stade Brestois 29': 'ブレスト',
  'Lille OSC': 'リール',
  'OGC Nice': 'ニース',
  'Olympique Lyonnais': 'リヨン',
  'RC Lens': 'ランス',
  'Olympique de Marseille': 'マルセイユ',
  'Stade de Reims': 'ランス(Reims)',
  'Stade Rennais FC 1901': 'レンヌ',
  'Toulouse FC': 'トゥールーズ',
  'Montpellier HSC': 'モンペリエ',
  'RC Strasbourg Alsace': 'ストラスブール',
  'AJ Auxerre': 'オセール',
  'Holstein Kiel': 'ホルシュタイン・キール',
  'Parma Calcio 1913': 'パルマ',
};

export const MAJOR_TEAMS = [
  { id: '61', name: 'Arsenal FC', jpName: 'アーセナル' },
  { id: '64', name: 'Liverpool FC', jpName: 'リヴァプール' },
  { id: '65', name: 'Manchester City FC', jpName: 'マンチェスター・シティ' },
  { id: '66', name: 'Manchester United FC', jpName: 'マンチェスター・ユナイテッド' },
  { id: '73', name: 'Tottenham Hotspur FC', jpName: 'トッテナム' },
  { id: '1044', name: 'Brighton & Hove Albion FC', jpName: 'ブライトン' },
  { id: '86', name: 'Real Madrid CF', jpName: 'レアル・マドリード' },
  { id: '81', name: 'FC Barcelona', jpName: 'バルセロナ' },
  { id: '78', name: 'Club Atlético de Madrid', jpName: 'アトレティコ・マドリード' },
  { id: '354', name: 'Real Sociedad de Fútbol', jpName: 'レアル・ソシエダ' },
  { id: '5', name: 'FC Bayern München', jpName: 'バイエルン' },
  { id: '4', name: 'Borussia Dortmund', jpName: 'ドルトムント' },
  { id: '3', name: 'Bayer 04 Leverkusen', jpName: 'レヴァークーゼン' },
  { id: '108', name: 'FC Internazionale Milano', jpName: 'インテル' },
  { id: '98', name: 'AC Milan', jpName: 'ミラン' },
  { id: '109', name: 'Juventus FC', jpName: 'ユヴェントス' },
  { id: '524', name: 'Paris Saint-Germain FC', jpName: 'パリ・サンジェルマン' },
  { id: '548', name: 'AS Monaco FC', jpName: 'モナコ' },
];


export function getJapanesePlayersInTeam(teamName: string): string[] {
  return JAPANESE_PLAYERS.filter(p => p.team === teamName).map(p => p.jpName);
}

export const translateTeamName = (name: string): string => {
  if (!name) return '';
  const cleanName = name.replace(/\s(FC|CF|SSC|RC|RCD|VfL|SC|AS|VfB|AFC|UD|CA)$/, '').trim();
  return TEAM_NAME_MAP[name] || TEAM_NAME_MAP[cleanName] || name;
};

export async function fetchStandings(leagueCode: string) {
  return getWithBuildCache(`standings_${leagueCode}`, () => 
    fetchWithRetry(`${BASE_URL}/competitions/${leagueCode}/standings`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}

export async function fetchMatches(leagueCode: string, status?: string) {
  const query = status ? `?status=${status}` : '';
  return getWithBuildCache(`matches_${leagueCode}_${status || 'all'}`, () =>
    fetchWithRetry(`${BASE_URL}/competitions/${leagueCode}/matches${query}`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}

export async function fetchScorers(leagueCode: string) {
  return getWithBuildCache(`scorers_${leagueCode}`, () =>
    fetchWithRetry(`${BASE_URL}/competitions/${leagueCode}/scorers`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}

export async function fetchTeamData(teamId: string) {
  return getWithBuildCache(`team_${teamId}`, () =>
    fetchWithRetry(`${BASE_URL}/teams/${teamId}`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}

export async function fetchTeamMatches(teamId: string, status: string = 'SCHEDULED') {
  const { getWithBuildCache } = require('./build-cache');
  return getWithBuildCache(`team_matches_${teamId}_${status}`, () =>
    fetchWithRetry(`${BASE_URL}/teams/${teamId}/matches?status=${status}`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}

