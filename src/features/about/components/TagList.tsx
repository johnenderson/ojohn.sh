import type { CSSProperties } from 'react';

type TagListItem = {
  label: string;
  color?: string | null;
  meta?: string;
};

type TagListProps = {
  items: TagListItem[];
  variant?: 'accent' | 'neutral';
};

export const TagList = ({ items, variant = 'accent' }: TagListProps) => {
  if (items.length === 0) return null;

  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((item) => (
        <li
          key={item.label}
          className="about-tag inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold text-site-body"
          data-variant={variant}
          style={
            {
              '--about-tag-accent': item.color ?? 'var(--site-primary)',
            } as CSSProperties
          }
        >
          <span
            aria-hidden="true"
            className="about-tag-dot size-2 shrink-0 rounded-full"
          />
          <span>{item.label}</span>
          {item.meta ? (
            <span className="about-tag-meta text-xs font-bold leading-none">
              {item.meta}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
};
