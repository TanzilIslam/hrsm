import "server-only"

import { eq } from "drizzle-orm"

import { db } from "@/db"
import { posts, projectImages, projects, services } from "@/db/schema"

// Where an image URL is in use. Image fields store plain URLs, so deleting a
// library file that is still referenced would leave broken images.
export async function findMediaUsage(url: string) {
  const [s, p, pi, b] = await Promise.all([
    db
      .select({ id: services.id })
      .from(services)
      .where(eq(services.image, url)),
    db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.coverImage, url)),
    db
      .select({ id: projectImages.id })
      .from(projectImages)
      .where(eq(projectImages.url, url)),
    db.select({ id: posts.id }).from(posts).where(eq(posts.coverImage, url)),
  ])
  const used = [
    s.length && `${s.length} service${s.length > 1 ? "s" : ""}`,
    p.length + pi.length &&
      `${p.length + pi.length} project image${p.length + pi.length > 1 ? "s" : ""}`,
    b.length && `${b.length} blog post${b.length > 1 ? "s" : ""}`,
  ].filter(Boolean) as string[]
  return used
}
