import type { Metadata } from 'next';
import Link from 'next/link';
import { DownloadButton } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Primitives';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/content/meta';
import { pcCurfewGuide as guide } from '@/content/pc-curfew-guide';
import { pcCurfewGuideJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = buildMetadata({
  title: guide.metaTitle,
  description: guide.description,
  path: guide.path,
});

const linkClass =
  'text-sg-moon underline decoration-sg-moon/40 underline-offset-4 hover:decoration-sg-moon';
const headingClass = 'text-2xl font-semibold tracking-tight text-sg-platinum sm:text-3xl';

export default function WindowsPcCurfewGuide() {
  return (
    <article className="pb-16 pt-10 sm:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pcCurfewGuideJsonLd()).replace(/</g, '\\u003c'),
        }}
      />
      <div className="sg-shell max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-sg-silver-soft">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Windows PC curfew guide</li>
          </ol>
        </nav>

        <header>
          <Eyebrow>{guide.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-sg-platinum sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sg-silver-soft">{guide.introduction}</p>
          <p className="mt-5 text-sm text-sg-silver-soft">
            By{' '}
            <a href={siteConfig.githubUrl} className={linkClass}>
              {siteConfig.developer}
            </a>
            {' · Published '}
            <time dateTime={guide.published}>November 8, 2026</time>
          </p>
        </header>

        <section aria-labelledby="before-heading" className="mt-12">
          <h2 id="before-heading" className={headingClass}>
            {guide.beforeHeading}
          </h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-relaxed text-sg-silver-soft">
            {guide.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="windows-heading" className="mt-12">
          <h2 id="windows-heading" className={headingClass}>
            {guide.windows.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-sg-silver-soft">{guide.windows.introduction}</p>
          <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed text-sg-silver-soft">
            {guide.windows.steps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="mt-5 rounded-2xl border border-sg-hairline bg-sg-surface-1 p-5 leading-relaxed text-sg-silver-soft">
            {guide.windows.note}
          </p>
          <p className="mt-4 text-sm">
            <a href={guide.windows.sourceUrl} className={linkClass}>
              {guide.windows.sourceLabel}
            </a>
          </p>
        </section>

        <section aria-labelledby="app-heading" className="mt-12">
          <h2 id="app-heading" className={headingClass}>
            {guide.app.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-sg-silver-soft">{guide.app.introduction}</p>
          <ol className="mt-6 space-y-6">
            {guide.app.steps.map((step, index) => (
              <li key={step.title}>
                <h3 className="text-lg font-semibold text-sg-platinum">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-sg-silver-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="comparison-heading" className="mt-12">
          <h2 id="comparison-heading" className={headingClass}>
            {guide.comparisonHeading}
          </h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-sg-hairline">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm leading-relaxed text-sg-silver-soft">
              <caption className="sr-only">
                Windows Task Scheduler and SleepGuardian bedtime features
              </caption>
              <thead className="bg-sg-surface-1 text-sg-platinum">
                <tr>
                  <th scope="col" className="p-4">
                    Feature
                  </th>
                  <th scope="col" className="p-4">
                    Windows shutdown task
                  </th>
                  <th scope="col" className="p-4">
                    SleepGuardian
                  </th>
                </tr>
              </thead>
              <tbody>
                {guide.comparison.map((row) => (
                  <tr key={row.feature} className="border-t border-sg-hairline">
                    <th scope="row" className="p-4 font-semibold text-sg-platinum">
                      {row.feature}
                    </th>
                    <td className="p-4">{row.windows}</td>
                    <td className="p-4">{row.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="questions-heading" className="mt-12">
          <h2 id="questions-heading" className={headingClass}>
            {guide.questionsHeading}
          </h2>
          <div className="mt-6 space-y-6">
            {guide.questions.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-sg-platinum">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-sg-silver-soft">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 leading-relaxed">
            <Link href="/security" className={linkClass}>
              Read the full security model
            </Link>
            {' · '}
            <Link href="/privacy" className={linkClass}>
              How local data is stored
            </Link>
          </p>
        </section>

        <section
          aria-labelledby="next-heading"
          className="mt-12 rounded-2xl border border-sg-hairline bg-sg-surface-1 p-6"
        >
          <h2 id="next-heading" className={headingClass}>
            {guide.nextHeading}
          </h2>
          <p className="mt-4 leading-relaxed text-sg-silver-soft">{guide.nextBody}</p>
          <DownloadButton className="mt-6">Download SleepGuardian for Windows</DownloadButton>
          <p className="mt-5 text-sm">
            <Link href="/#how-it-works" className={linkClass}>
              See the curfew screens and walkthrough
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
