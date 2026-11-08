import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://sleepguardian.vercel.app';
const legacyOrigin = 'https://sleep-guardian-lake.vercel.app';
const routes = ['/', '/guides/windows-pc-curfew', '/privacy', '/terms', '/security'];
const read = (file) => readFileSync(path.join(root, '.next/server/app', file), 'utf8');
const decode = (value) =>
  value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]),
  );
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((match) => attributes(match[0]));
const metadata = (html, name) =>
  tags(html, 'meta').filter((tag) => tag.name === name || tag.property === name);
const schemas = (html) =>
  [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => JSON.parse(match[1]),
  );
const pages = new Map(
  routes.map((route) => [route, read(route === '/' ? 'index.html' : `${route.slice(1)}.html`)]),
);
const titles = new Set();

for (const [route, html] of pages) {
  const canonical = tags(html, 'link').filter((tag) => tag.rel === 'canonical');
  assert.equal(canonical.length, 1, `One canonical on ${route}`);
  assert.equal(
    new URL(canonical[0].href).href,
    `${origin}${route}`,
    `Correct canonical on ${route}`,
  );
  assert.equal(metadata(html, 'description').length, 1, `One description on ${route}`);
  assert.equal(new URL(metadata(html, 'og:url')[0].content).href, `${origin}${route}`);
  assert.equal(metadata(html, 'og:image')[0].content, `${origin}/og/opengraph-image.png`);
  assert.equal(metadata(html, 'twitter:image')[0].content, `${origin}/og/opengraph-image.png`);
  assert.ok(metadata(html, 'twitter:image:alt')[0].content);
  assert.doesNotMatch(metadata(html, 'robots')[0].content, /noindex/);
  assert.match(metadata(html, 'googlebot')[0].content, /max-image-preview:large/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1 on ${route}`);
  assert.match(html, /<html lang="en"/);
  const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
  assert.ok(!titles.has(title), `Unique title on ${route}`);
  titles.add(title);

  for (const link of tags(html, 'a').filter(
    (tag) => tag.href?.startsWith('/') && !tag.href.startsWith('//'),
  )) {
    const target = new URL(link.href, origin);
    assert.ok(pages.has(target.pathname), `Internal route exists: ${link.href} on ${route}`);
    if (target.hash)
      assert.ok(
        tags(pages.get(target.pathname), '[a-zA-Z][\\w:-]*').some(
          (tag) => tag.id === target.hash.slice(1),
        ),
        `Anchor exists: ${link.href}`,
      );
  }

  const jsonLd = schemas(html);
  assert.equal(
    jsonLd.length,
    route === '/' || route.startsWith('/guides/') ? 1 : 0,
    `Page-scoped JSON-LD on ${route}`,
  );
  for (const schema of jsonLd) {
    assert.equal(schema['@context'], 'https://schema.org');
    assert.ok(!JSON.stringify(schema).includes(legacyOrigin), 'No retired URLs in schema');
    const ids = new Set(schema['@graph'].map((entity) => entity['@id']));
    assert.equal(ids.size, schema['@graph'].length, 'Unique schema entity IDs');
    const checkRefs = (value) => {
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length === 1 && value['@id'])
        assert.ok(ids.has(value['@id']), `Resolvable schema reference ${value['@id']}`);
      Object.values(value).forEach(checkRefs);
    };
    checkRefs(schema);
    if (route === '/') {
      const app = schema['@graph'].find((entity) => entity['@type'] === 'SoftwareApplication');
      assert.equal(app.softwareVersion, '1.10.2');
      assert.ok(app.downloadUrl.endsWith('/v1.10.2/SleepGuardianSetup_1.10.2.exe'));
      assert.ok(
        !('offers' in app) && !('aggregateRating' in app),
        'No invented commercial or review claims',
      );
    } else {
      const article = schema['@graph'].find((entity) => entity['@type'] === 'Article');
      assert.equal(article.datePublished, '2026-11-08');
      const breadcrumb = schema['@graph'].find((entity) => entity['@type'] === 'BreadcrumbList');
      assert.deepEqual(
        breadcrumb.itemListElement.map((item) => item.position),
        [1, 2],
      );
      assert.equal(breadcrumb.itemListElement[1].item, `${origin}${route}`);
    }
  }
}

const sitemap = read('sitemap.xml.body');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(new Set(locations), new Set(routes.map((route) => `${origin}${route}`)));
assert.equal((sitemap.match(/<lastmod>/g) || []).length, 1, 'Only the dated guide has lastmod');
assert.ok(!sitemap.includes(legacyOrigin));
const robots = read('robots.txt.body');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!robots.includes(legacyOrigin));
assert.match(metadata(read('_not-found.html'), 'robots')[0].content, /noindex/);
assert.equal(
  readFileSync(path.join(root, 'public/google9f3fb088d8fefe90.html'), 'utf8').trim(),
  'google-site-verification: google9f3fb088d8fefe90.html',
);

// Exercise the domain resolver without depending on Node's native TS support.
const configSource = readFileSync(path.join(root, 'src/config/site.ts'), 'utf8');
const compiled = ts.transpileModule(configSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const original = process.env.NEXT_PUBLIC_SITE_URL;
let serial = 0;
async function configuredOrigin(value) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = value;
  const source = Buffer.from(`${compiled}\n// configuration-case-${serial++}`).toString('base64');
  return (await import(`data:text/javascript;base64,${source}`)).siteConfig.siteUrl;
}
try {
  assert.equal(await configuredOrigin(undefined), origin);
  assert.equal(await configuredOrigin(''), origin);
  assert.equal(
    await configuredOrigin(`${legacyOrigin}/`),
    origin,
    'Stale deployment env follows the migration',
  );
  assert.equal(await configuredOrigin(' https://custom.example/ '), 'https://custom.example');
  for (const value of [
    'https://custom.example/path',
    'https://custom.example?query=yes',
    'https://custom.example/#fragment',
    'javascript:alert(1)',
    '/relative',
  ]) {
    await assert.rejects(configuredOrigin(value));
  }
} finally {
  if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = original;
}

console.log(
  'SEO checks passed: 5 canonical routes, metadata, internal links, schema references, sitemap, robots, 404 noindex, ownership file and domain migration.',
);
