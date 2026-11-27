import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ServiceForm } from "@/components/admin/services/service-form"
import { db } from "@/db"
import { services } from "@/db/schema"
import { requireRole } from "@/lib/session"
import { serviceIconKeys, type ServiceIconKey } from "@/lib/service-icons"

export const metadata: Metadata = { title: "Edit service" }

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole("editor")
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) notFound()

  const [row] = await db.select().from(services).where(eq(services.id, id))
  if (!row) notFound()

  const icon = serviceIconKeys.includes(row.icon as ServiceIconKey)
    ? (row.icon as ServiceIconKey)
    : "building-2"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Edit service</h1>
      <ServiceForm
        id={row.id}
        initial={{
          title: row.title,
          slug: row.slug,
          shortDescription: row.shortDescription,
          content: row.content,
          icon,
          image: row.image,
          imageAlt: row.imageAlt,
          published: row.published,
        }}
      />
    </div>
  )
}
