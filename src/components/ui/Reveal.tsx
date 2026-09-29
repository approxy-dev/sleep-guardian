'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  readonly children: ReactNode;
  /** Stagger offset in seconds. */
  readonly delay?: number;
  readonly className?: string;
  readonly as?: 'div' | 'li' | 'section';
}

/**
 * Gentle on-scroll reveal.
 *
 * Motion is disabled entirely when the visitor asks for reduced motion, and a
 * `<noscript>` rule in the layout forces every reveal visible if scripts never
 * run, so content is never trapped behind an animation that cannot play.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
