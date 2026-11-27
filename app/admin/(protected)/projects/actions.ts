"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { db } from "@/db"
import { projectImages, projects } from "@/db/schema"
import { requireRole } from "@/lib/session"
import {
  projectFormSchema,
  type ProjectFormInput,
  type ProjectFormValues,
} from "@/lib/validation/project"

export type ActionResult =
  | { ok: true; id?: number }
  | {
      ok: false
      message: string
      fieldErrors?: Partial<Record<keyof ProjectFormInput, string[]>>
    }

// Projects appear on the list, detail pages, the homepage, and related lists.
function refreshPublicPages() {
  revalidatePath("/", "layout")
}

// Drizzle wraps driver errors, so the Postgres code can be on `cause`.
function isUniqueViolation(err: unknown) {
  const e = err as { code?: string; cause?: { code?: string } } | null
  return e?.code === "23505" || e?.cause?.code === "23505"
}

const slugTaken: ActionResult = {
  ok: false,
  message: "That slug is already used by another project.",
  fieldErrors: { slug: ["That slug is already used by another project"] },
}

function toRow(v: ProjectFormValues) {
  return {
    slug: v.slug,
    name: v.name,
    location: v.location,
    type: v.type,
    status: v.status,
    startDate: v.startDate,
    completionDate: v.completionDate,
    description: v.description,
    content: v.content,
    featured: v.featured,
    published: v.published,
    coverImage: v.cover?.url ?? null,
    coverImageAlt: v.cover?.alt ?? "",
  }
}

function galleryRows(projectId: number, gallery: ProjectFormValues["gallery"]) {
  return gallery.map((g, i) => ({
    projectId,
    url: g.url,
    alt: g.alt,
    sortOrder: i,
  }))
}

function parse(values: ProjectFormInput) {
  const parsed = projectFormSchema.safeParse(values)
  if (parsed.success) return { data: parsed.data } as const
  const result: ActionResult = {
    ok: false,
    message: "Please fix the highlighted fields.",
    fieldErrors: z.flattenError(parsed.error).fieldErrors,
  }
  return { result } as const
}

export async function createProject(
  values: ProjectFormInput
): Promise<ActionResult> {
  await requireRole("project_manager", "editor")
  const p = parse(values)
  if (!p.data) return p.result

  let id: number
  try {
    const [row] = await db
      .insert(projects)
      .values(toRow(p.data))
      .returning({ id: projects.id })
    id = row.id
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("createProject failed", err)
    return { ok: false, message: "Could not save the project. Try again." }
  }

  if (p.data.gallery.length) {
    try {
      await db.insert(projectImages).values(galleryRows(id, p.data.gallery))
    } catch (err) {
      // Do not leave a half-saved project behind.
      await db.delete(projects).where(eq(projects.id, id))
      console.error("createProject gallery failed", err)
      return { ok: false, message: "Could not save the project. Try again." }
    }
  }
  refreshPublicPages()
  return { ok: true, id }
}

export async function updateProject(
  id: number,
  values: ProjectFormInput
): Promise<ActionResult> {
  await requireRole("project_manager", "editor")
  const p = parse(values)
  if (!p.data) return p.result

  try {
    const [existing] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.id, id))
    if (!existing) return { ok: false, message: "Project not found." }

    // One atomic batch: update the row and replace the gallery together.
    const statements = [
      db.update(projects).set(toRow(p.data)).where(eq(projects.id, id)),
      db.delete(projectImages).where(eq(projectImages.projectId, id)),
      ...(p.data.gallery.length
        ? [db.insert(projectImages).values(galleryRows(id, p.data.gallery))]
        : []),
    ]
    await db.batch(
      statements as unknown as [(typeof statements)[0], ...typeof statements]
    )
    refreshPublicPages()
    return { ok: true, id }
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("updateProject failed", err)
    return { ok: false, message: "Could not save the project. Try again." }
  }
}

export async function deleteProject(id: number): Promise<ActionResult> {
  await requireRole("project_manager", "editor")
  const rows = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ id: projects.id })
  if (!rows.length) return { ok: false, message: "Project not found." }
  refreshPublicPages()
  return { ok: true }
}

export async function setProjectFlag(
  id: number,
  flag: "published" | "featured",
  value: boolean
): Promise<ActionResult> {
  await requireRole("project_manager", "editor")
  const rows = await db
    .update(projects)
    .set({ [flag]: value })
    .where(eq(projects.id, id))
    .returning({ id: projects.id })
  if (!rows.length) return { ok: false, message: "Project not found." }
  refreshPublicPages()
  return { ok: true }
}
