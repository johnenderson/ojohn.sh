import React from 'react';

import rehypeShiki from '@shikijs/rehype';
import { compileMDX } from 'next-mdx-remote/rsc';
import { InlineMath, BlockMath } from 'react-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { TweetEmbed } from './TweetEmbedClient';
import { codeBlockMetaTransformer } from './codeBlockMeta';
import { ArticleImage } from '@/base/article/ArticleImage';
import {
  Admonition,
  Danger,
  Info,
  Note,
  Tip,
  Warning,
} from '@/base/components/Admonition';
import { PostAndDate } from '@/base/components/PostAndDate';
import { SideBySideImages } from '@/base/components/SideBySideImages';
import { SideBySideVideos } from '@/base/components/SideBySideVideos';
import { SmoothRender } from '@/base/components/SmoothRender';
import { Venn } from '@/base/components/Venn';

/** Coerce MDX children to a string so KaTeX receives a string (it throws on non-string). */
function mathChildrenToString(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (children == null) return '';
  if (Array.isArray(children))
    return children.map(mathChildrenToString).join('');
  if (
    React.isValidElement(children) &&
    (children.props as { children?: React.ReactNode })?.children != null
  ) {
    return mathChildrenToString(
      (children.props as { children: React.ReactNode }).children,
    );
  }
  return String(children);
}

/** Wrapper so InlineMath always gets a string (MDX can pass React nodes as children). */
const SafeInlineMath = (props: {
  math?: string;
  children?: React.ReactNode;
}) => <InlineMath math={props.math ?? mathChildrenToString(props.children)} />;

/** Wrapper so BlockMath always gets a string (MDX can pass React nodes as children). */
const SafeBlockMath = (props: {
  math?: string;
  children?: React.ReactNode;
}) => <BlockMath math={props.math ?? mathChildrenToString(props.children)} />;

const components = {
  Admonition,
  Danger,
  Image: ArticleImage,
  Info,
  Note,
  PostAndDate,
  SideBySideImages,
  Tip,
  TweetEmbed,
  SmoothRender,
  SideBySideVideos,
  Warning,
  InlineMath: SafeInlineMath,
  BlockMath: SafeBlockMath,
  Venn,
};

const rehypeShikiOptions = {
  theme: 'rose-pine-moon',
  transformers: [codeBlockMetaTransformer],
};

interface MDXServerProps {
  source: string;
}

function withSmoothRender(source: string) {
  if (source.includes('<SmoothRender')) {
    return source;
  }

  return `<SmoothRender>\n\n${source}\n\n</SmoothRender>`;
}

export async function MDXServer({ source }: MDXServerProps) {
  const { content } = await compileMDX({
    source: withSmoothRender(source),
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug, [rehypeShiki, rehypeShikiOptions]],
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
