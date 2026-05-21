import type { Metadata } from 'next';
import { getPlaiceholder } from 'plaiceholder';

import { Layout } from 'Base/Article/Layout';
import { MDXServer } from 'Base/components/MDX/MDXServer';
import { getPaths } from 'src/lib';
import { getPostContent } from 'src/lib/getPostContent';
import { getPostMetadata } from 'src/lib/getPostMetadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPaths().map(({ params }) => params);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const postMetadata = getPostMetadata(slug);

  return {
    title: postMetadata.title,
    description: postMetadata.description,
    openGraph: {
      images: [{ url: postMetadata.coverImage.src }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { postContent, minutes } = getPostContent(slug);
  const postMetadata = getPostMetadata(slug);
  const { base64, img } = await getPlaiceholder(postMetadata.coverImage.src);

  const coverImage = {
    ...postMetadata.coverImage,
    src: img.src,
    blurDataURL: base64,
  };

  return (
    <Layout
      title={postMetadata.title}
      date={postMetadata.date}
      alternativeArticle={postMetadata.alternativeArticle}
      minutes={minutes}
      coverImage={coverImage}
    >
      <MDXServer source={postContent} />
    </Layout>
  );
}
