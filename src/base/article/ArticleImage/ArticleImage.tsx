import Image from 'next/image';

import path from 'path';
import sharp from 'sharp';

type ArticleImageProps = {
  src: string;
  alt?: string;
  caption?: string;
  authorName?: string;
  authorHref?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 675;

const isLocalSrc = (src: string) =>
  src.startsWith('/') && !src.startsWith('//');

/**
 * Resolve as dimensões da imagem. Para arquivos locais em `/public`, lê do
 * disco com `sharp`; se falhar (arquivo ausente/corrompido) ou se o `src` for
 * remoto, usa as dimensões informadas via props ou um fallback 16:9.
 */
const resolveDimensions = async (
  src: string,
  width?: number,
  height?: number,
) => {
  if (width && height) return { width, height };

  if (isLocalSrc(src)) {
    try {
      const imagePath = path.join(process.cwd(), 'public', src);
      const metadata = await sharp(imagePath).metadata();

      if (metadata.width && metadata.height) {
        return { width: metadata.width, height: metadata.height };
      }
    } catch {
      // cai no fallback abaixo
    }
  }

  return {
    width: width ?? FALLBACK_WIDTH,
    height: height ?? FALLBACK_HEIGHT,
  };
};

/**
 * Imagem para o corpo do artigo. O autor informa apenas `src` (e, se quiser,
 * `alt`/`caption`/crédito); as dimensões são derivadas automaticamente do
 * arquivo em `/public`, e a imagem ocupa 100% da largura da coluna preservando
 * a proporção original.
 *
 * Para imagens remotas, informe `width`/`height` (o domínio precisa estar em
 * `images.remotePatterns` no `next.config.js`).
 *
 * Uso no MDX:
 *
 * ```mdx
 * <Image
 *   src="/slug/foto.jpg"
 *   alt="Descrição"
 *   caption="Legenda opcional"
 *   authorName="Fulano"
 *   authorHref="https://exemplo.com"
 * />
 * ```
 */
export async function ArticleImage({
  src,
  alt = '',
  caption,
  authorName,
  authorHref,
  width: widthProp,
  height: heightProp,
  priority = false,
}: ArticleImageProps) {
  const { width, height } = await resolveDimensions(src, widthProp, heightProp);

  return (
    <figure className="article-image">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 672px"
        className="rounded-md border border-site-border-subtle"
        style={{ width: '100%', height: 'auto' }}
      />
      {caption || authorName ? (
        <figcaption>
          {caption ? (
            <span className="article-image-caption">{caption}</span>
          ) : null}
          {authorName ? (
            <span className="article-image-credit">
              Foto por{' '}
              {authorHref ? (
                <a href={authorHref} target="_blank" rel="noreferrer">
                  {authorName}
                </a>
              ) : (
                authorName
              )}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
