import { siteConfig } from '@/config/site';
import { meta } from '@/content/meta';
import { pcCurfewGuide } from '@/content/pc-curfew-guide';

function siteIdentityEntities() {
  const url = `${siteConfig.siteUrl}/`;
  return [
    {
      '@type': 'Organization',
      '@id': `${url}#organization`,
      name: siteConfig.developer,
      url: siteConfig.githubUrl,
      sameAs: [siteConfig.githubUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${url}#website`,
      name: siteConfig.name,
      url,
      inLanguage: 'en',
      publisher: { '@id': `${url}#organization` },
    },
  ];
}

/**
 * Describe the homepage and its product with linked, stable entity IDs.
 * Keep this graph on the landing page: legal pages are not app listings.
 * Pricing and ratings are omitted because the page makes no such claims.
 * Software rich-result eligibility requires genuine review/offer information;
 * this graph describes the product without inventing that information.
 */
export function landingPageJsonLd() {
  const url = `${siteConfig.siteUrl}/`;
  const organizationId = `${url}#organization`;
  const websiteId = `${url}#website`;
  const webpageId = `${url}#webpage`;
  const softwareId = `${url}#software`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...siteIdentityEntities(),
      {
        '@type': 'WebPage',
        '@id': webpageId,
        name: meta.title,
        description: meta.description,
        url,
        inLanguage: 'en',
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': softwareId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${siteConfig.siteUrl}/og/opengraph-image.png`,
          width: 1200,
          height: 630,
          caption: meta.ogAlt,
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': softwareId,
        name: siteConfig.name,
        description: meta.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: siteConfig.supportedOS,
        softwareRequirements: siteConfig.supportedOS,
        softwareVersion: siteConfig.appVersion,
        fileSize: siteConfig.fileSize,
        ...(siteConfig.downloadUrl ? { downloadUrl: siteConfig.downloadUrl } : {}),
        image: `${siteConfig.siteUrl}/brand/app-256.png`,
        url,
        mainEntityOfPage: { '@id': webpageId },
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
      },
    ],
  };
}

/** Editorial markup belongs to the visible guide, with its actual publication date. */
export function pcCurfewGuideJsonLd() {
  const url = `${siteConfig.siteUrl}${pcCurfewGuide.path}`;
  const organizationId = `${siteConfig.siteUrl}/#organization`;
  const webpageId = `${url}#webpage`;
  const articleId = `${url}#article`;
  const breadcrumbId = `${url}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...siteIdentityEntities(),
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url,
        name: pcCurfewGuide.metaTitle,
        description: pcCurfewGuide.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
        breadcrumb: { '@id': breadcrumbId },
        mainEntity: { '@id': articleId },
      },
      {
        '@type': 'Article',
        '@id': articleId,
        headline: pcCurfewGuide.title,
        description: pcCurfewGuide.description,
        url,
        inLanguage: 'en',
        datePublished: pcCurfewGuide.published,
        dateModified: pcCurfewGuide.published,
        image: `${siteConfig.siteUrl}/og/opengraph-image.png`,
        author: { '@id': organizationId },
        publisher: { '@id': organizationId },
        mainEntityOfPage: { '@id': webpageId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: pcCurfewGuide.title, item: url },
        ],
      },
    ],
  };
}
