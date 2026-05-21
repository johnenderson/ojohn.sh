'use client';

import { useRouter } from 'next/navigation';
import { CSSProperties, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { AnimatePresence } from 'framer-motion';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from 'kbar';

import { Layout } from 'Base/components/Layout';
import { Icon } from 'Base/components/SearchBar/Icon';
import { RenderResults } from 'Base/components/SearchBar/RenderResults';

const positionerStyle: CSSProperties = {
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  inset: '0px',
  padding: '14vh 16px 16px',
  background: 'rgba(0, 0, 0, .8)',
  boxSizing: 'border-box',
};

const animatorStyle: CSSProperties = {
  background: '#1b1b1b',
  maxWidth: '600px',
  width: '100%',
  color: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
};

const searchStyle: CSSProperties = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  margin: 0,
  background: '#1b1b1b',
  color: 'white',
};

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Ir para',
      perform: () => router.push('/'),
      icon: <Icon src="/home.svg" />,
    },
    {
      id: 'writings',
      name: 'Artigos',
      shortcut: ['g', 'w'],
      keywords: 'go-writings',
      section: 'Ir para',
      perform: () => router.push('/writings'),
      icon: <Icon src="/pencil.svg" />,
    },
    {
      id: 'github',
      name: 'Github',
      shortcut: ['f', 'g'],
      keywords: 'go-github',
      section: 'Social',
      perform: () => window.open('https://github.com/johnenderson', '_blank'),
      icon: <Icon src="/github.svg" />,
    },
    {
      id: 'twitter',
      name: 'Twitter',
      shortcut: ['f', 't'],
      keywords: 'go-twitter',
      section: 'Social',
      perform: () => window.open('https://twitter.com/johnenderson', '_blank'),
      icon: <Icon src="/twitter.svg" />,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['f', 'l'],
      keywords: 'go-linkedin',
      section: 'Social',
      perform: () =>
        window.open('https://linkedin.com/in/johnenderson', '_blank'),
      icon: <Icon src="/linkedin.svg" />,
    },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner>
            <div style={positionerStyle}>
              <KBarAnimator style={animatorStyle}>
                <KBarSearch style={searchStyle} />
                <RenderResults />
              </KBarAnimator>
            </div>
          </KBarPositioner>
        </KBarPortal>
        <Layout>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </Layout>
      </KBarProvider>
    </ThemeProvider>
  );
}
