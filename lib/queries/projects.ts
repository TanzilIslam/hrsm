import "server-only"

import { and, asc, count, desc, eq, ilike, ne, or, sql } from "drizzle-orm"

import { db } from "@/db"
import { projectImages, projects } from "@/db/schema"
import type { projectStatuses } from "@/lib/validation/project"

export type ProjectStatusValue = (typeof projectStatuses)[number]

const cardColumns = {
  id: projects.id,
  slug: projects.slug,
  name: projects.name,
  location: projects.location,
  type: projects.type,
  status: projects.status,
  description: projects.description,
  coverImage: projects.coverImage,
  coverImageAlt: projects.coverImageAlt,
}

export type ProjectCard = Awaited<
  ReturnType<typeof getFeaturedProjects>
>[number]

// Escape LIKE wildcards so a search for "100%" matches literally.
function likePattern(q: string) {
  return `%${q.replace(/[\\%_]/g, "\\$&")}%`
}

// Newest work first: ongoing/upcoming by start date, then the rest by id.
const publicOrder = [
  desc(sql`coalesce(${projects.startDate}, ${projects.createdAt}::date)`),
  desc(projects.id),
]

export async function getPublishedProjects({
  status,
  q,
  page = 1,
  pageSize = 9,
}: {
  status?: ProjectStatusValue
  q?: string
  page?: number
  pageSize?: number
}) {
  const term = q?.trim()
  const where = and(
    eq(projects.published, true),
    status ? eq(projects.status, status) : undefined,
    term
      ? or(
          ilike(projects.name, likePattern(term)),
          ilike(projects.location, likePattern(term)),
          ilike(projects.type, likePattern(term))
        )
      : undefined
  )

  const [items, [{ total }]] = await Promise.all([
    db
      .select(cardColumns)
      .from(projects)
      .where(where)
      .orderBy(...publicOrder)
      .limit(pageSize)
      .offset((Math.max(1, page) - 1) * pageSize),
    db.select({ total: count() }).from(projects).where(where),
  ])
  return { items, total, pageSize }
}

export async function getFeaturedProjects(limit = 6) {
  return db
    .select(cardColumns)
    .from(projects)
    .where(and(eq(projects.published, true), eq(projects.featured, true)))
    .orderBy(...publicOrder)
    .limit(limit)
}

export async function getPublishedProjectBySlug(slug: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .limit(1)
  if (!project) return null

  const images = await db
    .select({ url: projectImages.url, alt: projectImages.alt })
    .from(projectImages)
    .where(eq(projectImages.projectId, project.id))
    .orderBy(asc(projectImages.sortOrder), asc(projectImages.id))
  return { ...project, images }
}

export async function getRelatedProjects(type: string, excludeId: number) {
  return db
    .select(cardColumns)
    .from(projects)
    .where(
      and(
        eq(projects.published, true),
        eq(projects.type, type),
        ne(projects.id, excludeId)
      )
    )
    .orderBy(...publicOrder)
    .limit(3)
}
