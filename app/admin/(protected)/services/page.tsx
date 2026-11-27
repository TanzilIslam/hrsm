import { asc } from "drizzle-orm"
import type { Metadata } from "next"

import { ServicesTable } from "@/components/admin/services/services-table"
import { db } from "@/db"
import { services } from "@/db/schema"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Services" }

export default async function AdminServicesPage() {
  await requireRole("editor")
  const rows = await db
    .select({
      id: services.id,
      title: services.title,
      slug: services.slug,
      shortDescription: services.shortDescription,
      icon: services.icon,
      image: services.image,
      imageAlt: services.imageAlt,
      published: services.published,
    })
    .from(services)
    .orderBy(asc(services.sortOrder), asc(services.id))

  return <ServicesTable rows={rows} />
}
