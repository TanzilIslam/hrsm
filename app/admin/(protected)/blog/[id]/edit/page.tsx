import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PostForm } from "@/components/admin/blog/post-form"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { toDateInput } from "@/lib/post-ui"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Edit post" }

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole("editor")
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) notFound()

  const [row] = await db.select().from(posts).where(eq(posts.id, id))
  if (!row) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Edit post</h1>
      <PostForm
        id={row.id}
        initial={{
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          cover: row.coverImage
            ? { url: row.coverImage, alt: row.coverImageAlt }
            : null,
          publishDate: toDateInput(row.publishedAt),
          published: row.published,
        }}
      />
    </div>
  )
}
