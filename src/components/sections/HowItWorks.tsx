import { SectionHeading } from '@/components/ui/Primitives';
import { ConfirmDialogMock } from '@/components/mockups/ConfirmDialogMock';
import { CountdownMock } from '@/components/mockups/CountdownMock';
import { LockOverlayMock } from '@/components/mockups/LockOverlayMock';
import { DashboardMock } from '@/components/mockups/DashboardMock';
import { howItWorks, type Step } from '@/content/landing';
import { sectionIds } from '@/config/site';

function Visual({ kind }: { readonly kind: Step['visual'] }) {
  switch (kind) {
    case 'confirm':
      return <ConfirmDialogMock />;
    case 'power':
      return <CountdownMock />;
    case 'lock':
      return <LockOverlayMock />;
    case 'wake':
      return <DashboardMock />;
  }
}

export function HowItWorks() {
  return (
    <section
      id={sectionIds.how}
      aria-labelledby="how-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <SectionHeading
          id="how-heading"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.heading}
          lede={howItWorks.lede}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <ol className="mt-14 space-y-16 sm:space-y-20">
          {howItWorks.steps.map((step, index) => (
            <li key={step.number} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="sg-glass rounded-[1.75rem] p-4 sm:p-6">
                  <Visual kind={step.visual} />
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <p className="font-mono text-sm font-semibold tracking-[0.2em] text-sg-accent">
                  {step.number}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.015em] text-sg-platinum sm:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-sg-silver-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
