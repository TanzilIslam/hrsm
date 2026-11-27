import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { PostCard } from "@/components/site/post-card"
import { EmptyState, PageHero, Section } from "@/components/site/sections"
import { buttonVariants } from "@/components/ui/button"
import { getPublishedPosts } from "@/lib/queries/posts"

export const metadata: Metadata = {
  title: "News & Blog",
  description:
    "Company news, project updates, and construction industry insights from HRSM.",
}

const href = (page: number) => (page > 1 ? `/blog?page=${page}` : "/blog")

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const page = Math.max(1, Math.floor(Number((await searchParams).page)) || 1)
  const { items, total, pageSize } = await getPublishedPosts({ page })
  const pages = Math.max(1, Math.ceil(total / pageSize))

  // A page number past the end (stale link) goes to the last real page.
  if (items.length === 0 && total > 0) redirect(href(pages))

  return (
    <>
      <PageHero
        title="News & Blog"
        description="Company news, project updates, and industry insights."
      />
      <Section>
        {items.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="We are working on new articles. Please check back soon."
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-3"
          >
            {page > 1 && (
              <Link
                href={href(page - 1)}
                className={buttonVariants({ variant: "outline" })}
              >
                <ChevronLeftIcon />
                Newer
              </Link>
            )}
            <span className="text-sm text-muted-foreground">
              Page {page} of {pages}
            </span>
            {page < pages && (
              <Link
                href={href(page + 1)}
                className={buttonVariants({ variant: "outline" })}
              >
                Older
                <ChevronRightIcon />
              </Link>
            )}
          </nav>
        )}
      </Section>
    </>
  )
}
