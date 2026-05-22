import { ImageProps } from 'next/image';

import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';

import { Language } from '@/lib/languages';
import { Locale } from '@/types/Locale';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DEFAULT_ARTICLE_LOCALE: Locale = Language.PT_BR;

export type ArticleCoverImage = {
  src: string;
  width?: ImageProps['width'];
  height?: ImageProps['height'];
  alt: string;
  authorHref: string;
  authorName: string;
  blurDataURL?: string;
};

export type ArticleAlternative = {
  url: string;
  language: string;
};

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  coverImage: ArticleCoverImage;
  alternativeArticle?: ArticleAlternative;
};

export type ArticleListItem = {
  slug: string;
  title: string;
  date: string;
};

function getArticleDir(slug: string, locale: Locale = DEFAULT_ARTICLE_LOCALE) {
  return path.join(CONTENT_DIR, slug, locale);
}

function getArticleContentPath(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
) {
  return path.join(getArticleDir(slug, locale), 'index.mdx');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(
  source: Record<string, unknown>,
  key: string,
  context: string,
) {
  const value = source[key];
  if (typeof value !== 'string') {
    throw new Error(
      `Invalid article metadata for ${context}: ${key} must be a string.`,
    );
  }
  return value;
}

function optionalStringValue(source: Record<string, unknown>, key: string) {
  const value = source[key];
  if (value == null) return undefined;
  if (typeof value !== 'string') {
    throw new Error(`Invalid article metadata: ${key} must be a string.`);
  }
  return value;
}

function optionalImageDimension(
  source: Record<string, unknown>,
  key: string,
): ImageProps['width'] {
  const value = source[key];
  if (value == null) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return value as `${number}`;
  }
  throw new Error(`Invalid article metadata: ${key} must be a number.`);
}

function parseCoverImage(value: unknown, context: string): ArticleCoverImage {
  if (!isRecord(value)) {
    throw new Error(
      `Invalid article metadata for ${context}: coverImage is required.`,
    );
  }

  return {
    src: stringValue(value, 'src', context),
    width: optionalImageDimension(value, 'width'),
    height: optionalImageDimension(value, 'height'),
    alt: stringValue(value, 'alt', context),
    authorHref: optionalStringValue(value, 'authorHref') ?? '',
    authorName: optionalStringValue(value, 'authorName') ?? '',
  };
}

function parseAlternativeArticle(
  value: unknown,
  context: string,
): ArticleAlternative | undefined {
  if (value == null) return undefined;
  if (!isRecord(value)) {
    throw new Error(
      `Invalid article metadata for ${context}: alternativeArticle must be an object.`,
    );
  }

  return {
    url: stringValue(value, 'url', context),
    language: stringValue(value, 'language', context),
  };
}

function parseTags(value: unknown, context: string): string[] | undefined {
  if (value == null) return undefined;
  if (!Array.isArray(value)) {
    throw new Error(
      `Invalid article metadata for ${context}: tags must be an array.`,
    );
  }

  return value.map((tag, index) => {
    if (typeof tag !== 'string') {
      throw new Error(
        `Invalid article metadata for ${context}: tags[${index}] must be a string.`,
      );
    }

    return tag;
  });
}

function parseArticleMetadata(
  value: unknown,
  context: string,
): ArticleMetadata {
  if (!isRecord(value)) {
    throw new Error(
      `Invalid article metadata for ${context}: expected an object.`,
    );
  }

  return {
    title: stringValue(value, 'title', context),
    description: stringValue(value, 'description', context),
    date: stringValue(value, 'date', context),
    tags: parseTags(value.tags, context),
    coverImage: parseCoverImage(value.coverImage, context),
    alternativeArticle: parseAlternativeArticle(
      value.alternativeArticle,
      context,
    ),
  };
}

function parseInlineArray(value: string) {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return null;

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return [];

  return inner.split(',').map(parseScalar);
}

