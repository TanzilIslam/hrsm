"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import { db } from "@/db"
import { inquiries } from "@/db/schema"
import { requireRole } from "@/lib/session"
import { inquiryStatuses } from "@/lib/validation/inquiry"

export type ActionResult = { ok: true } | { ok: false; message: string }

// Inquiries are private; only the admin screens and sidebar counts change.
function refreshAdmin() {
  revalidatePath("/admin", "layout")
}

export async function setInquiryStatus(
  id: number,
  status: string
): Promise<ActionResult> {
  await requireRole("inquiry_manager")
  const next = inquiryStatuses.find((s) => s === status)
  if (!next) return { ok: false, message: "Invalid status." }

  const rows = await db
    .update(inquiries)
    .set({ status: next })
    .where(eq(inquiries.id, id))
    .returning({ id: inquiries.id })
  if (!rows.length) return { ok: false, message: "Inquiry not found." }
  refreshAdmin()
  return { ok: true }
}

export async function deleteInquiry(id: number): Promise<ActionResult> {
  await requireRole("inquiry_manager")
  const rows = await db
    .delete(inquiries)
    .where(eq(inquiries.id, id))
    .returning({ id: inquiries.id })
  if (!rows.length) return { ok: false, message: "Inquiry not found." }
  refreshAdmin()
  return { ok: true }
}
