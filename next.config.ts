import type { NextConfig } from 'next';

/**
 * Security headers.
 *
 * The Content-Security-Policy is intentionally static (no nonce) so every route
 * stays statically generated. A nonce-based policy would require a middleware and
 * would opt the whole site into dynamic rendering, which is a poor trade for a
 * purely informational site. See README.md -> "Content Security Policy" for the
 * reasoning and the hardening path if this site ever gains per-user content.
 */
/**
 * Script policy.
 *
 * Next's development runtime compiles modules with `eval()`/`new Function`
 * (webpack/turbopack HMR). Without 'unsafe-eval' the browser blocks that code,
 * the app never hydrates, and every client component silently dies — which is
 * exactly how the header theme toggle stopped responding and the scroll reveals
 * were left stranded at `opacity: 0`. Production bundles are eval-free, so the
 * deployed policy stays strict.
 */
const isDev = process.env.NODE_ENV === 'development';
const scriptSrc = isDev ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Every brand image is local, so the loader only ever runs for /brand assets.
    localPatterns: [{ pathname: '/brand/**' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: [...securityHeaders] }];
  },
};

export default nextConfig;
