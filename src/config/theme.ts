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

/**
 * The theme used when a visitor has expressed no preference of their own.
 *
 * Light, because that is the theme the app's own interface ships (Brand.xaml) —
 * the site should look like the product. The OS `prefers-color-scheme` is
 * deliberately NOT consulted: a first-time visitor gets light whatever their
 * system is set to, and only an explicit toggle moves them off it (after which
 * the choice is remembered).
 */
export const DEFAULT_THEME: Theme = 'light';

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
 * and dependency-free. It also repaints the browser-chrome `<meta
 * name="theme-color">` to match the theme it just chose — the server renders
 * that meta with the default colour only, and without this the address bar
 * would disagree with the page on any stored dark preference.
 *
 * Each step is guarded separately: localStorage can be unavailable (private
 * mode, blocked cookies) and must not stop the attribute being set, and the
 * theme attribute is set before the meta is touched so a failure in the
 * cosmetic step cannot change the theme.
 *
 * With JavaScript disabled none of this runs; the attribute is never set and
 * the CSS default (light) applies, which is the same theme this script picks.
 */
export const themeInitScript = `(function(){var d=document.documentElement,k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},C=${JSON.stringify(
  THEME_COLORS,
)},s=null;try{s=localStorage.getItem(k)}catch(e){}if(s!=='light'&&s!=='dark'){s=${JSON.stringify(
  DEFAULT_THEME,
)}}d.setAttribute('data-theme',s);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',C[s])})();`;
