import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

interface CoverImagePropTypes extends ImageProps {
  src: string;
  alt: string;
  authorHref: string;
  authorName: string;
  blurDataURL?: string;
}

export const CoverImage: FC<CoverImagePropTypes> = ({
  src,
  width,
  height,
  alt,
  authorHref,
  authorName,
  blurDataURL,
}) => (
  <div className="mt-8 mb-8 text-center flex flex-col gap-3">
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      blurDataURL={blurDataURL}
      placeholder="blur"
      style={{ height: 'auto' }}
    />
    {authorName ? (
      <span className="text-xs">
        Photo by{' '}
        <a
          href={authorHref}
          className="no-underline"
          target="_blank"
          rel="noreferrer"
        >
          {authorName}
        </a>
      </span>
    ) : null}
  </div>
);
