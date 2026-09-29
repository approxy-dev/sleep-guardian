import type { CSSProperties, ReactNode } from 'react';

interface MockFrameProps {
  /**
   * Width the recreation was drawn at, in pixels. Every `em` inside must be
   * authored against a 16px base at this width.
   */
  readonly designWidth: number;
  readonly children: ReactNode;
  readonly className?: string;
  /** Smallest permitted base size, so text never becomes unreadable. */
  readonly minPx?: number;
  /** Largest permitted base size, so a wide viewport cannot over-inflate it. */
  readonly maxPx?: number;
}

/**
 * Scales a fixed-width interface recreation to the width of its container.
 *
 * The trick is that the design assumes a 16px root font at `designWidth`, so the
 * scale factor is simply `100cqw / (designWidth / 16)`. Everything inside is then
 * written in `em` and follows along.
 */
export function MockFrame({
  designWidth,
  children,
  className,
  minPx = 7.5,
  maxPx = 15,
}: MockFrameProps) {
  const style: CSSProperties = {
    // cqw / (designWidth / 16) == the on-screen size of one design pixel.
    fontSize: `clamp(${minPx}px, calc(100cqw / ${designWidth / 16}), ${maxPx}px)`,
  };

  return (
    <div className={`sg-mock ${className ?? ''}`}>
      <div style={style}>{children}</div>
    </div>
  );
}

/**
 * The dimmed backdrop the app's overlays sit on: `LockOverlay.xaml` `#CC000000`.
 *
 * The colour comes from `sg-scrim` rather than a literal `black/80` because a
 * fixed near-black panel is a hole punched in the light theme. The recreation
 * itself (the `sg-ink-*` card) is still fixed-light; only this backdrop follows
 * the site, so the card reads as a window floating on the current page.
 */
export function MockScrim({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-[1.25rem] bg-sg-scrim p-[1.5em] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
