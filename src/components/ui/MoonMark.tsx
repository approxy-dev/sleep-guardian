import { useId } from 'react';
import { cn } from '@/lib/cn';

interface MoonMarkProps {
  /** Rendered size in pixels. The mark is a square. */
  readonly size?: number;
  readonly className?: string;
  /** Crescent fill. Defaults to the app's icon colour. */
  readonly color?: string;
  /**
   * Draw the solid navy disc behind the crescent, exactly as the shipped
   * app.ico does. Only correct on a background close to the app's night colour.
   */
  readonly withBacking?: boolean;
}

/**
 * The SleepGuardian crescent, rebuilt from the shipped `assets/app.ico`.
 *
 * Measured geometry (256px frame): body circle centre (143, 121) r 73 in
 * #FFD878, cut circle centre (182, 81) r 73 in #141A30. The same construction
 * appears in the app's `tools/GenerateIcons/Program.cs`.
 *
 * A mask is used instead of a hand-computed arc so the shape is provably
 * identical to the shipped bitmap rather than approximately similar.
 */
export function MoonMark({
  size = 32,
  className,
  color = 'var(--color-sg-moon)',
  withBacking = false,
}: MoonMarkProps) {
  const maskId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="SleepGuardian"
      focusable="false"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
          <rect width="256" height="256" fill="#000" />
          <circle cx="143" cy="121" r="73" fill="#fff" />
          <circle cx="182" cy="81" r="73" fill="#000" />
        </mask>
      </defs>

      {withBacking ? (
        <g>
          <circle cx="143" cy="121" r="73" fill="var(--color-sg-night)" />
          <circle cx="182" cy="81" r="73" fill="var(--color-sg-night)" />
        </g>
      ) : null}

      <circle cx="143" cy="121" r="73" fill={color} mask={`url(#${maskId})`} />
    </svg>
  );
}
