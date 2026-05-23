import { Geist, Geist_Mono } from 'next/font/google';

import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';

import { DevPerformanceMeasurePatch } from './components/DevPerformanceMeasurePatch';
import { Providers } from './providers';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// Prevent FontAwesome from adding its CSS dynamically on the server (causes SSR errors)
config.autoAddCss = false;

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Site pessoal — artigos, notas e experimentos.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '64x64' },
    ],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <DevPerformanceMeasurePatch />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
