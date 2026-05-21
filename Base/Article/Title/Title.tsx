'use client';

import { FC } from 'react';

type TitleProps = {
  text: string;
};

export const Title: FC<TitleProps> = ({ text }) => (
  <h1 className="tracking-[0.01em] text-[2em] not-italic font-bold text-white mt-0 mb-0 normal-case leading-[1.25] block light:text-[#333]">
    {text}
  </h1>
);
