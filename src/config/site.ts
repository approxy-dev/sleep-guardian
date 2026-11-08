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

const DEFAULT_SITE_URL = 'https://sleepguardian.vercel.app';
const LEGACY_SITE_URL = 'https://sleep-guardian-lake.vercel.app';

/**
 * Absolute origin, used for canonical URLs, sitemap entries, robots.txt and
 * JSON-LD.
 *
 * Default to the verified production homepage listed on the GitHub repository.
 * `NEXT_PUBLIC_SITE_URL` can override it when the public domain changes. Local
 * and preview builds keep the production canonical instead of advertising
 * localhost or competing preview URLs to search engines.
 *
 * `process.env.NEXT_PUBLIC_SITE_URL` must be read as a literal property access.
 * Reading it through a captured `process.env` object stops Next from inlining
 * the value at build time, which leaves a bare `process` reference in the
 * client bundle and crashes hydration with "process is not defined".
 */
const siteUrl = (() => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  const url = new URL(configured);

  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin without a path.');
  }

  // Old Vercel environments may still contain the retired domain. Its redirect
  // must not become the canonical target of pages on the new public homepage.
  return url.origin === LEGACY_SITE_URL ? DEFAULT_SITE_URL : url.origin;
})();

/**
 * Owner-supplied release URL, pinned to the v1.10.2 GitHub release asset on the
 * site repository. `null` until a public download location exists.
 *
 * Pinned rather than `releases/latest` on purpose: the link a visitor clicks
 * must always resolve to the exact build the page describes, and must never
 * silently start serving a newer one. GitHub serves the asset with
 * `Content-Disposition: attachment`, which is what makes the browser save the
 * file rather than navigate to it -- the HTML `download` attribute is ignored
 * for cross-origin URLs.
 */
const downloadUrl: string | null =
  'https://github.com/approxy-dev/sleep-guardian/releases/download/v1.10.2/SleepGuardianSetup_1.10.2.exe';

export const siteConfig = {
  name: 'SleepGuardian',
  tagline: 'Sleep on time. No excuses.',
  developer: 'Approxy',
  contactEmail: 'approxydev@gmail.com',

  /**
   * Owner's GitHub account, where the site source and the pinned release asset
   * live. A public profile that has been verified rather than guessed, per the
   * rule at the top of this file.
   */
  githubUrl: 'https://github.com/approxy-dev',
  repositoryUrl: 'https://github.com/approxy-dev/sleep-guardian',
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
