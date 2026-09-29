import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Primitives';
import { buildMetadata } from '@/content/meta';
import type { LegalPage } from '@/content/legal';
import { mailtoHref, siteConfig } from '@/config/site';

interface LegalRouteProps {
  readonly page: LegalPage;
  /** Cross-links shown at the foot of the page. */
  readonly siblings: ReadonlyArray<{ label: string; href: string }>;
}

export function LegalRoute({ page, siblings }: LegalRouteProps) {
  return (
    <>
      <section className="pb-10 pt-14 sm:pt-20">
        <div className="sg-shell max-w-3xl">
          <Eyebrow>{siteConfig.name}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-sg-platinum sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sg-silver-soft">{page.intro}</p>
          <p className="mt-6 text-sm text-sg-silver-soft">
            Last reviewed <time dateTime={page.updated}>{page.updated}</time>.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="sg-shell max-w-3xl">
          <div className="space-y-12">
            {page.blocks.map((block) => (
              <div key={block.heading}>
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-sg-platinum sm:text-2xl">
                  {block.heading}
                </h2>

                {block.paragraphs ? (
                  <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {block.bullets ? (
                  <ul className="mt-4 space-y-3 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
                    {block.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 32)} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-sg-amber"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {block.note ? (
                  <p className="mt-5 rounded-2xl border border-sg-accent/25 bg-sg-accent/5 p-5 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                    {block.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-sg-hairline pt-8">
            <p className="text-sm text-sg-silver-soft">
              Questions about this page go to{' '}
              <a
                href={mailtoHref}
                className="sg-break text-sg-moon underline decoration-sg-moon/40 underline-offset-4 hover:decoration-sg-moon"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
            <nav aria-label="Other pages" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.href}
                  href={sibling.href}
                  className="text-sm text-sg-silver-soft transition-colors hover:text-sg-platinum"
                >
                  {sibling.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export function legalMetadata(page: LegalPage, path: string): Metadata {
  return buildMetadata({
    title: `${page.title} — ${siteConfig.name}`,
    description: page.description,
    path,
  });
}
