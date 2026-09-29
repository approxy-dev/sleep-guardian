'use client';

import { Moon, Sun } from 'lucide-react';
import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from '@/config/theme';
import { cn } from '@/lib/cn';

/** Reads the theme the pre-paint script (or a previous toggle) already applied. */
function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * Light/dark switch for the sticky header.
 *
 * Both icons are always in the DOM; CSS shows the one for the active theme
 * (`.sg-theme-icon-*` in globals.css). That keeps server and client markup
 * identical, so there is no hydration mismatch and no icon flicker.
 */
export function ThemeToggle({ className }: { readonly className?: string }) {
  function toggle() {
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Storage can be unavailable; the attribute above still switches the theme. */
    }

    // Keep the browser UI (address bar, etc.) in step with the chosen theme.
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute('content', THEME_COLORS[next]);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-sg-hairline text-sg-silver-soft transition-colors hover:bg-sg-surface-2 hover:text-sg-platinum',
        className,
      )}
    >
      <Sun size={17} className="sg-theme-icon-light" aria-hidden="true" />
      <Moon size={17} className="sg-theme-icon-dark" aria-hidden="true" />
    </button>
  );
}
