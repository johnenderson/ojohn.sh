import Link from 'next/link';
import { FC } from 'react';

type PostPropType = {
  datetime: string;
  description: string;
  link: string;
  minutes: number;
  tags: string[];
  title: string;
};

export const ArticleListItem: FC<PostPropType> = ({
  datetime,
  description,
  link,
  minutes,
  tags,
  title,
}) => (
  <li className="group rounded-md border border-site-border-muted bg-site-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-site-border hover:bg-site-card-hover">
    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-site-body-muted">
      <time>{datetime}</time>
      <span>{minutes} min de leitura</span>
    </div>

    <h3 className="m-0 text-lg font-bold leading-snug text-site-foreground">
      <Link
        href={link}
        className="no-underline transition-colors group-hover:text-site-primary-hover"
      >
        {title}
      </Link>
    </h3>

    <p className="mb-0 mt-2 max-w-2xl text-sm leading-6 text-site-body">
      {description}
    </p>

    {tags.length > 0 && (
      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
        {tags.slice(0, 4).map((tag) => (
          <li
            key={tag}
            className="rounded border border-site-border-subtle bg-site-primary-soft px-2 py-0.5 text-xs font-medium leading-5 text-site-body"
          >
            {tag}
          </li>
        ))}
      </ul>
    )}
  </li>
);
