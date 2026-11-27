"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileTextIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import {
  deletePost,
  setPostPublished,
} from "@/app/admin/(protected)/blog/actions"
import { EmptyState } from "@/components/site/sections"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPostDate } from "@/lib/post-ui"

export type PostRow = {
  id: number
  title: string
  slug: string
  coverImage: string | null
  coverImageAlt: string
  published: boolean
  publishedAt: string | null
}

function state(row: PostRow) {
  if (!row.published)
    return { label: "Draft", style: "bg-secondary text-muted-foreground" }
  if (row.publishedAt && new Date(row.publishedAt) > new Date()) {
    return { label: "Scheduled", style: "bg-sky-100 text-sky-800" }
  }
  return { label: "Live", style: "bg-emerald-100 text-emerald-800" }
}

export function PostsTable({ rows }: { rows: PostRow[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [target, setTarget] = useState<PostRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  function togglePublished(row: PostRow, value: boolean) {
    startTransition(async () => {
      const result = await setPostPublished(row.id, value)
      if (!result.ok) {
        toast.error(result.message)
        return
      }
      toast.success(value ? "Post published" : "Post hidden")
      router.refresh()
    })
  }

  async function confirmDelete() {
    if (!target) return
    setDeleting(true)
    const result = await deletePost(target.id)
    setDeleting(false)
    if (!result.ok) {
      toast.error(result.message)
      return
    }
    toast.success("Post deleted")
    setTarget(null)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Blog</h1>
        <Link href="/admin/blog/new" className={buttonVariants({ size: "lg" })}>
          <PlusIcon />
          New post
        </Link>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Write your first post to share news and updates."
        />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Post</TableHead>
                <TableHead className="hidden w-32 md:table-cell">
                  Status
                </TableHead>
                <TableHead className="w-24">Published</TableHead>
                <TableHead className="w-24 pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const s = state(row)
                return (
                  <TableRow key={row.id}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        {row.coverImage ? (
                          <Image
                            src={row.coverImage}
                            alt={row.coverImageAlt}
                            width={48}
                            height={48}
                            className="size-12 rounded-md object-cover"
                          />
                        ) : (
                          <span className="grid size-12 place-items-center rounded-md bg-navy/10 text-navy">
                            <FileTextIcon className="size-5" aria-hidden />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium">{row.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {row.publishedAt
                              ? formatPostDate(row.publishedAt)
                              : "Not published"}{" "}
                            · /blog/{row.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={s.style}>{s.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={row.published}
                        disabled={pending}
                        aria-label={`${row.published ? "Unpublish" : "Publish"} ${row.title}`}
                        onCheckedChange={(c) => togglePublished(row, c)}
                      />
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex justify-end gap-0.5">
                        <Link
                          href={`/admin/blog/${row.id}/edit`}
                          aria-label={`Edit ${row.title}`}
                          title="Edit"
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon-sm",
                          })}
                        >
                          <PencilIcon />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${row.title}`}
                          title="Delete"
                          onClick={() => setTarget(row)}
                        >
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!target}
        onOpenChange={(o) => !o && !deleting && setTarget(null)}
        title={`Delete "${target?.title ?? ""}"?`}
        description="The post is removed from the website immediately. Its cover image stays in the media library."
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
