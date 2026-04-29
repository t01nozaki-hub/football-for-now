import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = 'https://footballfornow.com';
  
  const leagues = ['PL', 'PD', 'BL1', 'SA', 'FL1'];
  const leagueUrls = leagues.map(code => ({
    url: `${baseUrl}/leagues/${code}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const mainPages = [
    '',
    '/matches',
    '/teams',
    '/stats',
    '/news',
    '/japanese-players',
    '/guide',
    '/about',
    '/contact',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  return [...mainPages, ...leagueUrls];
}
