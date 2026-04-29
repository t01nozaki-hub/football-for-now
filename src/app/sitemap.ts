import { MetadataRoute } from 'next';
import { LEAGUES, MAJOR_TEAMS, JAPANESE_PLAYERS } from '@/lib/football-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://footballfornow.com';

  // 基本ページ
  const routes = [
    '',
    '/news',
    '/matches',
    '/stats',
    '/teams',
    '/japanese-players',
    '/guide',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // リーグページ
  const leagueRoutes = LEAGUES.map((code) => ({
    url: `${baseUrl}/leagues/${code}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.7,
  }));

  // 主要チームページ
  const teamRoutes = MAJOR_TEAMS.map((team) => ({
    url: `${baseUrl}/teams/${team.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // 日本人選手ページ
  const playerRoutes = JAPANESE_PLAYERS.map((player) => ({
    url: `${baseUrl}/japanese-players/${player.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...leagueRoutes, ...teamRoutes, ...playerRoutes];
}
