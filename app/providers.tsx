'use client';

import { ReactNode } from 'react';

import { AnimatePresence, MotionConfig } from 'framer-motion';

import { Layout } from '@/base/components/Layout';
import { ThemeProvider } from '@/base/components/Theme';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Layout>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  );
}
