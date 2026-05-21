import Link from 'next/link';
import { FC } from 'react';

import { itemStyle } from './style';

type PostPropType = { datetime: string; link: string; title: string };

export const Post: FC<PostPropType> = ({ datetime, link, title }) => (
  <li style={itemStyle}>
    <div className="block min-w-[120px] mr-4 shrink-0 text-[0.95rem] leading-7 text-[#aaa] light:text-[#666]">
      <time>{datetime}</time>
    </div>
    <span className="text-[1rem] leading-7 font-medium">
      <Link href={link}>{title}</Link>
    </span>
  </li>
);
