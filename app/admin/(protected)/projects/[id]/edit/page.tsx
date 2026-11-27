import { asc, eq } from "drizzle-orm"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectForm } from "@/components/admin/projects/project-form"
import { db } from "@/db"
import { projectImages, projects } from "@/db/schema"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Edit project" }

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole("project_manager", "editor")
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) notFound()

  const [row] = await db.select().from(projects).where(eq(projects.id, id))
  if (!row) notFound()

  const gallery = await db
    .select({ url: projectImages.url, alt: projectImages.alt })
    .from(projectImages)
    .where(eq(projectImages.projectId, id))
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Edit project</h1>
      <ProjectForm
        id={row.id}
        initial={{
          name: row.name,
          slug: row.slug,
          location: row.location,
          type: row.type,
          status: row.status,
          startDate: row.startDate ?? "",
          completionDate: row.completionDate ?? "",
          description: row.description,
          content: row.content,
          cover: row.coverImage
            ? { url: row.coverImage, alt: row.coverImageAlt }
            : null,
          gallery,
          featured: row.featured,
          published: row.published,
        }}
      />
    </div>
  )
}
