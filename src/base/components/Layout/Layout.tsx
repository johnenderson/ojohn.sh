import { FC, PropsWithChildren } from 'react';

import { Footer } from '@/base/components/Footer';
import { AnimationLayout } from '@/base/components/Layout/AnimationLayout';

// AnimationLayout here has two structural roles beyond the animation itself:
// 1. It renders the direct <body> child required by globals.css
//    (`body > *` sets position:relative + z-index:1 to sit above the noise overlay).
// 2. It wraps children + footer so they fade in together on first load.
// The AnimationLayout inside PageWrapper is a separate concern: it handles
// the enter transition on every client-side navigation.
export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <AnimationLayout>
    {children}
    <Footer />
  </AnimationLayout>
);
