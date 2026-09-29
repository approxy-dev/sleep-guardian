import { DownloadButton, ActionLink } from '@/components/ui/Button';
import { LockOverlayMock } from '@/components/mockups/LockOverlayMock';
import { hero } from '@/content/landing';
import { sectionHref, sectionIds, siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="sg-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-sg-hairline bg-sg-surface-1 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sg-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sg-amber" />
              {hero.eyebrow}
            </p>

            <h1 className="text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-sg-platinum sm:text-[3.5rem] lg:text-[4rem]">
              {hero.headline[0]}
              <br />
              <span className="text-sg-moon">{hero.headline[1]}</span>
              <br />
              <span className="text-sg-silver-soft">{hero.headline[2]}</span>
            </h1>

            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-sg-silver-soft sm:text-lg">
              {hero.lede}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <DownloadButton size="lg" fallbackHref={sectionHref(sectionIds.download)} />
              <ActionLink href={sectionHref(sectionIds.how)} variant="secondary" size="lg">
                {hero.secondaryCta}
              </ActionLink>
            </div>

            {siteConfig.supportedOS ? (
              <p className="text-sm text-sg-silver-soft">
                {siteConfig.supportedOS}
                {siteConfig.appVersion ? <> · version {siteConfig.appVersion}</> : null}
              </p>
            ) : null}
          </div>

          <div className="relative">
            {/* Amber halo behind the overlay, derived from the app's accent. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(60% 55% at 50% 45%, rgb(255 183 77 / 22%), transparent 70%)',
              }}
            />
            <LockOverlayMock />
            <p className="mt-4 text-center text-xs text-sg-silver-soft">
              The lock screen as the app renders it, recreated from{' '}
              <span className="text-sg-silver">LockOverlay.xaml</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
