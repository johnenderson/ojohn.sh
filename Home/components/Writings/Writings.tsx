import Link from 'next/link';
import { FC } from 'react';

import { Post } from './Post';
import { listStyle, titleLinkStyle } from './style';
import { Title } from 'Base/components/Title';
import { getPostsList } from 'src/lib/getPostsList';

type Header = 'h1' | 'h2';
type WritingsPropTypes = { header?: Header };

export const Writings: FC<WritingsPropTypes> = ({ header = 'h2' }) => {
  const posts = getPostsList();

  return (
    <section id="writings">
      {header === 'h1' ? (
        <Title text="artigos" />
      ) : (
        <Link href="/writings" passHref style={titleLinkStyle}>
          <h2 className="tracking-[0.01em] text-[2.2em] not-italic font-bold text-white mt-12 mb-[0.1rem] block light:text-[#333]">
            artigos
          </h2>
        </Link>
      )}
      <ul style={listStyle}>
        {posts.map((post) => (
          <Post
            key={post.slug}
            datetime={post.date}
            link={`/${post.slug}`}
            title={post.title}
          />
        ))}
      </ul>
    </section>
  );
};
