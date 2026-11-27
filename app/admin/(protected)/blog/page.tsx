import { desc } from "drizzle-orm"
import type { Metadata } from "next"

import { PostsTable } from "@/components/admin/blog/posts-table"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Blog" }

export default async function AdminBlogPage() {
  await requireRole("editor")
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      coverImage: posts.coverImage,
      coverImageAlt: posts.coverImageAlt,
      published: posts.published,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt), desc(posts.id))
    .limit(200)

  return (
    <PostsTable
      rows={rows.map((r) => ({
        ...r,
        publishedAt: r.publishedAt?.toISOString() ?? null,
      }))}
    />
  )
}
