import { notFound } from 'next/navigation';
import { connection } from 'next/server';

import type { Metadata } from 'next';
import { getPlaiceholder } from 'plaiceholder';

import { Layout } from '@/base/article/Layout';
import { MDXServer } from '@/base/components/MDX/MDXServer';
import { ArticleDevRefresh } from '@/features/articles/components/ArticleDevRefresh';
import {
  getArticleContent,
  getArticleMetadata,
  getArticlePaths,
  hasArticleContent,
  hasArticleMetadata,
} from '@/features/articles/lib/articles';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getArticlePaths().map(({ params }) => params);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (process.env.NODE_ENV === 'development') {
    await connection();
  }

  if (!hasArticleMetadata(slug)) {
    return {};
  }

  const articleMetadata = getArticleMetadata(slug);

  return {
    title: articleMetadata.title,
    description: articleMetadata.description,
    openGraph: {
      images: [{ url: articleMetadata.coverImage.src }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (process.env.NODE_ENV === 'development') {
    await connection();
  }

  if (!hasArticleContent(slug) || !hasArticleMetadata(slug)) {
    notFound();
  }

  const { content, minutes } = getArticleContent(slug);
  const articleMetadata = getArticleMetadata(slug);
  const { base64, img } = await getPlaiceholder(articleMetadata.coverImage.src);

  const coverImage = {
    ...articleMetadata.coverImage,
    src: img.src,
    blurDataURL: base64,
  };

  return (
    <Layout
      title={articleMetadata.title}
      date={articleMetadata.date}
      alternativeArticle={articleMetadata.alternativeArticle}
      minutes={minutes}
      coverImage={coverImage}
    >
      {process.env.NODE_ENV === 'development' ? (
        <ArticleDevRefresh slug={slug} />
      ) : null}
      <MDXServer source={content} />
    </Layout>
  );
}
