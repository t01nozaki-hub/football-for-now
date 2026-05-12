const API_TOKEN = process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN || '';
const BASE_URL = 'https://api.football-data.org/v4';

import { getWithBuildCache } from './build-cache';

// Rate limit helper for Free Tier (10 requests/minute)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: any, retries = 10) {
  if (!API_TOKEN) {
    throw new Error(`API Token is missing for ${url}`);
  }
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        console.warn(`Rate limit (429) hit for ${url}. Waiting 30s...`);
        await sleep(30000);
        continue;
      }
      if (!res.ok) {
        console.error(`API Error ${res.status}: ${res.statusText} for ${url}`);
        await sleep(5000);
        continue;
      }
      return res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(2000);
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
  'PPL': 'プリメイラ・リーガ',
  'DED': 'エールディヴィジ',
  'CL': 'チャンピオンズリーグ',
  'EC': 'ヨーロッパ選手権',
};

export const LEAGUES = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'PPL', 'DED', 'CL', 'EC'];

export const getBroadcastChannels = (leagueName: string): string[] => {
  const map: Record<string, string[]> = {
    'プレミアリーグ': ['U-NEXT', 'SPOTV NOW'],
    'ラ・リーガ': ['U-NEXT', 'DAZN'],
    'ブンデスリーガ': ['スカパー！', 'ABEMA'],
    'セリエA': ['DAZN', 'SPOTV NOW'],
    'リーグ・アン': ['DAZN'],
    'プリメイラ・リーガ': ['DAZN'],
    'エールディヴィジ': ['Hulu', 'MEXT'],
    'ワールドカップ': ['ABEMA', 'NHK', 'テレビ朝日'],
  };
  return map[leagueName] || ['DAZN'];
};

