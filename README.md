# SleepGuardian website

Marketing and documentation site for **SleepGuardian**, a Windows bedtime
commitment device by Approxy.

The site is a static Next.js App Router build. There is no database, no API
route, no form handler, no analytics and no third-party script. The only
interactive JavaScript is the mobile navigation, the countdown animation and
scroll reveals.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Commands

| Command                | What it does                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                               |
| `npm run build`        | Production build                                                 |
| `npm run start`        | Serve the production build                                       |
| `npm run typecheck`    | `tsc --noEmit`                                                   |
| `npm run lint`         | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |
| `npm run format`       | Prettier, write mode                                             |
| `npm run format:check` | Prettier, verify only                                            |
| `npm run check`        | typecheck + lint + format:check                                  |
| `npm run brand:icons`  | Regenerate the favicon and app icons from the app repo           |

## Layout

```
src/
  app/
    layout.tsx        root layout, fonts, metadata, JSON-LD
    page.tsx          landing page
    privacy/          /privacy
    terms/            /terms
    security/         /security
    not-found.tsx     404
    manifest.ts       /manifest.webmanifest
    robots.ts         /robots.txt
    sitemap.ts        /sitemap.xml
    globals.css       design tokens, base layer, sg-* component utilities
  components/
    layout/           header, footer, skip link, legal page renderer
    sections/         one file per landing page section
    mockups/          faithful recreations of the WPF screens
    ui/               button, moon mark, primitives, reveal
  config/site.ts      every product fact, in one place
  content/            all copy: landing.ts, legal.ts, meta.ts
  lib/                jsonld.ts, cn.ts
tools/
  extract-brand-assets.ps1
```

## Editing content

**You should not need to touch a component to change what the site says.**

| To change                                   | Edit                     |
| ------------------------------------------- | ------------------------ |
| Landing page copy                           | `src/content/landing.ts` |
| Privacy / Terms / Security copy             | `src/content/legal.ts`   |
| Page titles and descriptions                | `src/content/meta.ts`    |
| Product facts, email, version, download URL | `src/config/site.ts`     |

Copy is kept in typed objects rather than JSX so it is easy to review in a
diff, easy to translate later, and impossible to accidentally break by deleting
a closing tag.

### `src/config/site.ts` is the only place product facts live

The rule is that a `null` value hides its UI element. A component never renders
`undefined`, an empty label, or a link to a URL that does not exist. If you add
a fact, give it a type that allows `null`, and guard the render.

```ts
appVersion: '1.10.2',       // shown
supportedOS: 'Windows 10 or later, 64-bit',
downloadUrl: null,          // hides the direct link; CTA falls back to email
```

## Turning on the download button

The product has no published release location, so `downloadUrl` is `null` and
every download button currently points at the download section or a pre-filled
email to Approxy. When a URL exists:

1. Set `downloadUrl` in `src/config/site.ts` to the absolute installer URL.
2. Nothing else needs to change. `hasDownload` and `downloadHref` are derived,
   so the header, hero and final CTA all become direct links, the `download`
   attribute is applied, and the "no public link yet" notice disappears on its
   own.

## Environment variables

| Variable               | Required      | Purpose                                                                                           |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | In production | Absolute origin, used for canonical URLs, OpenGraph URLs, `sitemap.xml`, `robots.txt` and JSON-LD |

Copy `.env.example` to `.env.local` for local work. If the variable is missing
in a production build, the site falls back to `http://localhost:3000` and logs
a warning at build time. This is deliberate: a wrong canonical is better than a
build that silently points at a domain nobody owns. Set it before deploying.

There are no other variables. There is no secret in this project, and nothing
in `.env` is ever shipped to the browser except an explicitly `NEXT_PUBLIC_`
one.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New → Project** and import it. The framework preset is
   detected as Next.js; leave the build command as `npm run build`.
3. Under **Settings → Environment Variables**, add
   `NEXT_PUBLIC_SITE_URL` with the production origin, e.g.
   `https://sleepguardian.example`. Apply it to Production, Preview and
   Development.
4. Deploy.

No `vercel.json` is included because none is needed. Headers are already
declared in `next.config.ts` and are applied on every route. If you need a
deployment-level redirect or header rewrite later, add the file then.

Preview builds will show `http://localhost:3000` as the canonical origin unless
you also set the variable for the Preview environment. That is harmless — the
pages are noindex-by-default in practice because the domain does not resolve —
but set it anyway if you care about share previews.

## Before launch checklist

The site ships in a state that is complete and safe to show, but three things
must be true before it can be your public launch:

- [ ] `NEXT_PUBLIC_SITE_URL` is set in Vercel (Production, Preview, and
      Development). Until then every canonical, `sitemap.xml` entry, `robots.txt`
      line and JSON-LD URL says `localhost`. The production build prints a warning
      until it is set, so the gap is visible, not silent.
- [ ] `downloadUrl` in `src/config/site.ts` is set to the published installer
      URL. Until it is `null`, the download CTA intentionally sends people to email
      instead of a dead link. Setting it is a one-line change; every download
      button becomes a direct link automatically.
- [ ] The Terms and Privacy pages have been reviewed by whoever is legally
      responsible. They are written from the app's actual licence and behaviour,
      but they are not lawyer-reviewed.

