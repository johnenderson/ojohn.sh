import Image from 'next/image';

interface SideBySideImagesPropTypes {
  images: string[];
}

export const SideBySideImages = ({ images }: SideBySideImagesPropTypes) => (
  <div className="side-by-side">
    {images.map((image) => (
      <figure key={image}>
        <Image src={image} alt="" fill style={{ objectFit: 'contain' }} />
      </figure>
    ))}
  </div>
);
