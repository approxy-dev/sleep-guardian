import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { THEME_COLORS } from '@/config/theme';

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

export const themeColors: { media: string; color: string }[] = [
  { media: '(prefers-color-scheme: light)', color: THEME_COLORS.light },
  { media: '(prefers-color-scheme: dark)', color: THEME_COLORS.dark },
];
