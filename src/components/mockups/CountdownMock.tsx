import { CountdownRing } from '@/components/mockups/CountdownClock';
import { MockFrame, MockScrim } from '@/components/mockups/MockFrame';

/**
 * Faithful recreation of the pre-shutdown countdown overlay.
 *
 * Source: `src/SleepGuardian.UI/Windows/CountdownOverlay.xaml` — a 640px card with
 * the `StreakRing` progress ring (ArcBrush #FFB74D, TrackBrush #C0C0C0), a 60px
 * Consolas countdown, the amber "SAVE YOUR WORK NOW" line, and the unlock hint.
 */
export function CountdownMock() {
  return (
    <MockScrim>
      <MockFrame designWidth={640}>
        <div
          className="rounded-[18px] border-2 border-sg-graphite bg-white/95 px-[1.75em] py-[1.375em]"
          style={{ boxShadow: '0 12px 3px rgb(0 0 0 / 0.35)' }}
          role="img"
          aria-label="The countdown shown a minute before curfew, with a progress ring and the shutdown time."
        >
          <div className="flex items-center gap-[1.625em]">
            <div className="relative shrink-0">
              <CountdownRing progress={0.34} />
              <span
                className="absolute inset-0 flex items-center justify-center text-[2.5em] leading-none text-sg-ink-text"
                aria-hidden="true"
              >
                🌙
              </span>
            </div>

            <div className="min-w-0 flex-1 text-center">
              <p className="text-[1.625em] font-bold leading-tight text-sg-graphite">
                CURFEW INCOMING
              </p>
              <p className="mt-[0.25em] font-mono text-[3.75em] font-bold leading-none text-sg-ink-text">
                00:41
              </p>
              <p className="mt-[0.375em] text-[1.0625em] font-semibold text-sg-amber-ink">
                SAVE YOUR WORK NOW
              </p>
              <p className="mt-[0.5em] text-[0.75em] text-sg-ink-muted">
                Unlocks at 06:00 &middot; 8-hour window
              </p>
            </div>
          </div>
        </div>
      </MockFrame>
    </MockScrim>
  );
}
