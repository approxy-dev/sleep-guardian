import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading } from '@/components/ui/Primitives';
import { TextLink } from '@/components/ui/Button';
import { expectations } from '@/content/landing';
import { sectionIds } from '@/config/site';

export function Expectations() {
  return (
    <section
      id={sectionIds.trust}
      aria-labelledby="trust-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <SectionHeading
          id="trust-heading"
          eyebrow={expectations.eyebrow}
          title={expectations.heading}
          lede={expectations.lede}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="sg-glass rounded-[var(--radius-card)] p-7 sm:p-9">
            <Eyebrow>Read this before you install</Eyebrow>
            <ul className="mt-6 space-y-6">
              {expectations.items.map((item) => (
                <li key={item.title} className="border-l-2 border-sg-accent/40 pl-5">
                  <h3 className="text-[1.0625rem] font-semibold text-sg-platinum">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-sg-silver-soft">
            <AlertTriangle size={15} className="text-sg-accent" aria-hidden="true" />
            <span>
              Nothing above is softened. The detail is on the{' '}
              <TextLink href={expectations.ctaHref}>{expectations.ctaLabel}</TextLink>.
            </span>
            <ArrowRight size={15} className="hidden text-sg-accent sm:inline" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
