'use client';

import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedSection = ({ children, initial, animate, transition, className }: any) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedHover = ({ children, whileHover, whileTap, className }: any) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
    >
      {children}
    </motion.div>
  );
};
