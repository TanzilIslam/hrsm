import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/db"
import { media } from "@/db/schema"
import { mediaInput } from "@/db/validation"
import { getApiUser } from "@/lib/session"
import { storeImage, deleteStoredFile, UploadError } from "@/lib/storage"

const altSchema = z
  .string()
  .trim()
  .min(3, "Describe the image in a few words (min 3 characters)")
  .max(200, "Keep the description under 200 characters")

export async function GET() {
  const { user, status } = await getApiUser()
  if (!user) return NextResponse.json({ error: "Not allowed" }, { status })

  const items = await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt))
    .limit(120)
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const { user, status } = await getApiUser()
  if (!user) return NextResponse.json({ error: "Not allowed" }, { status })

  const form = await request.formData().catch(() => null)
  const file = form?.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Choose an image to upload." },
      { status: 400 }
    )
  }

  const alt = altSchema.safeParse(form?.get("alt") ?? "")
  if (!alt.success) {
    return NextResponse.json(
      { error: alt.error.issues[0].message, field: "alt" },
      { status: 400 }
    )
  }

  let stored
  try {
    stored = await storeImage(file)
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json(
        { error: err.message, field: "file" },
        { status: 400 }
      )
    }
    console.error("Image upload failed", err)
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    )
  }

  try {
    const [row] = await db
      .insert(media)
      .values(
        mediaInput.parse({
          url: stored.url,
          storageKey: stored.storageKey,
          fileName: file.name.slice(0, 255) || "image",
          size: stored.size,
          contentType: stored.contentType,
          alt: alt.data,
        })
      )
      .returning()
    return NextResponse.json({ item: row }, { status: 201 })
  } catch (err) {
    // Do not leave an orphaned file behind if the record could not be saved.
    await deleteStoredFile(stored.url).catch(() => {})
    console.error("Saving media record failed", err)
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    )
  }
}
