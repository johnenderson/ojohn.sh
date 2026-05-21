import { FC, PropsWithChildren } from 'react';

import { CoverImage } from 'Base/Article/CoverImage';
import { Footer } from 'Base/Article/Layout/Footer';
import { Meta } from 'Base/Article/Meta';
import { TableOfContents } from 'Base/Article/TableOfContents/TableOfContents';
import { Title } from 'Base/Article/Title';
import { AnimationLayout } from 'Base/components/Layout/AnimationLayout';
import { Navbar } from 'Base/components/Navbar';
import {
  AlternativeArticle as AlternativeArticleType,
  CoverImage as CoverImageType,
} from 'src/lib/getPostMetadata';

type LayoutPropTypes = {
  title: string;
  date: string;
  alternativeArticle: AlternativeArticleType;
  coverImage: CoverImageType;
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
