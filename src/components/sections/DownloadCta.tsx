import { Check, FileDown, Info } from 'lucide-react';
import { DownloadButton, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { download } from '@/content/landing';
import { downloadHref, requestBuildHref, sectionIds, siteConfig } from '@/config/site';

export function DownloadCta() {
  const facts: ReadonlyArray<{ label: string; value: string }> = [
    siteConfig.appVersion ? { label: 'Version', value: String(siteConfig.appVersion) } : null,
    siteConfig.fileSize ? { label: 'Download size', value: String(siteConfig.fileSize) } : null,
    siteConfig.supportedOS ? { label: 'Requires', value: String(siteConfig.supportedOS) } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <section
      id={sectionIds.download}
      aria-labelledby="download-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-sg-hairline bg-sg-surface-1 p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-24 h-80 w-80 rounded-full opacity-60 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgb(255 183 77 / 16%), transparent 70%)',
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <Eyebrow>{download.eyebrow}</Eyebrow>
              <h2
                id="download-heading"
                className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-sg-platinum sm:text-4xl"
              >
                {download.heading}
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-sg-silver-soft">
                {download.lede}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <DownloadButton size="lg" fallbackHref={requestBuildHref}>
                  {downloadHref ? 'Download for Windows' : 'Ask for the build'}
                </DownloadButton>
                {siteConfig.fileName ? (
                  <p className="font-mono text-sm text-sg-silver-soft">{siteConfig.fileName}</p>
                ) : null}
              </div>

              {facts.length > 0 ? (
                <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline gap-2">
                      <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-sg-silver-soft">
                        {fact.label}
                      </dt>
                      <dd className="font-mono text-sm text-sg-platinum">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {!downloadHref ? (
                <p className="mt-6 flex gap-3 rounded-2xl border border-sg-hairline bg-sg-surface-1 p-4 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                  <Info size={17} className="mt-0.5 shrink-0 text-sg-accent" aria-hidden="true" />
                  <span>
                    A public download link has not been published yet. Email{' '}
                    <TextLink href={requestBuildHref}>Approxy</TextLink> and you will get the
                    installer, or a note explaining when it is ready.
                  </span>
                </p>
              ) : null}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-sg-silver-soft">
                Installing
              </h3>
              <ol className="mt-5 space-y-5">
                {download.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sg-hairline font-mono text-xs font-semibold text-sg-accent"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-sg-platinum">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-sg-silver-soft">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-7 flex gap-3 rounded-2xl border border-sg-accent/25 bg-sg-accent/5 p-4 text-[0.875rem] leading-relaxed text-sg-silver-soft">
                <FileDown size={17} className="mt-0.5 shrink-0 text-sg-accent" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-sg-platinum">About SmartScreen. </span>
                  {download.unsignedNotice}
                </span>
              </p>
            </div>
          </div>

          <ul className="relative mt-9 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-sg-hairline pt-7 text-[0.875rem] text-sg-silver-soft">
            {[
              'Administrator rights needed to install',
              'No account, no telemetry, no network calls',
              'Your history is kept on uninstall',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={15} className="text-sg-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
