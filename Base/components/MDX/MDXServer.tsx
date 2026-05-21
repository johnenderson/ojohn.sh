import React from 'react';

import { compileMDX } from 'next-mdx-remote/rsc';
import { InlineMath, BlockMath } from 'react-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { TweetEmbed } from './TweetEmbedClient';
import { PostAndDate } from 'Base/components/PostAndDate';
import { SideBySideImages } from 'Base/components/SideBySideImages';
import { SideBySideVideos } from 'Base/components/SideBySideVideos';
import { SmoothRender } from 'Base/components/SmoothRender';
import { Venn } from 'Base/components/Venn';

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
  PostAndDate,
  SideBySideImages,
  TweetEmbed,
  SmoothRender,
  SideBySideVideos,
  InlineMath: SafeInlineMath,
  BlockMath: SafeBlockMath,
  Venn,
};

interface MDXServerProps {
  source: string;
}

export async function MDXServer({ source }: MDXServerProps) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeHighlight],
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
