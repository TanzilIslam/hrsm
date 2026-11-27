"use client"

import Image from "next/image"
import { EyeIcon, ImagePlusIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { UploadForm } from "@/components/admin/media/upload-form"
import { EmptyState } from "@/components/site/sections"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatBytes, type MediaItem } from "@/lib/media-types"

export function MediaLibrary({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState(initial)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [target, setTarget] = useState<MediaItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function confirmDelete() {
    if (!target) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/media/${target.id}`, {
        method: "DELETE",
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json.error || "Could not delete the image.")
        return
      }
      setItems((list) => list.filter((i) => i.id !== target.id))
      toast.success("Image deleted")
      setTarget(null)
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Media</h1>
        <Button size="lg" className="gap-2" onClick={() => setUploadOpen(true)}>
          <ImagePlusIcon />
          Upload image
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="No images yet"
          description="Uploaded images appear here and can be reused on projects, services, and blog posts."
        />
      ) : (
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <li
              key={item.id}
              className="group overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium" title={item.alt}>
                    {item.alt}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatBytes(item.size)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Open ${item.alt} in a new tab`}
                    title="Open in new tab"
                    nativeButton={false}
                    render={
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${item.alt}`}
                    title="Delete"
                    onClick={() => setTarget(item)}
                  >
                    <Trash2Icon className="text-destructive" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload an image</DialogTitle>
            <DialogDescription>
              Add it once, then reuse it on projects, services, and posts.
            </DialogDescription>
          </DialogHeader>
          <UploadForm
            onUploaded={(item) => {
              setItems((l) => [item, ...l])
              setUploadOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!target}
        onOpenChange={(o) => !o && !deleting && setTarget(null)}
        title="Delete this image?"
        description="The image file is removed permanently. It cannot be deleted while a project, service, or post still uses it."
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
