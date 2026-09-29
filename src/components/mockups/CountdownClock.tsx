'use client';

import { useEffect, useState } from 'react';

/** Ticks once per second; returns `null` before the first interval fires. */
function useSeconds() {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const base = 5 * 3600 + 41 * 60 + 22; // 05:41:22 — an arbitrary but plausible night.

    // With reduced motion the clock is shown once and left alone.
    if (reduce.matches) {
      setSeconds(base);
      return;
    }

    let remaining = base;
    setSeconds(remaining);

    const id = window.setInterval(() => {
      remaining -= 1;
      setSeconds(remaining);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return seconds;
}

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

/**
 * A still-but-living countdown for the lock-overlay recreation.
 *
 * This is decoration for the marketing page, not app behaviour: the real lock
 * screen shows a static unlock time. It is driven entirely by the interval
 * above, so nothing here can affect the static rendering of the page.
 */
export function HeroCountdown() {
  const seconds = useSeconds();

  if (seconds === null) {
    return <span className="text-[1em] font-semibold tabular-nums text-sg-ink-text">05:41:22</span>;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <span className="text-[1em] font-semibold tabular-nums text-sg-ink-text">
      {pad(hours)}:{pad(minutes)}:{pad(secs)}
    </span>
  );
}

/**
 * The countdown ring in the pre-shutdown overlay.
 *
 * CountdownOverlay.xaml draws a `StreakRing` whose arc runs amber and turns red
 * as the shutdown approaches; the same behaviour is reproduced here by
 * interpolating between the app's two colours.
 *
 * The ring is described entirely in viewBox units, so the whole thing scales
 * with the surrounding `em`-based recreation while the stroke stays even.
 */
export function CountdownRing({
  /** 0..1, where 1 is a full ring and 0 is empty. */
  progress,
  /** Rendered side length in `em`, i.e. design pixels divided by 16. */
  sizeEm = 9.375,
  /** Native box from the XAML: 150x150 with a 12px stroke. */
  viewSize = 150,
  stroke = 12,
}: {
  readonly progress: number;
  readonly sizeEm?: number;
  readonly viewSize?: number;
  readonly stroke?: number;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const r = (viewSize - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped);

  // Amber #FFB74D at full ring, shifting to the overlay's alarm red #E53935.
  const heat = 1 - clamped;
  const toR = Math.round(0xff + (0xe5 - 0xff) * heat);
  const toG = Math.round(0xb7 + (0x39 - 0xb7) * heat);
  const toB = Math.round(0x4d + (0x35 - 0x4d) * heat);

  return (
    <svg
      width={`${sizeEm}em`}
      height={`${sizeEm}em`}
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* TrackBrush #C0C0C0, StrokeThickness from the XAML */}
      <circle
        cx={viewSize / 2}
        cy={viewSize / 2}
        r={r}
        fill="none"
        stroke="var(--color-sg-ink-card-border)"
        strokeWidth={stroke}
      />
      {/* ArcBrush #FFB74D, turning toward the overlay's red at zero */}
      <circle
        cx={viewSize / 2}
        cy={viewSize / 2}
        r={r}
        fill="none"
        stroke={`rgb(${toR}, ${toG}, ${toB})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${viewSize / 2} ${viewSize / 2})`}
      />
    </svg>
  );
}
