import { FC } from 'react';

import { AlternativeArticle } from '@/base/article/AlternativeArticle';
import { ArticleAlternative } from '@/features/articles/lib/articles';

type MetaPropTypes = {
  date: string;
  alternativeArticle?: ArticleAlternative;
  minutes: number;
};

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

function formatDate(raw: string): string {
  // If already DD/MM/YYYY, return as-is
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;
  // If YYYY-MM-DD, convert to DD/MM/YYYY
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[3]}/${match[2]}/${match[1]}`;
  return raw;
}

export const Meta: FC<MetaPropTypes> = ({
  date,
  alternativeArticle,
  minutes,
}) => (
  <div className="mt-1.5">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-[#555] light:text-[#999]">
      {date && (
        <span className="flex items-center gap-1.5">
          <CalendarIcon />
          <span>
            Publicado em{' '}
            <time dateTime={`${date}T00:00:00.000Z`} itemProp="datePublished">
              {formatDate(date)}
            </time>
          </span>
        </span>
      )}
      {date && minutes ? (
        <span className="flex items-center gap-1.5">
          <span className="text-[#333] light:text-[#ccc]">•</span>
          <ClockIcon />
          <span>{minutes} min de leitura</span>
        </span>
      ) : null}
    </div>
    {alternativeArticle ? (
      <AlternativeArticle alternativeArticle={alternativeArticle} />
    ) : null}
  </div>
);
