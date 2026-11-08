# SleepGuardian search audit

Reviewed November 8, 2026. Production origin: <https://sleepguardian.vercel.app>.

## Findings and changes

| Priority | Finding and evidence                                                                                                                                                                              | Resolution                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| High     | The new homepage returned 200, but its canonical, OpenGraph URLs, robots sitemap reference and JSON-LD still named `sleep-guardian-lake.vercel.app`. The browser DOM confirmed the old canonical. | Canonical, social, sitemap and schema URLs now resolve to the new origin. The retired origin is also migrated when supplied through an old `NEXT_PUBLIC_SITE_URL` value. |
| High     | The owner had not verified Search Console.                                                                                                                                                        | Published the exact owner-provided `google9f3fb088d8fefe90.html` file. The owner completes verification in Google; this repository cannot grant access to that account.  |
| Medium   | The old hostname returned temporary 307 redirects for `/`, `/privacy` and `/security?from=old`, preserving paths and queries.                                                                     | Keep the old hostname attached. Change its Vercel domain redirect to permanent 308. This is a Vercel account setting and is not changed by publishing the repository.    |
| Medium   | Landing copy described the product but did not name the Windows bedtime use case in its introductory label.                                                                                       | Added clear product/category wording and a descriptive curfew walkthrough heading without changing the hero headline or page design.                                     |
| Medium   | No standalone setup page answered how to choose a shutdown schedule versus a curfew that continues after reboot.                                                                                  | Added `/guides/windows-pc-curfew`, linked from the homepage walkthrough and shared footer, with a self-canonical, dated Article and breadcrumb data.                     |

The site remains statically generated. Fonts remain self-hosted and the
secondary monospaced font is not preloaded. No ratings, prices or testimonials
have been invented for structured data.

## Search intent map

| Page                        | Main intent                                | Natural query themes                                                       |
| --------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `/`                         | Find and download the product              | SleepGuardian; Windows PC curfew app; Windows bedtime shutdown app         |
| `/guides/windows-pc-curfew` | Learn how to set up a bedtime curfew       | how to set a PC curfew on Windows; bedtime shutdown versus overnight lock  |
| `/security`                 | Understand the commitment and escape model | SleepGuardian curfew restrictions; disabling or uninstalling SleepGuardian |
| `/privacy`                  | Understand local data handling             | SleepGuardian privacy and local history                                    |
| `/terms`                    | Product terms                              | SleepGuardian terms                                                        |

These are topic targets, not measured keyword volumes or verified ranking
positions. Search Console was not connected during this audit, so there is no
verified ranking, impression or click baseline. An SEO score is not a Google
search position, and no code change can guarantee a top-three result.

## Finish indexing in Google Search Console

1. Add a **URL-prefix** property for `https://sleepguardian.vercel.app/`.
2. Choose **HTML file upload** and click **Verify**. The exact owner-provided
   file is already available at
   <https://sleepguardian.vercel.app/google9f3fb088d8fefe90.html>. Keep it in
   `public/` after verification because Google may recheck ownership.
3. In **Sitemaps**, submit `sitemap.xml`.
4. Inspect the homepage and setup guide. Confirm the live test succeeds, then
   request indexing once for each. Indexing and rankings remain Google's decision.
5. In **Performance → Search results**, track queries, impressions, clicks, CTR
   and average position. Review query/page pairs over several weeks before
   making further title changes.

For a complete domain migration, verify the old URL-prefix property too if you
control it, use Google's Change of Address tool when eligible, and keep the old
hostname's permanent redirects working. Do not remove the old hostname to make
it return 404.

## Continue improving discovery

Keep the GitHub repository homepage and README linked to the new public site.
Maintain the setup guide when the shipped app changes. Earn relevant references
by publishing accurate release notes, documentation and demonstrations; do not
buy links or generate near-duplicate keyword pages.

## Verification

Run `npm run check`, `npm run build`, and `npm run test:seo`. The SEO check
examines the actual generated HTML and crawler output, including all five
canonical routes, internal links, schema references and invalid-origin handling.
Browser checks verify the rendered page and structured data after hydration.
These checks do not substitute for Search Console index status or Google's
rich-result eligibility rules.

References: [Google site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes),
[ownership verification](https://support.google.com/webmasters/answer/9008080),
[sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[Search Console performance](https://support.google.com/webmasters/answer/7576553),
[Microsoft shutdown reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown).
