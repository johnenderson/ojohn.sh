import { FC, PropsWithChildren } from 'react';

import { CoverImage } from '@/base/article/CoverImage';
import { Footer } from '@/base/article/Layout/Footer';
import { Meta } from '@/base/article/Meta';
import { TableOfContents } from '@/base/article/TableOfContents/TableOfContents';
import { Title } from '@/base/article/Title';
import { AnimationLayout } from '@/base/components/Layout/AnimationLayout';
import { Navbar } from '@/base/components/Navbar';
import {
  ArticleAlternative,
  ArticleCoverImage,
} from '@/features/articles/lib/articles';

type LayoutPropTypes = {
  title: string;
  date: string;
  alternativeArticle?: ArticleAlternative;
  coverImage: ArticleCoverImage;
  minutes: number;
};

export const Layout: FC<PropsWithChildren<LayoutPropTypes>> = ({
  children,
  title,
  date,
  coverImage,
  alternativeArticle,
  minutes,
}) => (
  <>
    <Navbar />
    <AnimationLayout>
      <div className="content">
        {/* Flex row: article (main) + ToC (aside) — mirrors doce.sh layout */}
        <div className="flex w-full gap-12">
          <main className="w-full min-w-0 max-w-2xl flex-1 flex flex-col gap-12">
            <article
              className="post"
              itemScope
              itemType="http://schema.org/BlogPosting"
            >
              <header className="flex flex-col gap-3">
                <Title text={title} />
                <Meta
                  date={date}
                  alternativeArticle={alternativeArticle}
                  minutes={minutes}
                />
              </header>

              {coverImage?.src && (
                <CoverImage
                  src={coverImage.src}
                  width={coverImage.width}
                  height={coverImage.height}
                  alt={coverImage.alt}
                  authorHref={coverImage.authorHref}
                  authorName={coverImage.authorName}
                  blurDataURL={coverImage.blurDataURL}
                />
              )}

              {children}
            </article>

            <Footer />
          </main>

          <TableOfContents />
        </div>
      </div>
    </AnimationLayout>
  </>
);
