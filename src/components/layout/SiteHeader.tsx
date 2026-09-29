'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MoonMark } from '@/components/ui/MoonMark';
import { DownloadButton } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { primaryNav, sectionHref, sectionIds, siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

/** Sticky, slim navigation. Anchors land on the landing page from any route. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled ? 'sg-glass' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="sg-shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full py-1 pr-2 text-sg-platinum"
          aria-label={`${siteConfig.name} home`}
        >
          <MoonMark size={26} />
          <span className="text-[0.9375rem] font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-sg-silver-soft transition-colors hover:bg-sg-surface-1 hover:text-sg-platinum"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DownloadButton size="sm" className="hidden sm:inline-flex" />

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sg-hairline text-sg-platinum transition-colors hover:bg-sg-surface-2 lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="sg-glass border-t border-sg-hairline lg:hidden"
      >
        <nav aria-label="Primary, mobile" className="sg-shell flex flex-col gap-1 py-4">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-sg-silver-soft transition-colors hover:bg-sg-surface-1 hover:text-sg-platinum"
            >
              {item.label}
            </a>
          ))}
          <a
            href={sectionHref(sectionIds.download)}
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm text-sg-silver-soft transition-colors hover:bg-sg-surface-1 hover:text-sg-platinum"
          >
            Download
          </a>
          <div className="pt-2 sm:hidden">
            <DownloadButton className="w-full" fallbackHref={sectionHref(sectionIds.download)} />
          </div>
        </nav>
      </div>
    </header>
  );
}
