import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { DEFAULT_THEME, THEME_COLORS } from '@/config/theme';

/** Page-level description and social copy. */
export const meta = {
  title: 'Windows PC Shutdown Timer & Bedtime App | SleepGuardian',
  description:
    'Set a bedtime curfew on Windows with SleepGuardian. Schedule automatic PC shutdowns, stay locked out until morning, and track your sleep streaks locally.',
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
  const url = new URL(path, `${siteConfig.siteUrl}/`).href;
  const image = {
    url: '/og/opengraph-image.png',
    width: 1200,
    height: 630,
    alt: meta.ogAlt,
    type: 'image/png',
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: meta.twitterCard,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
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
