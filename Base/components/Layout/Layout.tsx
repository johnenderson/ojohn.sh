import { FC, PropsWithChildren } from 'react';

import { Footer } from 'Base/components/Footer';
import { AnimationLayout } from 'Base/components/Layout/AnimationLayout';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <AnimationLayout>
    {children}
    <Footer />
  </AnimationLayout>
);
