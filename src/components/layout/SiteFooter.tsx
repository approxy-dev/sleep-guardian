import Link from 'next/link';
import { Github, Mail } from 'lucide-react';
import { MoonMark } from '@/components/ui/MoonMark';
import { mailtoHref, siteConfig } from '@/config/site';

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Security', href: '/security' },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-sg-hairline">
      <div className="sg-shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <MoonMark size={26} />
              <span className="text-[0.9375rem] font-semibold tracking-tight text-sg-platinum">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sg-silver-soft">
              {siteConfig.name} is developed by{' '}
              <span className="text-sg-platinum">{siteConfig.developer}</span>. A commitment device
              for Windows, built for people who know they should sleep.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Legal">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sg-silver-soft">
                The small print
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sg-silver-soft transition-colors hover:text-sg-platinum"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sg-silver-soft">
                Contact
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={mailtoHref}
                    className="sg-break inline-flex items-center gap-2 text-sm text-sg-moon transition-colors hover:text-sg-platinum"
                  >
                    <Mail size={15} aria-hidden="true" />
                    {siteConfig.contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.githubUrl}
                    className="inline-flex items-center gap-2 text-sm text-sg-moon transition-colors hover:text-sg-platinum"
                  >
                    <Github size={15} aria-hidden="true" />
                    {siteConfig.developer} on GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sg-hairline pt-6 text-xs text-sg-silver-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.developer}. All rights reserved.
          </p>
          <p>Sleep on time. No excuses.</p>
        </div>
      </div>
    </footer>
  );
}
