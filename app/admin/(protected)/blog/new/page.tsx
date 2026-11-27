import type { Metadata } from "next"

import { PostForm } from "@/components/admin/blog/post-form"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "New post" }

export default async function NewPostPage() {
  await requireRole("editor")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">New post</h1>
      <PostForm
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          cover: null,
          publishDate: "",
          published: false,
        }}
      />
    </div>
  )
}
