import { SectionHeading } from '@/components/ui/Primitives';
import { features } from '@/content/landing';
import { sectionIds } from '@/config/site';

export function Features() {
  return (
    <section
      id={sectionIds.features}
      aria-labelledby="features-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <SectionHeading
          id="features-heading"
          eyebrow={features.eyebrow}
          title={features.heading}
          lede={features.lede}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className="sg-glass group rounded-[var(--radius-card)] p-6 transition-colors duration-300 hover:border-sg-hairline-strong hover:bg-sg-surface-2"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sg-hairline bg-sg-surface-2 text-sg-accent transition-colors group-hover:border-sg-accent/40"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-sg-platinum">{feature.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                  {feature.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
