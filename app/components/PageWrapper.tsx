'use client';

import { ReactNode } from 'react';

import { AnimationLayout } from '@/base/components/Layout/AnimationLayout';
import { Navbar } from '@/base/components/Navbar';

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Navbar />
      <AnimationLayout>{children}</AnimationLayout>
    </>
  );
}
