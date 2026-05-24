'use client';

import { ReactNode } from 'react';

import { MotionConfig } from 'framer-motion';

import { Layout } from '@/base/components/Layout';
import { ThemeProvider } from '@/base/components/Theme';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Layout>{children}</Layout>
      </MotionConfig>
    </ThemeProvider>
  );
}
