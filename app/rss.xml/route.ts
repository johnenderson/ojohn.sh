import { Feed } from 'feed';

import {
  getArticleMetadata,
  getArticlePaths,
} from '@/features/articles/lib/articles';
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

const AUTHOR = { name: AUTHOR_NAME, link: SITE_URL };

function toDate(raw: string): Date {
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
  return new Date(raw);
}

export async function GET() {
  const feed = new Feed({
    title: SITE_NAME,
    description: 'Artigos sobre ML, carreira e tecnologia.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'pt-BR',
    feedLinks: { rss: `${SITE_URL}/rss.xml` },
    copyright: `© ${new Date().getFullYear()} ${AUTHOR_NAME}`,
    author: AUTHOR,
  });

  const paths = getArticlePaths();

  const articles = paths
    .map(({ params: { slug } }) => {
      try {
        return { slug, ...getArticleMetadata(slug) };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => toDate(b!.date).getTime() - toDate(a!.date).getTime());

  for (const article of articles) {
    if (!article) continue;
    feed.addItem({
      title: article.title,
      id: `${SITE_URL}/${article.slug}`,
      link: `${SITE_URL}/${article.slug}`,
      description: article.description ?? '',
      date: toDate(article.date),
      author: [AUTHOR],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
