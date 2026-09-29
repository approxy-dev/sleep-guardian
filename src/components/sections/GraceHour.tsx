import { Check } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Primitives';
import { TextLink } from '@/components/ui/Button';
import { graceHour } from '@/content/landing';
import { sectionIds } from '@/config/site';

export function GraceHour() {
  return (
    <section
      id={sectionIds.grace}
      aria-labelledby="grace-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-sg-hairline bg-sg-surface-1 p-8 sm:p-12">
          {/* Amber wash, so this reads as the one rule that bends. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgb(255 183 77 / 18%), transparent 70%)',
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <Eyebrow>{graceHour.eyebrow}</Eyebrow>
              <h2
                id="grace-heading"
                className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-sg-platinum sm:text-4xl"
              >
                {graceHour.heading}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
                {graceHour.lede}
              </p>
              <p className="mt-6 text-sm text-sg-silver-soft">{graceHour.footnote}</p>
            </div>

            <ul className="grid gap-3">
              {graceHour.rules.map((rule) => (
                <li key={rule.label} className="sg-glass flex gap-4 rounded-2xl p-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sg-accent/40 text-sg-accent"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-sg-platinum">
                      {rule.label}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                      {rule.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative mt-8 text-sm text-sg-silver-soft">
            The full rule set, including what a pass can and cannot authorise, is on the{' '}
            <TextLink href="/security">security page</TextLink>.
          </p>
        </div>
      </div>
    </section>
  );
}
