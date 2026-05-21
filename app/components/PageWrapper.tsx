'use client';

import { ReactNode } from 'react';

import { AnimationLayout } from 'Base/components/Layout/AnimationLayout';
import { Navbar } from 'Base/components/Navbar';

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Navbar />
      <AnimationLayout>
        {children}
      </AnimationLayout>
    </>
  );
}
