import { siteConfig } from '@/config/site';

/**
 * JSON-LD for the product.
 *
 * Every commercial field is omitted on purpose. This site distributes nothing
 * for money and has no storefront, so there is no monetary field to describe
 * and inventing one would be a fabrication. `offers` and the
 * `isAccessibleForFree` companion flag are both left out together, since
 * structured-data software rich results require an offer or a rating and
 * neither applies here.
 */
export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description:
      'A Windows commitment device that shuts your PC down at bedtime and locks the screen until your wake time.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: siteConfig.supportedOS ?? 'Windows',
    url: siteConfig.siteUrl,
    author: {
      '@type': 'Organization',
      name: siteConfig.developer,
    },
    softwareRequirements: siteConfig.supportedOS ?? 'Windows',
  };
}
