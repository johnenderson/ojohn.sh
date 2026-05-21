'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { AnimatePresence } from 'framer-motion';

import { Layout } from 'Base/components/Layout';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Layout>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
