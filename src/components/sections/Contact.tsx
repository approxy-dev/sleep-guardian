import { Mail } from 'lucide-react';
import { Eyebrow, Panel } from '@/components/ui/Primitives';
import { Reveal } from '@/components/ui/Reveal';
import { contact } from '@/content/landing';
import { mailtoHref, sectionIds, siteConfig } from '@/config/site';

/**
 * Contact.
 *
 * A `mailto:` link, deliberately rather than a form. The site has no backend,
 * no database and no third-party script, and adding a mail relay to receive two
 * lines of copy would mean shipping a secret, a rate limiter and a spam surface
 * for no gain. See README.md -> "Contact form" if that trade ever changes.
 */
export function Contact() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="sg-shell">
        <Reveal>
          <Panel className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{contact.eyebrow}</Eyebrow>
            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-sg-platinum sm:text-4xl"
            >
              {contact.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-sg-silver-soft">
              {contact.lede}
            </p>

            <a
              href={mailtoHref}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-sg-amber px-6 py-3.5 text-[0.9375rem] font-semibold text-sg-amber-text transition-colors hover:bg-sg-amber-lift"
            >
              <Mail size={18} strokeWidth={2.25} aria-hidden="true" />
              {contact.ctaLabel}
            </a>
            <p className="sg-break mt-3 font-mono text-sm text-sg-silver-soft">
              {siteConfig.contactEmail}
            </p>

            <ul className="mx-auto mt-9 grid max-w-lg gap-2.5 border-t border-sg-hairline pt-7 text-left text-[0.875rem] text-sg-silver-soft">
              {contact.promise.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sg-amber"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
