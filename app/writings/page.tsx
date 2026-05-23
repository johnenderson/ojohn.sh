import { PageWrapper } from '../components/PageWrapper';
import type { Metadata } from 'next';

import { PageTitle } from '@/base/components/PageTitle';
import { ArticlesList } from '@/features/articles/components/ArticlesList';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

const BLOG_TITLE = 'Blog';
const BLOG_DESCRIPTION = 'Guias, notas e textos pessoais por John Enderson';
const BLOG_URL = `${SITE_URL}/writings`;

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: BLOG_URL,
  },
  openGraph: {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE }],
    siteName: SITE_NAME,
    type: 'website',
    url: BLOG_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Page() {
  return (
    <PageWrapper>
      <main id="main">
        <div className="content">
          <PageTitle
            title="Artigos"
            subtitle="Guias, tutoriais e notas pessoais."
          />
          <ArticlesList
            grouped
            header={false}
            itemVariant="compact"
            showTags={false}
          />
        </div>
      </main>
    </PageWrapper>
  );
}
