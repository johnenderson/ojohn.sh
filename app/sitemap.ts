import type { MetadataRoute } from 'next';

import { getArticlesList } from '@/features/articles/lib/articles';

const SITE_URL = 'https://johnenderson.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getArticlesList().map((article) => ({
    url: `${SITE_URL}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/writings`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/me`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articles,
  ];
}
