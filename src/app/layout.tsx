import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { buildMetadata, meta, themeColors } from '@/content/meta';
import { siteConfig } from '@/config/site';
import { themeInitScript } from '@/config/theme';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import './globals.css';

/**
 * Typography.
 *
 * The app uses Segoe UI and Consolas (MainWindow.xaml, CountdownOverlay.xaml).
 * Inter stands in for Segoe UI: the closest widely-loaded humanist grotesque
 * with a similar x-height, aperture and numeral set. JetBrains Mono stands in
 * for Consolas, which the app uses for the shutdown countdown digits.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  ...buildMetadata({ title: meta.title, description: meta.description, path: '/' }),
  /** Required so relative OpenGraph image paths resolve to absolute URLs. */
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.developer }],
  creator: siteConfig.developer,
  publisher: siteConfig.developer,
  category: 'Utilities',
  formatDetection: { email: false, address: false, telephone: false },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/brand/app-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/app-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    ...buildMetadata({ title: meta.title, description: meta.description }).openGraph,
    images: [
      {
        url: '/og/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: meta.ogAlt,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    ...buildMetadata({ title: meta.title, description: meta.description }).twitter,
    images: ['/og/opengraph-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: themeColors,
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Resolve and apply the colour theme before first paint. Without this the
          page would render dark, then flash to light for anyone who chose it.
          The script only sets an attribute React does not manage, and
          `suppressHydrationWarning` on <html> acknowledges that.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          // Static, developer-authored object with no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
