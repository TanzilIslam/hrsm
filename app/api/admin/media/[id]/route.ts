import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

import { db } from "@/db"
import { media } from "@/db/schema"
import { findMediaUsage } from "@/lib/media"
import { getApiUser } from "@/lib/session"
import { deleteStoredFile } from "@/lib/storage"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, status } = await getApiUser()
  if (!user) return NextResponse.json({ error: "Not allowed" }, { status })

  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Invalid image id." }, { status: 400 })
  }

  const [item] = await db.select().from(media).where(eq(media.id, id))
  if (!item) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 })
  }

  const usage = await findMediaUsage(item.url)
  if (usage.length) {
    return NextResponse.json(
      {
        error: `This image is used by ${usage.join(", ")}. Replace it there first.`,
      },
      { status: 409 }
    )
  }

  // Remove the stored file first; if that fails the record stays so the admin
  // can retry instead of leaving an untracked file in storage.
  try {
    await deleteStoredFile(item.url)
  } catch (err) {
    console.error("Deleting stored file failed", err)
    return NextResponse.json(
      { error: "Could not delete the file. Please try again." },
      { status: 500 }
    )
  }
  await db.delete(media).where(eq(media.id, id))
  return NextResponse.json({ ok: true })
}
