'use client';

import { FC, PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

export const AnimationLayout: FC<PropsWithChildren> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
