"use client"

import Image from "next/image"
import { CheckIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { UploadForm } from "@/components/admin/media/upload-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ImageValue, MediaItem } from "@/lib/media-types"
import { cn } from "@/lib/utils"

// Pick from the media library, or upload a new image and pick it straight away.
export function MediaPicker({
  open,
  onOpenChange,
  multiple = false,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  multiple?: boolean
  onSelect: (images: ImageValue[]) => void
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null)
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    if (!open) return
    let cancelled = false
    fetch("/api/admin/media")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => !cancelled && setItems(json.items))
      .catch(() => {
        if (!cancelled) {
          setItems([])
          toast.error("Could not load the media library.")
        }
      })
    return () => {
      cancelled = true
      setSelected([])
    }
  }, [open])

  function toggle(id: number) {
    setSelected((cur) =>
      multiple
        ? cur.includes(id)
          ? cur.filter((x) => x !== id)
          : [...cur, id]
        : [id]
    )
  }

  function confirm() {
    const chosen = (items ?? []).filter((i) => selected.includes(i.id))
    onSelect(chosen.map((i) => ({ url: i.url, alt: i.alt })))
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choose {multiple ? "images" : "an image"}</DialogTitle>
          <DialogDescription>
            Pick from the library or upload a new image.
          </DialogDescription>
        </DialogHeader>

        <details className="rounded-lg border p-3">
          <summary className="cursor-pointer text-sm font-medium">
            Upload a new image
          </summary>
          <div className="pt-4">
            <UploadForm
              onUploaded={(item) => {
                setItems((l) => [item, ...(l ?? [])])
                toggle(item.id)
              }}
            />
          </div>
        </details>

        {items === null ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading...
          </p>
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No images yet. Upload one above.
          </p>
        ) : (
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {items.map((item) => {
              const on = selected.includes(item.id)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "relative block aspect-square w-full overflow-hidden rounded-lg bg-secondary outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      on && "ring-3 ring-brand-orange"
                    )}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                    {on && (
                      <span className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-brand-orange text-navy">
                        <CheckIcon className="size-4" />
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={selected.length === 0} onClick={confirm}>
            Use {selected.length > 1 ? `${selected.length} images` : "image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
