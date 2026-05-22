import Link from 'next/link';
import { FC } from 'react';

import { ArticleListItem } from './ArticleListItem';
import { listStyle, titleLinkStyle } from './style';
import { Title } from '@/base/components/Title';
import { getArticlesList } from '@/features/articles/lib/articles';

type Header = 'h1' | 'h2' | false;
type ArticlesListProps = { header?: Header };

export const ArticlesList: FC<ArticlesListProps> = ({ header = 'h2' }) => {
  const articles = getArticlesList();

  return (
    <section id="articles">
      {header === false ? null : header === 'h1' ? (
        <Title text="artigos" />
      ) : (
        <Link href="/writings" passHref style={titleLinkStyle}>
          <h2 className="tracking-[0.01em] text-[2.2em] not-italic font-bold text-white mt-12 mb-[0.1rem] block light:text-[#333]">
            artigos
          </h2>
        </Link>
      )}
      <ul style={listStyle}>
        {articles.map((article) => (
          <ArticleListItem
            key={article.slug}
            datetime={article.date}
            link={`/${article.slug}`}
            title={article.title}
          />
        ))}
      </ul>
    </section>
  );
};
