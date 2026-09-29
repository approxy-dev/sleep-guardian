import { SectionHeading } from '@/components/ui/Primitives';
import { audience } from '@/content/landing';
import { sectionIds } from '@/config/site';

export function WhoItsFor() {
  return (
    <section
      id={sectionIds.audience}
      aria-labelledby="audience-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <SectionHeading
          id="audience-heading"
          eyebrow={audience.eyebrow}
          title={audience.heading}
          lede={audience.lede}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {audience.cards.map((card, index) => (
            <li
              key={card.title}
              className="sg-glass relative overflow-hidden rounded-[var(--radius-card)] p-7"
            >
              <span
                aria-hidden="true"
                className="font-mono text-4xl font-semibold text-sg-silver/60"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-sg-platinum">{card.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
