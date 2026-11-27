import Image from "next/image"
import Link from "next/link"

import { ImagePlaceholder } from "@/components/site/sections"
import { formatPostDate } from "@/lib/post-ui"
import type { PostCard as PostCardData } from "@/lib/queries/posts"

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-foreground/10 transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            label={post.title}
            className="absolute inset-0 px-4 text-center"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold tracking-wider text-brand-orange uppercase">
          {formatPostDate(post.publishedAt)}
        </p>
        <h3 className="text-lg font-semibold text-navy">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}
