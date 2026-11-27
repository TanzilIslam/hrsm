import { and, eq, lte } from "drizzle-orm"
import type { MetadataRoute } from "next"

import { db } from "@/db"
import { posts, projects, services } from "@/db/schema"
import { absoluteUrl } from "@/lib/site-url"

// Rebuilt from the database on each request so new content appears quickly.
export const dynamic = "force-dynamic"

const staticPaths = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/services", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/team", priority: 0.5 },
  { path: "/clients", priority: 0.5 },
  { path: "/blog", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [svc, prj, pst] = await Promise.all([
    db
      .select({ slug: services.slug, updatedAt: services.updatedAt })
      .from(services)
      .where(eq(services.published, true)),
    db
      .select({ slug: projects.slug, updatedAt: projects.updatedAt })
      .from(projects)
      .where(eq(projects.published, true)),
    db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(
        and(eq(posts.published, true), lte(posts.publishedAt, new Date()))
      ),
  ])

  return [
    ...staticPaths.map((p) => ({
      url: absoluteUrl(p.path),
      priority: p.priority,
    })),
    ...svc.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
    ...prj.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: p.updatedAt,
      priority: 0.7,
    })),
    ...pst.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt,
      priority: 0.6,
    })),
  ]
}
