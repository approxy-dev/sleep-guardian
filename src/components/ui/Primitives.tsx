import { cn } from '@/lib/cn';

/** Amber eyebrow label used above every section heading. */
export function Eyebrow({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-sg-accent',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-sg-accent/50" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly lede?: string;
  readonly align?: 'left' | 'center';
  readonly className?: string;
  readonly headingLevel?: 'h2' | 'h3';
  readonly id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  headingLevel = 'h2',
  id,
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          'text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-sg-platinum sm:text-4xl lg:text-[2.75rem]',
          headingLevel === 'h3' && 'sm:text-3xl',
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            'text-base leading-relaxed text-sg-silver-soft sm:text-[1.0625rem]',
            align === 'center' ? 'max-w-2xl' : 'max-w-2xl',
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Frosted panel used for every card-like surface on the site. */
export function Panel({
  children,
  className,
  as: Tag = 'div',
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: 'div' | 'article' | 'li' | 'section';
}) {
  return (
    <Tag
      className={cn(
        'sg-glass rounded-[var(--radius-card)] p-6 transition-colors duration-300 sm:p-7',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
