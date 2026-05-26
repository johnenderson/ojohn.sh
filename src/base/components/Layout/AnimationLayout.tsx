'use client';

import { FC, PropsWithChildren } from 'react';

import { motion } from 'motion/react';

export const AnimationLayout: FC<PropsWithChildren> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
