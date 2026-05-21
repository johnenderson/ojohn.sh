'use client';

import { FC, PropsWithChildren, useState } from 'react';

import { InView } from 'react-intersection-observer';

export const IntersectionObserver: FC<PropsWithChildren> = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <InView as="div" onChange={(inView) => setShow(inView)}>
      {show && children}
    </InView>
  );
};
