import { articleContent } from './article-content.generated';
import { Locale } from '@/types/Locale';

export function getArticleSource(slug: string, locale: Locale) {
  return articleContent[slug]?.[locale];
}

export function getArticleSlugs(locale: Locale) {
  return Object.entries(articleContent)
    .filter(([, translations]) => translations[locale] != null)
    .map(([slug]) => slug);
}
