import { siteConfig } from '@/config/site';
import { meta } from '@/content/meta';

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
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.developer,
        url: siteConfig.githubUrl,
        sameAs: [siteConfig.githubUrl],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.name,
        url,
        inLanguage: 'en',
        publisher: { '@id': organizationId },
      },
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
