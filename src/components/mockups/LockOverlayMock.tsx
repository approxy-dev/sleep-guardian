import { HeroCountdown } from '@/components/mockups/CountdownClock';
import { MockFrame, MockScrim } from '@/components/mockups/MockFrame';
import { hero } from '@/content/landing';

/**
 * Faithful recreation of the app's curfew lock screen.
 *
 * Source: `src/SleepGuardian.UI/Windows/LockOverlay.xaml` in the app repository.
 * Colours, sizes, corner radii, the card structure, the strapline, the quote
 * line and the grace-hour button are all taken from that file. The only thing
 * added for the web is a ticking clock, which the marketing page asks for.
 *
 * The app's own theme is a light silver one, so this card uses the `sg-ink-*`
 * tokens. That is intentional: it is what the software actually looks like.
 */
export function LockOverlayMock() {
  return (
    <MockScrim className="min-h-[26rem] sm:min-h-[30rem]">
      <MockFrame designWidth={720}>
        <div
          className="mx-auto w-full max-w-[720px] rounded-[20px] border-2 border-sg-graphite bg-white/95 p-[2.75em] text-center"
          style={{ boxShadow: '0 16px 24px rgb(0 0 0 / 0.45)' }}
          role="img"
          aria-label="The SleepGuardian lock screen: curfew active, counting down to the unlock time."
        >
          <p className="text-[4em] leading-none text-sg-ink-text" aria-hidden="true">
            😴
          </p>

          <p className="mt-[0.375em] text-[2.125em] font-bold leading-none tracking-tight text-sg-graphite">
            CURFEW ACTIVE
          </p>

          <p className="mt-[0.3125em] text-[1.25em] font-semibold leading-snug text-sg-ink-text">
            {hero.countdown.unlockLabel} {hero.countdown.time}
          </p>

          {/* Decorative ticker; the app shows a static unlock time here. */}
          <p className="mt-[0.5em] font-mono text-[1.5em] font-semibold tabular-nums text-sg-ink-text">
            <HeroCountdown />
          </p>

          <p className="mt-[0.75em] text-[0.875em] text-sg-ink-muted">
            SleepGuardian has you covered. Go rest. 🌙
          </p>

          <p className="mx-auto mt-[0.625em] max-w-[35em] text-[0.8125em] italic leading-relaxed text-sg-ink-muted">
            &ldquo;Your dreams tomorrow are built on the rest you take tonight.&rdquo;
          </p>

          <p className="mx-auto mt-[0.9375em] max-w-[35em] rounded-[10px] border border-sg-amber-border bg-[#fff3e0] px-[1em] py-[0.75em] text-[0.8125em] font-semibold leading-relaxed text-[#6d4c00]">
            🔓 Use 1-Hour Emergency Pass (once/week)
          </p>
        </div>
      </MockFrame>
    </MockScrim>
  );
}