export const JAPANESE_PLAYERS = [
  { name: 'Kaoru Mitoma', jpName: '三笘 薫', team: 'Brighton & Hove Albion FC', role: 'FW' },
  { name: 'Takefusa Kubo', jpName: '久保 建英', team: 'Real Sociedad de Fútbol', role: 'FW' },
  { name: 'Wataru Endo', jpName: '遠藤 航', team: 'Liverpool FC', role: 'MF' },
  { name: 'Takehiro Tomiyasu', jpName: '冨安 健洋', team: 'Arsenal FC', role: 'DF' },
  { name: 'Ko Itakura', jpName: '板倉 滉', team: 'AFC Ajax', role: 'DF' },
  { name: 'Ayase Ueda', jpName: '上田 綺世', team: 'Feyenoord Rotterdam', role: 'FW' },
  { name: 'Hiroki Ito', jpName: '伊藤 洋輝', team: 'FC Bayern München', role: 'DF' },
  { name: 'Ritsu Doan', jpName: '堂安 律', team: 'Eintracht Frankfurt', role: 'MF' },
  { name: 'Takumi Minamino', jpName: '南野 拓実', team: 'AS Monaco FC', role: 'MF' },
  { name: 'Daichi Kamada', jpName: '鎌田 大地', team: 'Crystal Palace FC', role: 'MF' },
  { name: 'Reo Hatate', jpName: '旗手 怜央', team: 'Celtic FC', role: 'MF' },
  { name: 'Kyogo Furuhashi', jpName: '古橋 亨梧', team: 'Birmingham City FC', role: 'FW' },
  { name: 'Daizen Maeda', jpName: '前田 大然', team: 'Celtic FC', role: 'FW' },
  { name: 'Hidemasa Morita', jpName: '守田 英正', team: 'Sporting CP', role: 'MF' },
  { name: 'Koki Machida', jpName: '町田 浩樹', team: 'TSG 1899 Hoffenheim', role: 'DF' },
  { name: 'Keito Nakamura', jpName: '中村 敬斗', team: 'Stade de Reims', role: 'FW' },
  { name: 'Junya Ito', jpName: '伊東 純也', team: 'KRC Genk', role: 'FW' },
  { name: 'Yukinari Sugawara', jpName: '菅原 由勢', team: 'SV Werder Bremen', role: 'DF' },
  { name: 'Koki Ogawa', jpName: '小川 航基', team: 'NEC Nijmegen', role: 'FW' },
  { name: 'Yuki Ohashi', jpName: '大橋 祐紀', team: 'Blackburn Rovers FC', role: 'FW' },
  { name: 'Shogo Taniguchi', jpName: '谷口 彰悟', team: 'Sint-Truidense VV', role: 'DF' },
  { name: 'Zion Suzuki', jpName: '鈴木 彩艶', team: 'Parma Calcio 1913', role: 'GK' },
  { name: 'Koki Saito', jpName: '斉藤 光毅', team: 'Queens Park Rangers FC', role: 'FW' },
  { name: 'Yuito Suzuki', jpName: '鈴木 唯人', team: 'SC Freiburg', role: 'MF' },
  { name: 'Shunsuke Mito', jpName: '三戸 舜介', team: 'Sparta Rotterdam', role: 'MF' },
  { name: 'Joel Chima Fujita', jpName: '藤田 譲瑠チマ', team: 'FC St. Pauli', role: 'MF' },
  { name: 'Kota Takai', jpName: '高井 幸大', team: 'VfL Borussia Mönchengladbach', role: 'DF' },
  { name: 'Kaishu Sano', jpName: '佐野 海舟', team: '1. FSV Mainz 05', role: 'MF' },
  { name: 'Sota Kawasaki', jpName: '川崎 颯太', team: '1. FSV Mainz 05', role: 'MF' },
  { name: 'Shuto Machino', jpName: '町野 修斗', team: 'VfL Borussia Mönchengladbach', role: 'FW' },
  { name: 'Ryotaro Ito', jpName: '伊藤 涼太郎', team: 'Sint-Truidense VV', role: 'MF' },
  { name: 'Tatsuhiro Sakamoto', jpName: '坂元 達裕', team: 'Coventry City FC', role: 'MF' },
  { name: 'Yu Hirakawa', jpName: '平河 悠', team: 'Hull City AFC', role: 'FW' },
  { name: 'Ryoya Morishita', jpName: '森下 龍矢', team: 'Blackburn Rovers FC', role: 'DF' },
  { name: 'Tomoki Iwata', jpName: '岩田 智輝', team: 'Birmingham City FC', role: 'MF' },
  { name: 'Kanya Fujimoto', jpName: '藤本 寛也', team: 'Birmingham City FC', role: 'MF' },
  { name: 'Takuma Asano', jpName: '浅野 拓磨', team: 'RCD Mallorca', role: 'FW' },
  { name: 'Anrie Chase', jpName: 'チェイス アンリ', team: 'VfB Stuttgart', role: 'DF' },
  { name: 'Kodai Sano', jpName: '佐野 航大', team: 'NEC Nijmegen', role: 'MF' },
  { name: 'Daiki Hashioka', jpName: '橋岡 大樹', team: 'Luton Town FC', role: 'DF' },
  { name: 'Koji Miyoshi', jpName: '三好 康児', team: 'Birmingham City FC', role: 'MF' },
  { name: 'Shunya Shiozawa', jpName: '塩澤 隼也', team: 'KV Kortrijk', role: 'MF' },
  { name: 'Taiki Yamada', jpName: '山田 大樹', team: 'SV Darmstadt 98', role: 'GK' },
  { name: 'Hayao Kawabe', jpName: '川辺 駿', team: 'Olympique Lyonnais', role: 'MF' },
  { name: 'Shuto Machino', jpName: '町野 修斗', team: 'Holstein Kiel', role: 'FW' },
  { name: 'Yuito Suzuki', jpName: '鈴木 唯人', team: 'SC Freiburg', role: 'FW' },
  { name: 'Joel Chima Fujita', jpName: '藤田 譲瑠チマ', team: 'FC St. Pauli', role: 'MF' },
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
  'Real Madrid CF': 'レアル・マドリード',
  'FC Barcelona': 'バルセロナ',
  'Girona FC': 'ジローナ',
  'Club Atlético de Madrid': 'アトレティコ・マドリード',
  'Athletic Club': 'アスレティック・ビルバオ',
  'Real Sociedad de Fútbol': 'レアル・ソシエダ',
  'Real Betis Balompié': 'ベティス',
  'Valencia CF': 'バレンシア',
  'Villarreal CF': 'ビジャレアル',
  'Getafe CF': 'ヘタフェ',
  'CA Osasuna': 'オサスナ',
  'UD Las Palmas': 'ラス・パルマス',
  'Deportivo Alavés': 'アラベス',
  'Sevilla FC': 'セビージャ',
  'RCD Mallorca': 'マジョルカ',
  'Rayo Vallecano de Madrid': 'ラージョ・バジェカーノ',
  'Celta de Vigo': 'セルタ',
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
  'FC Augsburg': 'アウクスブルク',
  'SV Werder Bremen': 'ブレーメン',
  '1. FC Heidenheim 1846': 'ハイデンハイム',
  'VfL Borussia Mönchengladbach': 'メンヒェングラートバッハ',
  'VfL Wolfsburg': 'ヴォルフスブルク',
  '1. FC Union Berlin': 'ウニオン・ベルリン',
  'VfL Bochum 1848': 'ボーフム',
  '1. FSV Mainz 05': 'マインツ',
  '1. FC Köln': 'ケルン',
  'SV Darmstadt 98': 'ダルムシュタット',
  'FC Internazionale Milano': 'インテル',
  'AC Milan': 'ミラン',
  'Juventus FC': 'ユヴェントス',
  'Bologna FC 1909': 'ボローニャ',
  'AS Roma': 'ローマ',
  'Atalanta BC': 'アタランタ',
  'SS Lazio': 'ラツィオ',
  'SSC Napoli': 'ナポリ',
  'ACF Fiorentina': 'フィオレンティーナ',
  'Torino FC': 'トリノ',
  'AC Monza': 'モンツァ',
  'Genoa CFC': 'ジェノア',
  'US Lecce': 'レッチェ',
  'Hellas Verona FC': 'ヴェローナ',
  'Udinese Calcio': 'ウディネーゼ',
  'Cagliari Calcio': 'カリアリ',
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
  'SL Benfica': 'ベンフィカ',
  'FC Porto': 'ポルト',
  'Sporting CP': 'スポルティング',
  'AFC Ajax': 'アヤックス',
  'PSV': 'PSV',
  'Feyenoord Rotterdam': 'フェイエノールト',
  'Royale Union Saint-Gilloise': 'サン=ジロワーズ',
  'Birmingham City FC': 'バーミンガム',
  'Southampton FC': 'サウサンプトン',
  'NEC Nijmegen': 'NECナイメヘン',
  'Blackburn Rovers FC': 'ブラックバーン',
  'Sint-Truidense VV': 'シント=トロイデン',
  'KRC Genk': 'ヘンク',
  'Queens Park Rangers FC': 'QPR',
  'Sparta Rotterdam': 'スパルタ・ロッテルダム',
  'FC St. Pauli': 'ザンクトパウリ',
  'Coventry City FC': 'コヴェントリー',
  'Hull City AFC': 'ハル・シティ',
  'KV Kortrijk': 'コルトレイク',
};