Two one-strings that must not drift out of sync with the product: if the
installer gets code-signed, update `download.unsignedNotice` in
`src/content/landing.ts`; and the whole legal bundle can change as the product
does, so re-read [`DISCOVERY.md`](./DISCOVERY.md) §12 the day you launch.

## Design system

Tokens live in `src/app/globals.css` under `@theme`, and each one carries a
comment naming the file it was read from. Every colour on the site is either
read straight out of the app's XAML theme or a clearly-marked derived step.

The app ships a single light silver theme, so the site is dark-first and uses
the app icon's own backing colour (`#141A30`). The interface recreations inside
`src/components/mockups/` reproduce the app's actual light theme. The full
rationale and the token-by-token source list are in [DISCOVERY.md](./DISCOVERY.md).

### Light and dark

The site has a theme switch in the header. It is a CSS-level switch, not two
stylesheets: `:root` carries the dark values and `:root[data-theme='light']`
overrides only the tokens that have to move.

Three tokens carry the whole switch:

| Token         | Role                                                           |
| ------------- | -------------------------------------------------------------- |
| `sg-bg`       | Page base                                                      |
| `sg-platinum` | Primary text                                                   |
| `sg-accent`   | Every accent that is not a fill: eyebrows, icons, links, focus |

`sg-accent` exists so light mode does not have to reuse the app's `#ffb74d`.
That amber is a _button fill_ and stays `#ffb74d` in both themes, because the
recreations have to stay faithful to the app. As light-on-light text it is only
4.5:1 and it fails AA, so the light theme uses `#8a5200` (7.0:1) instead and the
dark theme keeps the app value.

The remaining light overrides are the two muted silvers, `sg-moon`, the
`sg-surface-*` panel tints, and the two hairlines. Anything that only exists to
describe a mockup is deliberately left alone - see below.

### How the choice is stored

`data-theme` is set on `<html>` by a tiny inline script in
`src/app/layout.tsx`, before first paint, so there is no flash of the wrong
theme. The script reads `localStorage['sg-theme']` and, if nothing is stored,
falls back to `prefers-color-scheme`. The key, the fallback and the pre-paint
script all live in `src/config/theme.ts` so they cannot drift apart.

With JavaScript disabled the attribute is never set and the CSS default (dark)
applies, so the page is never unstyled or unreadable. The toggle's two icons are
swapped in CSS rather than React, so there is no hydration mismatch.

### Interface recreations

`LockOverlayMock`, `CountdownMock`, `ConfirmDialogMock` and `DashboardMock` are
rebuilt from the WPF XAML, not screenshotted. Each is written at a fixed design
width in `em` units and scaled by a single `cqw` expression, so they stay sharp
at any size without `transform: scale` and without JavaScript.

If the app's UI changes, update these by hand. They will not update themselves.

The recreations are pinned to the `sg-ink-*` tokens and are never overridden by
the theme switch, so they look identical in light and dark. A screenshot of the
dark site contains screenshots of the app's _light_ UI, which is correct: that is
what the app looks like. Anything inside these components that needs a mock
chrome line or a track colour must use `sg-ink-card-border` / `sg-ink-line`,
not `sg-silver` / `sg-silver-soft`, or it will shift with the theme.

The one thing that _does_ follow the theme is the backdrop in `MockScrim`, via
`sg-scrim`. It used to be a literal `bg-black/80` — correct for the dark page,
but on the light page it was a black rounded rectangle around the "CURFEW
ACTIVE" card. Its light value is a soft ink wash instead, so the fixed-white
recreation still reads as a window sitting on the page.

## Accessibility

- Skip link to `#main` as the first focusable element.
- One `h1`, then `h2` per section; heading order never skips a level.
- The FAQ uses native `<details>`/`<summary>`, so it is keyboard operable and
  works with a screen reader with no extra JavaScript.
- `prefers-reduced-motion` is honoured both in CSS and in the Framer Motion
  reveal component, which renders plain elements for those users.
- All decorative recreations are `role="img"` with a real `aria-label`, or
  `aria-hidden` where they are purely ornamental.
- Visible focus ring on every interactive element, using `sg-accent`, so it
  stays visible in both themes.
- Both themes are checked, not just the default one: Lighthouse reports zero
  colour-contrast failures for dark and light alike. Auditing only the default
  theme is how the light palette's first draft shipped at 96.
- Colour is never the only signal.

## Content rules

This site deliberately contains no commercial information of any kind. There
is no store, no pricing, no plans, no subscriptions and no checkout. The
product has none, and inventing one would be a lie the app could not honour.

It also contains no testimonials, user counts, ratings, performance benchmarks
or uptime claims, because no evidence for any of them exists. The full list of
what is not claimed, and why, is in [DISCOVERY.md](./DISCOVERY.md).

If you add a claim, add its source to DISCOVERY.md in the same change.

## Contact form

There is none, on purpose. A `mailto:` link is honest about the fact that you
read the address yourself, and a form would mean a mail relay credential, a
rate limiter, a spam trap and a second place for personal data to live. If that
trade ever changes, `src/components/sections/Contact.tsx` is the only file to
touch.
