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
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
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
