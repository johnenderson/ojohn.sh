import React from 'react';

import rehypeShiki from '@shikijs/rehype';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { InlineMath, BlockMath } from 'react-katex';
import TweetEmbed from 'react-tweet-embed';
import remarkGfm from 'remark-gfm';

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

export type Content = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

interface MDXPropTypes {
  content: Content;
}

const rehypeShikiOptions = {
  theme: 'rose-pine-moon',
};

export const serializeMDX = (content: string) =>
  serialize(content, {
    blockJS: false,
    mdxOptions: {
      rehypePlugins: [[rehypeShiki, rehypeShikiOptions]],
      remarkPlugins: [remarkGfm],
    },
  });

const components = {
  PostAndDate,
  SideBySideImages,
  TweetEmbed,
  SmoothRender,
  SideBySideVideos,
  InlineMath: SafeInlineMath,
  BlockMath: SafeBlockMath,
  Venn,
};

export const MDX = ({ content }: MDXPropTypes) => (
  <MDXRemote {...content} components={components} />
);
