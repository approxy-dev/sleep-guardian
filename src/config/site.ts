/**
 * Single source of truth for anything that is a *fact about the product or the
 * business*, as opposed to page copy.
 *
 * Rules
 *  - A `null` value hides its UI element. No component may render "undefined",
 *    an empty label, or a dead link because a value is missing.
 *  - Nothing here may be filled in with a guess. Every non-null entry is
 *    traceable to a file in the app repository; see DISCOVERY.md.
 *  - Editing this file is the only supported way to change product metadata.
 */

const DEV_SITE_URL = 'http://localhost:3000';

/**
 * Absolute origin, used for canonical URLs, sitemap entries, robots.txt and
 * JSON-LD.
 *
 * The production domain is not known, so it is never guessed. Set
 * `NEXT_PUBLIC_SITE_URL` in the deployment environment; until then the site
 * reports itself as `localhost`, which is wrong in production but visibly
 * wrong rather than silently pointing at a host nobody owns. A warning is
 * printed on the server (during `next build` and server renders) so the gap is
 * impossible to miss; it is deliberately never printed in the browser, where it
 * would only clutter a visitor's console.
 *
 * `process.env.NEXT_PUBLIC_SITE_URL` must be read as a literal property access.
 * Reading it through a captured `process.env` object stops Next from inlining
 * the value at build time, which leaves a bare `process` reference in the
 * client bundle and crashes hydration with "process is not defined".
 */
const siteUrl = (() => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    const flag = '__sleepguardianSiteUrlWarned';
    const scope = globalThis as Record<string, unknown>;
    if (!scope[flag]) {
      scope[flag] = true;
      console.warn(
        '[sleepguardian] NEXT_PUBLIC_SITE_URL is not set, so canonical URLs, ' +
          'sitemap.xml, robots.txt and JSON-LD will use ' +
          `${DEV_SITE_URL}. Set it in the deployment environment before launch.`,
      );
    }
  }

  return DEV_SITE_URL;
})();

/** Owner-supplied release URL. `null` until a public download location exists. */
const downloadUrl: string | null = null;

export const siteConfig = {
  name: 'SleepGuardian',
  tagline: 'Sleep on time. No excuses.',
  developer: 'Approxy',
  contactEmail: 'approxy-dev@gmail.com',
  siteUrl,

  /** Absolute download link, or `null` when the release is not published yet. */
  downloadUrl,

  /** Product facts. `null` renders nothing. */
  appVersion: '1.10.2',
  fileName: 'SleepGuardianSetup_1.10.2.exe',
  fileSize: '125 MB',
  supportedOS: 'Windows 10 or later, 64-bit',

  /** OpenGraph / theme colour — the app's own icon backing colour. */
  themeColor: '#141A30',
} as const;

export type SiteConfig = typeof siteConfig;

export const mailtoHref = `mailto:${siteConfig.contactEmail}`;

/** `true` once the owner has published a release URL. */
export const hasDownload = siteConfig.downloadUrl !== null;

/** Absolute href for the download, or `null` when unpublished. */
export const downloadHref: string | null = siteConfig.downloadUrl;

/** `mailto:` link that opens a pre-filled, polite request for the build. */
export const requestBuildHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
  'SleepGuardian download link',
)}&body=${encodeURIComponent(
  'Hi,\n\nI would like a download link for SleepGuardian ' +
    `(version ${siteConfig.appVersion ?? 'current'}).\n\nWhat I run: Windows `,
)}`;

/** Anchors exposed in the header and used by the landing page. */
export const sectionIds = {
  how: 'how-it-works',
  features: 'features',
  grace: 'grace-hour',
  trust: 'expectations',
  audience: 'who-its-for',
  faq: 'faq',
  download: 'download',
  contact: 'contact',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

/** Header links. Every target is a real route or a real in-page anchor. */
/**
 * Header links.
 *
 * Every href is route-absolute (`/#anchor`) rather than bare (`#anchor`) so
 * the links land on the landing page section even when rendered from
 * `/privacy`, `/terms` or `/security`, where a bare anchor would resolve to a
 * non-existent id on the current page.
 */
export const primaryNav = [
  { label: 'How it works', href: `/#${sectionIds.how}` },
  { label: 'Features', href: `/#${sectionIds.features}` },
  { label: 'Grace hour', href: `/#${sectionIds.grace}` },
  { label: 'Expectations', href: `/#${sectionIds.trust}` },
  { label: 'FAQ', href: `/#${sectionIds.faq}` },
] as const satisfies ReadonlyArray<{ label: string; href: string }>;

/** Route-absolute href for a landing-page section. */
export const sectionHref = (id: string): string => `/#${id}`;
