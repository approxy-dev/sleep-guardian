/**
 * Color-theme constants shared by the server (inline no-flash script, viewport
 * meta) and the client (the header toggle).
 *
 * The theme is a `data-theme` attribute on <html>. It lives here rather than in
 * a component so the storage key and the pre-paint script can never drift apart.
 */

export const THEME_STORAGE_KEY = 'sg-theme';

export const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];

/** The default when nothing is stored and the OS preference cannot be read. */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Browser-chrome colour per theme, for `<meta name="theme-color">`.
 * Light matches the `--color-sg-bg` light page base. Dark uses the app icon's
 * own backing colour (`siteConfig.themeColor`) rather than the darker page base,
 * so a dark-mode browser bar reads as brand navy instead of near-black.
 */
export const THEME_COLORS: Record<Theme, string> = {
  light: '#eef1f5',
  dark: '#141A30',
};

/**
 * Runs before first paint so there is no flash of the wrong theme. Kept tiny
 * and dependency-free. With JavaScript disabled the attribute is never set and
 * the CSS default (dark) applies.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);if(s!=='light'&&s!=='dark'){s=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',s)}catch(e){document.documentElement.setAttribute('data-theme',${JSON.stringify(
  DEFAULT_THEME,
)})}})();`;
