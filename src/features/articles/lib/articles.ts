import fs from 'fs';
import path from 'path';

import { ImageProps } from 'next/image';
import readingTime from 'reading-time';

import { Language } from '@/lib/languages';
import { Locale } from '@/types/Locale';

const CONTENT_DIR = path.join(process.cwd(), 'content');

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

export type ArticleTag = {
  href: string;
  name: string;
};

export type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  tags?: ArticleTag[];
  coverImage: ArticleCoverImage;
  alternativeArticle?: ArticleAlternative;
};

export type ArticleListItem = {
  slug: string;
  title: string;
  date: string;
};

function getArticleDir(slug: string, locale: Locale = Language.EN) {
  return path.join(CONTENT_DIR, slug, locale);
}

function getArticleMetadataPath(slug: string, locale: Locale = Language.EN) {
  return path.join(getArticleDir(slug, locale), 'metadata.json');
}

function getArticleContentPath(slug: string, locale: Locale = Language.EN) {
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
    throw new Error(`Invalid article metadata for ${context}: ${key} must be a string.`);
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
    throw new Error(`Invalid article metadata for ${context}: coverImage is required.`);
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

function parseTags(value: unknown, context: string): ArticleTag[] | undefined {
  if (value == null) return undefined;
  if (!Array.isArray(value)) {
    throw new Error(`Invalid article metadata for ${context}: tags must be an array.`);
  }

  return value.map((tag, index) => {
    if (!isRecord(tag)) {
      throw new Error(
        `Invalid article metadata for ${context}: tags[${index}] must be an object.`,
      );
    }

    return {
      href: stringValue(tag, 'href', context),
      name: stringValue(tag, 'name', context),
    };
  });
}

function parseArticleMetadata(value: unknown, context: string): ArticleMetadata {
  if (!isRecord(value)) {
    throw new Error(`Invalid article metadata for ${context}: expected an object.`);
  }

  return {
    title: stringValue(value, 'title', context),
    description: stringValue(value, 'description', context),
    date: stringValue(value, 'date', context),
    tags: parseTags(value.tags, context),
    coverImage: parseCoverImage(value.coverImage, context),
    alternativeArticle: parseAlternativeArticle(value.alternativeArticle, context),
  };
}

export function hasArticleMetadata(
  slug: string,
  locale: Locale = Language.EN,
) {
  return fs.existsSync(getArticleMetadataPath(slug, locale));
}

export function getArticleMetadata(
  slug: string,
  locale: Locale = Language.EN,
): ArticleMetadata {
  const metadataPath = getArticleMetadataPath(slug, locale);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as unknown;

  return parseArticleMetadata(metadata, `${slug}/${locale}`);
}

export function hasArticleContent(slug: string, locale: Locale = Language.EN) {
  return fs.existsSync(getArticleContentPath(slug, locale));
}

export function getArticleContent(slug: string, locale: Locale = Language.EN) {
  const content = fs.readFileSync(getArticleContentPath(slug, locale), 'utf8');
  const { minutes } = readingTime(content);

  return {
    content,
    minutes: Math.round(minutes),
  };
}

export function getArticlePaths(locale: Locale = Language.EN) {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((slug) => fs.existsSync(getArticleDir(slug, locale)))
    .map((slug) => ({
      params: {
        slug,
      },
    }));
}

export function getArticlesList(locale: Locale = Language.EN): ArticleListItem[] {
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
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}
