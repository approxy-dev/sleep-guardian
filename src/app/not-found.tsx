import Link from 'next/link';
import { MoonMark } from '@/components/ui/MoonMark';
import { ActionLink } from '@/components/ui/Button';
import { notFound } from '@/content/legal';
import { mailtoHref, siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="sg-shell">
        <div className="mx-auto max-w-xl text-center">
          <MoonMark size={56} className="mx-auto" />
          <p className="mt-8 font-mono text-sm font-semibold tracking-[0.2em] text-sg-accent">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-sg-platinum sm:text-4xl">
            {notFound.title}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
            {notFound.lede}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionLink href="/" size="lg">
              {notFound.cta}
            </ActionLink>
            <ActionLink href={mailtoHref} variant="secondary" size="lg">
              Report a broken link
            </ActionLink>
          </div>

          <nav aria-label="Site pages" className="mt-12 border-t border-sg-hairline pt-8">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Security', href: '/security' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sg-silver-soft transition-colors hover:text-sg-platinum"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-8 text-sm text-sg-silver-soft">
            {siteConfig.name} is developed by {siteConfig.developer}.
          </p>
        </div>
      </div>
    </section>
  );
}
