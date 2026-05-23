import type { Metadata } from 'next';

import { AnimationLayout } from '@/base/components/Layout/AnimationLayout';
import { Navbar } from '@/base/components/Navbar';
import { ArticlesList } from '@/features/articles/components/ArticlesList';
import { About } from '@/features/home/components/About';
import { LastfmCard } from '@/features/home/components/Activity';
import { Hero } from '@/features/home/components/Hero';
import { SkipLink } from '@/features/home/components/SkipLink';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: 'Site pessoal — artigos, notas e experimentos.',
  openGraph: {
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <SkipLink />
      <AnimationLayout>
        <main id="main">
          <div className="content">
            <Hero />
            <About />
            <LastfmCard />
            <ArticlesList />
          </div>
        </main>
      </AnimationLayout>
    </>
  );
}
