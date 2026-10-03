import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { DEFAULT_THEME, THEME_COLORS } from '@/config/theme';

/** Page-level description and social copy. */
export const meta = {
  title: "SleepGuardian — your PC won't let you stay up",
  description:
    'SleepGuardian is a Windows commitment device. It shuts your PC down at bedtime and keeps it down until morning. No reminders, no snooze, no bargaining at 1 a.m.',
  ogAlt: 'SleepGuardian — a Windows bedtime commitment device by Approxy',
  twitterCard: 'summary_large_image',
} as const;

interface PageMetaInput {
  readonly title: string;
  readonly description: string;
  /** Path only, e.g. `/privacy`. Omit for the landing page. */
  readonly path?: string;
  /** Suppress indexing for utility routes such as 404. */
  readonly noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  noIndex,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.siteUrl}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      url,
      title,
      description,
    },
    twitter: {
      card: meta.twitterCard,
      title,
      description,
    },
  };
}

/**
 * Browser-chrome colour.
 *
 * One unscoped meta rather than the usual `prefers-color-scheme` pair. The site
 * theme deliberately ignores the OS setting, so an OS-driven meta would colour
 * the address bar to match the visitor's system rather than the page they are
 * actually looking at.
 *
 * The pre-paint script in theme.ts rewrites this to whichever theme really gets
 * applied, and the header toggle keeps it in step afterwards. With JavaScript
 * off it stays here -- which is also the CSS default, so the two still agree.
 */
export const themeColors: string = THEME_COLORS[DEFAULT_THEME];
