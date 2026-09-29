import { SectionHeading } from '@/components/ui/Primitives';
import { problem } from '@/content/landing';

export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="py-16 sm:py-20">
      <div className="sg-shell">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            id="problem-heading"
            eyebrow={problem.eyebrow}
            title={problem.heading}
            className="text-center [&>p:first-child]:justify-center"
          />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
            {problem.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
