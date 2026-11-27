"use server"

import { asc, eq, max } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { db } from "@/db"
import { services } from "@/db/schema"
import { requireRole } from "@/lib/session"
import {
  serviceFormSchema,
  type ServiceFormValues,
} from "@/lib/validation/service"

export type ActionResult =
  | { ok: true; id?: number }
  | {
      ok: false
      message: string
      fieldErrors?: Partial<Record<keyof ServiceFormValues, string[]>>
    }

// Changing a service affects the list, detail pages, and the footer.
function refreshPublicPages() {
  revalidatePath("/", "layout")
}

// Drizzle wraps driver errors, so the Postgres code can be on `cause`.
function isUniqueViolation(err: unknown) {
  const e = err as { code?: string; cause?: { code?: string } } | null
  return e?.code === "23505" || e?.cause?.code === "23505"
}

function invalid(error: z.ZodError): ActionResult {
  return {
    ok: false,
    message: "Please fix the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors,
  }
}

const slugTaken: ActionResult = {
  ok: false,
  message: "That slug is already used by another service.",
  fieldErrors: { slug: ["That slug is already used by another service"] },
}

export async function createService(
  values: ServiceFormValues
): Promise<ActionResult> {
  await requireRole("editor")
  const parsed = serviceFormSchema.safeParse(values)
  if (!parsed.success) return invalid(parsed.error)

  try {
    const [{ top }] = await db
      .select({ top: max(services.sortOrder) })
      .from(services)
    const [row] = await db
      .insert(services)
      .values({ ...parsed.data, sortOrder: (top ?? -1) + 1 })
      .returning({ id: services.id })
    refreshPublicPages()
    return { ok: true, id: row.id }
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("createService failed", err)
    return { ok: false, message: "Could not save the service. Try again." }
  }
}

export async function updateService(
  id: number,
  values: ServiceFormValues
): Promise<ActionResult> {
  await requireRole("editor")
  const parsed = serviceFormSchema.safeParse(values)
  if (!parsed.success) return invalid(parsed.error)

  try {
    const rows = await db
      .update(services)
      .set(parsed.data)
      .where(eq(services.id, id))
      .returning({ id: services.id })
    if (!rows.length) return { ok: false, message: "Service not found." }
    refreshPublicPages()
    return { ok: true, id }
  } catch (err) {
    if (isUniqueViolation(err)) return slugTaken
    console.error("updateService failed", err)
    return { ok: false, message: "Could not save the service. Try again." }
  }
}

export async function deleteService(id: number): Promise<ActionResult> {
  await requireRole("editor")
  const rows = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning({ id: services.id })
  if (!rows.length) return { ok: false, message: "Service not found." }
  refreshPublicPages()
  return { ok: true }
}

export async function setServicePublished(
  id: number,
  published: boolean
): Promise<ActionResult> {
  await requireRole("editor")
  const rows = await db
    .update(services)
    .set({ published })
    .where(eq(services.id, id))
    .returning({ id: services.id })
  if (!rows.length) return { ok: false, message: "Service not found." }
  refreshPublicPages()
  return { ok: true }
}

// Moves a service one place up or down, then renumbers so the order is
// always 0..n-1 even if earlier edits left gaps or duplicates.
export async function moveService(
  id: number,
  direction: "up" | "down"
): Promise<ActionResult> {
  await requireRole("editor")
  const rows = await db
    .select({ id: services.id, sortOrder: services.sortOrder })
    .from(services)
    .orderBy(asc(services.sortOrder), asc(services.id))

  const from = rows.findIndex((r) => r.id === id)
  const to = direction === "up" ? from - 1 : from + 1
  if (from === -1) return { ok: false, message: "Service not found." }
  if (to < 0 || to >= rows.length) return { ok: true }

  const ordered = [...rows]
  ;[ordered[from], ordered[to]] = [ordered[to], ordered[from]]
  const updates = ordered
    .map((r, index) => ({ id: r.id, index, changed: r.sortOrder !== index }))
    .filter((r) => r.changed)
    .map((r) =>
      db
        .update(services)
        .set({ sortOrder: r.index })
        .where(eq(services.id, r.id))
    )

  if (updates.length) {
    await db.batch(
      updates as unknown as [(typeof updates)[0], ...typeof updates]
    )
  }
  refreshPublicPages()
  return { ok: true }
}
