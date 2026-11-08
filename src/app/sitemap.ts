import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { pcCurfewGuide } from '@/content/pc-curfew-guide';

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until a genuine content-update date is maintained.
  // Rebuilding the site does not mean that every page has changed.
  return [
    { url: `${siteConfig.siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteConfig.siteUrl}${pcCurfewGuide.path}`,
      lastModified: pcCurfewGuide.published,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.siteUrl}/security`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.siteUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteConfig.siteUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
