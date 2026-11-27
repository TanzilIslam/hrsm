"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { db } from "@/db"
import { posts } from "@/db/schema"
import { requireRole } from "@/lib/session"
import {
  postFormSchema,
  type PostFormInput,
  type PostFormValues,
} from "@/lib/validation/post"

export type ActionResult =
  | { ok: true; id?: number }
  | {
      ok: false
      message: string
      fieldErrors?: Partial<Record<keyof PostFormInput, string[]>>
    }

// Posts appear on the blog list, article pages, and the homepage.
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
  message: "That slug is already used by another post.",
  fieldErrors: { slug: ["That slug is already used by another post"] },
}

// Dates are chosen in Bangladesh time (UTC+6), at the start of that day.
function dhakaDate(date: string) {
  return new Date(`${date}T00:00:00+06:00`)
}

// A chosen date wins. Otherwise keep the existing date, or stamp "now" the
// first time a post is published.
function resolvePublishedAt(v: PostFormValues, existing: Date | null) {
  if (v.publishDate) return dhakaDate(v.publishDate)
  if (existing) return existing
  return v.published ? new Date() : null
}

function toRow(v: PostFormValues, existing: Date | null) {
  return {
    slug: v.slug,
    title: v.title,
    excerpt: v.excerpt,
    content: v.content,
    coverImage: v.cover?.url ?? null,
    coverImageAlt: v.cover?.alt ?? "",
    published: v.published,
    publishedAt: resolvePublishedAt(v, existing),
  }
}

function parse(values: PostFormInput) {
  const parsed = postFormSchema.safeParse(values)
  if (parsed.success) return { data: parsed.data } as const
  const result: ActionResult = {
    ok: false,
    message: "Please fix the highlighted fields.",
    fieldErrors: z.flattenError(parsed.error).fieldErrors,
  }
  return { result } as const
}

export async function createPost(values: PostFormInput): Promise<ActionResult> {
  await requireRole("editor")
  const p = parse(values)
  if (!p.data) return p.result

  try {
    const [row] = await db
      .insert(posts)
      .values(toRow(p.data, null))
      .returning({ id: posts.id })
    refreshPublicPages()
    return { ok: true, id: row.id }
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("createPost failed", err)
    return { ok: false, message: "Could not save the post. Try again." }
  }
}

export async function updatePost(
  id: number,
  values: PostFormInput
): Promise<ActionResult> {
  await requireRole("editor")
  const p = parse(values)
  if (!p.data) return p.result

  try {
    const [existing] = await db
      .select({ publishedAt: posts.publishedAt })
      .from(posts)
      .where(eq(posts.id, id))
    if (!existing) return { ok: false, message: "Post not found." }

    await db
      .update(posts)
      .set(toRow(p.data, existing.publishedAt))
      .where(eq(posts.id, id))
    refreshPublicPages()
    return { ok: true, id }
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("updatePost failed", err)
    return { ok: false, message: "Could not save the post. Try again." }
  }
}

export async function deletePost(id: number): Promise<ActionResult> {
  await requireRole("editor")
  const rows = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning({ id: posts.id })
  if (!rows.length) return { ok: false, message: "Post not found." }
  refreshPublicPages()
  return { ok: true }
}

export async function setPostPublished(
  id: number,
  published: boolean
): Promise<ActionResult> {
  await requireRole("editor")
  const [existing] = await db
    .select({ publishedAt: posts.publishedAt })
    .from(posts)
    .where(eq(posts.id, id))
  if (!existing) return { ok: false, message: "Post not found." }

  await db
    .update(posts)
    .set({
      published,
      publishedAt: published
        ? (existing.publishedAt ?? new Date())
        : existing.publishedAt,
    })
    .where(eq(posts.id, id))
  refreshPublicPages()
  return { ok: true }
}
