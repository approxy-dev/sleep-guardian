import Link from 'next/link';
import { Download } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  downloadHref,
  hasDownload,
  requestBuildHref,
  sectionHref,
  sectionIds,
} from '@/config/site';

type Variant = 'primary' | 'secondary' | 'ghost';

interface BaseProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

const sizes: Record<NonNullable<BaseProps['size']>, string> = {
  sm: 'px-3.5 py-2 text-[0.8125rem]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[0.9375rem]',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-sg-amber text-sg-amber-text font-semibold shadow-[0_10px_34px_-12px_rgb(255_183_77/0.7)] hover:bg-sg-amber-lift hover:shadow-[0_14px_40px_-12px_rgb(255_183_77/0.8)]',
  secondary: 'sg-glass text-sg-platinum hover:bg-sg-surface-2 hover:border-sg-hairline-strong',
  ghost: 'text-sg-silver-soft hover:text-sg-platinum hover:bg-sg-surface-1',
};

function classes(variant: Variant, size: NonNullable<BaseProps['size']>, extra?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200',
    'disabled:pointer-events-none disabled:opacity-55',
    variants[variant],
    sizes[size],
    extra,
  );
}

/* ------------------------------------------------------------------ link ---- */

interface ActionLinkProps extends BaseProps {
  readonly href: string;
  readonly variant?: Variant;
  readonly external?: boolean;
  readonly download?: boolean;
}

export function ActionLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
  download,
}: ActionLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes(variant, size, className)}
        {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer noopener' })}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

/* ----------------------------------------------------------------- button --- */

interface ActionButtonProps extends BaseProps {
  readonly onClick: () => void;
  readonly variant?: Variant;
  readonly type?: 'button' | 'submit';
  readonly ariaExpanded?: boolean;
  readonly ariaControls?: string;
}

export function ActionButton({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ariaExpanded,
  ariaControls,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes(variant, size, className)}
      {...(ariaExpanded === undefined ? {} : { 'aria-expanded': ariaExpanded })}
      {...(ariaControls === undefined ? {} : { 'aria-controls': ariaControls })}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- download - */

interface DownloadButtonProps {
  readonly children?: React.ReactNode;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
  /**
   * Where the button sends people before a release URL exists. This must be
   * route-absolute (e.g. `/#download`) so it still resolves when the button is
   * rendered from a legal page. Pass `null` for no fallback at all.
   */
  readonly fallbackHref?: string | null;
}

/**
 * The single download entry point.
 *
 * With `downloadHref` set it is a direct download. Without it, it links to the
 * fallback the owner chose — the download section or the contact address — so
 * the button never points at a URL that does not exist.
 */
export function DownloadButton({
  children,
  size = 'md',
  className,
  fallbackHref = sectionHref(sectionIds.download),
}: DownloadButtonProps) {
  const href = downloadHref ?? fallbackHref ?? sectionHref(sectionIds.download);
  const isMail = href.startsWith('mailto:');

  return (
    <a
      href={href}
      className={classes('primary', size, className)}
      {...(isMail ? {} : { download: downloadHref !== null })}
    >
      <Download size={18} strokeWidth={2.25} aria-hidden="true" />
      {children ?? 'Download for Windows'}
    </a>
  );
}

/** Small inline link used where a full button is too heavy. */
export function TextLink({
  href,
  children,
  className,
}: {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cn(
          'font-medium text-sg-moon underline decoration-sg-moon/40 underline-offset-4 transition-colors hover:decoration-sg-moon',
          className,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'font-medium text-sg-moon underline decoration-sg-moon/40 underline-offset-4 transition-colors hover:decoration-sg-moon',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export { hasDownload, requestBuildHref };
