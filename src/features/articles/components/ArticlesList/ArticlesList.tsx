import Link from 'next/link';
import { FC } from 'react';

import { ArticleListItem } from './ArticleListItem';
import { Title } from '@/base/components/Title';
import {
  ArticleListItem as ArticleListItemType,
  getArticlesList,
  parseArticleDate,
} from '@/features/articles/lib/articles';

type Header = 'h1' | 'h2' | false;
type ArticlesListProps = {
  grouped?: boolean;
  header?: Header;
  itemVariant?: 'default' | 'compact';
  showTags?: boolean;
};

const getArticleYear = (date: string) => {
  return parseArticleDate(date).getUTCFullYear().toString();
};

const groupArticlesByYear = (articles: ArticleListItemType[]) =>
  articles.reduce<Record<string, ArticleListItemType[]>>((groups, article) => {
    const year = getArticleYear(article.date);

    return {
      ...groups,
      [year]: [...(groups[year] ?? []), article],
    };
  }, {});

export const ArticlesList: FC<ArticlesListProps> = ({
  grouped = false,
  header = 'h2',
  itemVariant = 'default',
  showTags = true,
}) => {
  const articles = getArticlesList();
  const articlesByYear = groupArticlesByYear(articles);
  const years = Object.keys(articlesByYear).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <section id="articles" className={header === false ? 'mt-8' : 'mt-20'}>
      {header === false ? null : header === 'h1' ? (
        <Title text="artigos" />
      ) : (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="m-0 text-2xl font-bold tracking-normal text-site-foreground sm:text-3xl">
            Artigos recentes
          </h2>
          <Link
            href="/writings"
            passHref
            className="text-sm font-medium text-site-body-muted no-underline transition-colors hover:text-site-primary-hover"
          >
            Ver todos
          </Link>
        </div>
      )}

      {grouped ? (
        <div className="flex flex-col gap-12">
          {years.map((year) => (
            <section key={year} aria-labelledby={`articles-${year}`}>
              <h2
                id={`articles-${year}`}
                className="mb-4 mt-0 text-3xl font-bold leading-none text-site-foreground"
              >
                {year}
              </h2>
              <ul className="m-0 grid list-none gap-3 p-0">
                {articlesByYear[year].map((article) => (
                  <ArticleListItem
                    key={article.slug}
                    datetime={article.date}
                    description={article.description}
                    icon={article.icon}
                    link={`/${article.slug}`}
                    minutes={article.minutes}
                    showTags={showTags}
                    tags={article.tags}
                    title={article.title}
                    variant={itemVariant}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-3 p-0">
          {articles.map((article) => (
            <ArticleListItem
              key={article.slug}
              datetime={article.date}
              description={article.description}
              icon={article.icon}
              link={`/${article.slug}`}
              minutes={article.minutes}
              showTags={showTags}
              tags={article.tags}
              title={article.title}
              variant={itemVariant}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
