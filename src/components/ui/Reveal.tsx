import type { ReactNode } from 'react';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: 'div' | 'li' | 'section';
}

/**
 * Gentle on-scroll reveal.
 *
 * The animation lives in CSS (`.sg-reveal` in globals.css) rather than in
 * JavaScript, which is the whole point: there is no hydration step and no
 * motion library that can fail to run and leave a section stranded at
 * `opacity: 0`. Browsers without scroll-driven animation support, and visitors
 * who ask for reduced motion, get the content immediately and untouched.
 *
 * Server component on purpose — nothing here needs state or effects.
 */
export function Reveal({ children, className, as: Tag = 'div' }: RevealProps) {
  return <Tag className={className ? `sg-reveal ${className}` : 'sg-reveal'}>{children}</Tag>;
}
