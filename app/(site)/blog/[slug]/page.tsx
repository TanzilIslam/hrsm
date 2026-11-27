import type { Metadata } from "next"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { Markdown } from "@/components/site/markdown"
import { PostCard } from "@/components/site/post-card"
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/sections"
import { formatPostDate } from "@/lib/post-ui"
import { getPublishedPostBySlug, getRecentPosts } from "@/lib/queries/posts"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPostBySlug((await params).slug)
  if (!post) return { title: "Post not found" }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const more = await getRecentPosts(3, post.id)

  // Absolute URL for the share links, taken from the current request.
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "https"
  const url = host
    ? `${proto}://${host}/blog/${post.slug}`
    : `/blog/${post.slug}`
  const enc = encodeURIComponent
  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${enc(`${post.title} ${url}`)}`,
    },
  ]

  return (
    <>
      <PageHero
        title={post.title}
        description={formatPostDate(post.publishedAt)}
      />
      <Section>
        <article className="mx-auto max-w-3xl space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-brand-orange"
          >
            <ArrowLeftIcon className="size-4" aria-hidden />
            All posts
          </Link>

          {post.coverImage && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(min-width: 768px) 48rem, 95vw"
                className="object-cover"
              />
            </div>
          )}

          <Markdown>{post.content}</Markdown>

          <div className="flex flex-wrap items-center gap-3 border-t pt-6">
            <span className="text-sm font-medium text-navy">Share:</span>
            {shares.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-brand-orange hover:text-navy"
              >
                {s.label}
              </a>
            ))}
          </div>
        </article>
      </Section>

      {more.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="Keep reading" title="More from the blog" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand />
    </>
  )
}
