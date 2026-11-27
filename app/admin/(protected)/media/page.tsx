import { desc } from "drizzle-orm"
import type { Metadata } from "next"

import { MediaLibrary } from "@/components/admin/media/media-library"
import { db } from "@/db"
import { media } from "@/db/schema"
import { requireUser } from "@/lib/session"

export const metadata: Metadata = { title: "Media" }

export default async function MediaPage() {
  await requireUser()
  const rows = await db
    .select()
    .from(media)
    .orderBy(desc(media.createdAt))
    .limit(120)

  const items = rows.map((r) => ({
    id: r.id,
    url: r.url,
    alt: r.alt,
    fileName: r.fileName,
    size: r.size,
    contentType: r.contentType,
    createdAt: r.createdAt.toISOString(),
  }))

  return <MediaLibrary initial={items} />
}