function parseScalar(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseValue(value: string) {
  return parseInlineArray(value) ?? parseScalar(value);
}

function parseFrontmatter(frontmatter: string, context: string) {
  const metadata: Record<string, unknown> = {};
  const lines = frontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const rootMatch = line.match(/^([A-Za-z][\w-]*):(?:\s*(.*))?$/);
    if (!rootMatch) {
      throw new Error(`Invalid article frontmatter for ${context}: ${line}`);
    }

    const [, key, rawValue = ''] = rootMatch;
    if (rawValue) {
      metadata[key] = parseValue(rawValue);
      continue;
    }

    if (key === 'tags') {
      const tags: string[] = [];

      while (lines[index + 1]?.startsWith('  ')) {
        index += 1;
        if (!lines[index].startsWith('  - ')) continue;

        const tagLine = lines[index].slice(4);
        const tagObjectMatch = tagLine.match(/^([A-Za-z][\w-]*):\s*(.*)$/);

        if (!tagObjectMatch) {
          tags.push(parseScalar(tagLine));
          continue;
        }

        const tagObject: Record<string, unknown> = {
          [tagObjectMatch[1]]: parseScalar(tagObjectMatch[2]),
        };

        while (lines[index + 1]?.startsWith('    ')) {
          index += 1;
          const nestedMatch = lines[index]
            .trim()
            .match(/^([A-Za-z][\w-]*):\s*(.*)$/);

          if (nestedMatch) {
            tagObject[nestedMatch[1]] = parseScalar(nestedMatch[2]);
          }
        }

        if (typeof tagObject.name === 'string') {
          tags.push(tagObject.name);
        }
      }

      metadata[key] = tags;
      continue;
    }

    const nested: Record<string, unknown> = {};
    while (lines[index + 1]?.startsWith('  ')) {
      index += 1;
      const nestedMatch = lines[index]
        .trim()
        .match(/^([A-Za-z][\w-]*):\s*(.*)$/);

      if (!nestedMatch) {
        throw new Error(
          `Invalid article frontmatter for ${context}: ${lines[index]}`,
        );
      }

      nested[nestedMatch[1]] = parseValue(nestedMatch[2]);
    }

    metadata[key] = nested;
  }

  return metadata;
}

function readArticleFile(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
) {
  const content = fs.readFileSync(getArticleContentPath(slug, locale), 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const context = `${slug}/${locale}`;

  if (!match) {
    throw new Error(`Missing article frontmatter for ${context}.`);
  }

  return {
    content: content.slice(match[0].length),
    metadata: parseArticleMetadata(
      parseFrontmatter(match[1], context),
      context,
    ),
  };
}

export function hasArticleMetadata(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
) {
  if (!hasArticleContent(slug, locale)) return false;

  const content = fs.readFileSync(getArticleContentPath(slug, locale), 'utf8');
  return /^---\r?\n[\s\S]*?\r?\n---/.test(content);
}

export function getArticleMetadata(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
): ArticleMetadata {
  return readArticleFile(slug, locale).metadata;
}

export function hasArticleContent(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
) {
  return fs.existsSync(getArticleContentPath(slug, locale));
}

export function getArticleContent(
  slug: string,
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
) {
  const { content } = readArticleFile(slug, locale);
  const { minutes } = readingTime(content);

  return {
    content,
    minutes: Math.round(minutes),
  };
}

export function getArticlePaths(locale: Locale = DEFAULT_ARTICLE_LOCALE) {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((slug) => fs.existsSync(getArticleDir(slug, locale)))
    .map((slug) => ({
      params: {
        slug,
      },
    }));
}

export function getArticlesList(
  locale: Locale = DEFAULT_ARTICLE_LOCALE,
): ArticleListItem[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((slug) => hasArticleMetadata(slug, locale))
    .map((slug) => {
      const metadata = getArticleMetadata(slug, locale);

      return {
        slug,
        title: metadata.title,
        date: metadata.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
