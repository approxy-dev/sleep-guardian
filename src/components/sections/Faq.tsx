import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { faq } from '@/content/landing';
import { mailtoHref, sectionIds, siteConfig } from '@/config/site';

/**
 * Native `<details>` accordion.
 *
 * Chosen over a scripted one on purpose: keyboard operation, screen-reader
 * semantics, the open/closed state and in-page find all work with no JavaScript
 * at all, which is the strongest accessibility result available here.
 */
export function Faq() {
  return (
    <section
      id={sectionIds.faq}
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-heading"
              eyebrow={faq.eyebrow}
              title={faq.heading}
              align="left"
            />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-sg-silver-soft">
              Anything not covered here is a question worth asking.{' '}
              <a
                href={mailtoHref}
                className="sg-break text-sg-moon underline decoration-sg-moon/40 underline-offset-4 hover:decoration-sg-moon"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <Reveal as="div">
            <ul className="divide-y divide-sg-hairline overflow-hidden rounded-[var(--radius-card)] border border-sg-hairline bg-sg-surface-1">
              {faq.items.map((item) => (
                <li key={item.question}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sg-surface-2 sm:px-7">
                      <span className="text-[0.9375rem] font-semibold text-sg-platinum sm:text-base">
                        {item.question}
                      </span>
                      <Plus
                        size={18}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-sg-accent transition-transform duration-300 group-open:rotate-45"
                      />
                    </summary>
                    <div className="px-6 pb-6 pr-12 text-[0.9375rem] leading-relaxed text-sg-silver-soft sm:px-7 sm:pr-16">
                      {item.answer}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
