// The public base URL, used for canonical links, the sitemap, and Open Graph.
// Set NEXT_PUBLIC_SITE_URL to the real domain once HRSM has one. On Vercel it
// falls back to the project's production URL, and locally to localhost.
function resolve() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, "")
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercel) return `https://${vercel}`
  return "http://localhost:3000"
}

export const siteUrl = resolve()

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
