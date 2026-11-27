import { and, desc, eq, ilike, or } from "drizzle-orm"
import type { Metadata } from "next"

import { ProjectsTable } from "@/components/admin/projects/projects-table"
import { db } from "@/db"
import { projects } from "@/db/schema"
import { requireRole } from "@/lib/session"
import { projectStatuses } from "@/lib/validation/project"

export const metadata: Metadata = { title: "Projects" }

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  await requireRole("project_manager", "editor")
  const { q, status } = await searchParams
  const term = q?.trim().slice(0, 100)
  const statusFilter = projectStatuses.find((s) => s === status)

  const like = term ? `%${term.replace(/[\\%_]/g, "\\$&")}%` : null
  const rows = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      location: projects.location,
      type: projects.type,
      status: projects.status,
      coverImage: projects.coverImage,
      coverImageAlt: projects.coverImageAlt,
      featured: projects.featured,
      published: projects.published,
    })
    .from(projects)
    .where(
      and(
        statusFilter ? eq(projects.status, statusFilter) : undefined,
        like
          ? or(
              ilike(projects.name, like),
              ilike(projects.location, like),
              ilike(projects.type, like)
            )
          : undefined
      )
    )
    .orderBy(desc(projects.createdAt), desc(projects.id))
    .limit(200)

  return (
    <ProjectsTable
      rows={rows}
      query={term ?? ""}
      status={statusFilter ?? "all"}
    />
  )
}
