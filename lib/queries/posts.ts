import "server-only"

import { and, count, desc, eq, lte, ne } from "drizzle-orm"

import { db } from "@/db"
import { posts } from "@/db/schema"

const cardColumns = {
  id: posts.id,
  slug: posts.slug,
  title: posts.title,
  excerpt: posts.excerpt,
  coverImage: posts.coverImage,
  coverImageAlt: posts.coverImageAlt,
  publishedAt: posts.publishedAt,
}

export type PostCard = Awaited<
  ReturnType<typeof getPublishedPosts>
>["items"][number]

// Visible on the site: published and not scheduled for the future.
const isLive = () =>
  and(eq(posts.published, true), lte(posts.publishedAt, new Date()))

export async function getPublishedPosts({
  page = 1,
  pageSize = 9,
}: {
  page?: number
  pageSize?: number
}) {
  const [items, [{ total }]] = await Promise.all([
    db
      .select(cardColumns)
      .from(posts)
      .where(isLive())
      .orderBy(desc(posts.publishedAt), desc(posts.id))
      .limit(pageSize)
      .offset((Math.max(1, page) - 1) * pageSize),
    db.select({ total: count() }).from(posts).where(isLive()),
  ])
  return { items, total, pageSize }
}

export async function getPublishedPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), isLive()))
    .limit(1)
  return post ?? null
}

export async function getRecentPosts(limit = 3, excludeId?: number) {
  return db
    .select(cardColumns)
    .from(posts)
    .where(and(isLive(), excludeId ? ne(posts.id, excludeId) : undefined))
    .orderBy(desc(posts.publishedAt), desc(posts.id))
    .limit(limit)
}
