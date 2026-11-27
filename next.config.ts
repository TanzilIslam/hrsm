import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV !== "production"

// Content Security Policy. Next.js needs inline scripts and styles for its own
// hydration data, so 'unsafe-inline' stays; everything else is restricted to
// the sources the site actually uses (Vercel Blob images, Google Analytics,
// the Google Maps embed). Dev also needs eval and websockets for hot reload.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // https: because blog articles may embed images from other hosts.
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "font-src 'self' data:",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Always put page metadata in <head> (not streamed into <body>) so every
  // crawler, link-preview bot, and audit tool sees titles and descriptions.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