export const MAJOR_TEAMS = [
  { id: '61', name: 'Arsenal FC', jpName: 'アーセナル' },
  { id: '64', name: 'Liverpool FC', jpName: 'リヴァプール' },
  { id: '65', name: 'Manchester City FC', jpName: 'マンチェスター・シティ' },
  { id: '66', name: 'Manchester United FC', jpName: 'マンチェスター・ユナイテッド' },
  { id: '73', name: 'Tottenham Hotspur FC', jpName: 'トッテナム' },
  { id: '1044', name: 'Brighton & Hove Albion FC', jpName: 'ブライトン' },
  { id: '62', name: 'Everton FC', jpName: 'エヴァートン' },
  { id: '86', name: 'Real Madrid CF', jpName: 'レアル・マドリード' },
  { id: '81', name: 'FC Barcelona', jpName: 'バルセロナ' },
  { id: '78', name: 'Club Atlético de Madrid', jpName: 'アトレティコ・マドリード' },
  { id: '354', name: 'Real Sociedad de Fútbol', jpName: 'レアル・ソシエダ' },
  { id: '89', name: 'RCD Mallorca', jpName: 'マジョルカ' },
  { id: '5', name: 'FC Bayern München', jpName: 'バイエルン' },
  { id: '4', name: 'Borussia Dortmund', jpName: 'ドルトムント' },
  { id: '3', name: 'Bayer 04 Leverkusen', jpName: 'レヴァークーゼン' },
  { id: '108', name: 'FC Internazionale Milano', jpName: 'インテル' },
  { id: '98', name: 'AC Milan', jpName: 'ミラン' },
  { id: '109', name: 'Juventus FC', jpName: 'ユヴェントス' },
  { id: '112', name: 'Parma Calcio 1913', jpName: 'パルマ' },
  { id: '524', name: 'Paris Saint-Germain FC', jpName: 'パリ・サンジェルマン' },
  { id: '548', name: 'AS Monaco FC', jpName: 'モナコ' },
  { id: '1903', name: 'SL Benfica', jpName: 'ベンフィカ' },
  { id: '503', name: 'FC Porto', jpName: 'ポルト' },
  { id: '498', name: 'Sporting CP', jpName: 'スポルティング' },
  { id: '678', name: 'AFC Ajax', jpName: 'アヤックス' },
  { id: '674', name: 'PSV', jpName: 'PSV' },
  { id: '675', name: 'Feyenoord Rotterdam', jpName: 'フェイエノールト' },
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
  return getWithBuildCache(`team_matches_${teamId}_${status}`, () =>
    fetchWithRetry(`${BASE_URL}/teams/${teamId}/matches?status=${status}`, {
      headers: { 'X-Auth-Token': API_TOKEN },
      next: { revalidate: 3600 },
    })
  );
}
