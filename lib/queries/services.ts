import "server-only"

import { and, asc, eq } from "drizzle-orm"

import { db } from "@/db"
import { services } from "@/db/schema"

const publicColumns = {
  id: services.id,
  slug: services.slug,
  title: services.title,
  shortDescription: services.shortDescription,
  content: services.content,
  icon: services.icon,
  image: services.image,
  imageAlt: services.imageAlt,
}

// Public site only ever sees published services, in the admin's order.
export async function getPublishedServices() {
  return db
    .select(publicColumns)
    .from(services)
    .where(eq(services.published, true))
    .orderBy(asc(services.sortOrder), asc(services.id))
}

export async function getPublishedServiceBySlug(slug: string) {
  const [row] = await db
    .select(publicColumns)
    .from(services)
    .where(and(eq(services.slug, slug), eq(services.published, true)))
    .limit(1)
  return row ?? null
}
