"use client"

import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type Img = { url: string; alt: string }

// Thumbnail grid that opens a full-size viewer (arrow keys and buttons).
export function ProjectGallery({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const go = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + images.length) % images.length
      ),
    [images.length]
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, go])

  if (!images.length) return null
  const current = open === null ? null : images[open]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.url}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
              className="group relative block aspect-4/3 w-full overflow-hidden rounded-lg bg-secondary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[min(92vw,64rem)] gap-3 p-3 sm:max-w-5xl">
          <DialogTitle className="sr-only">Project gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Image {(open ?? 0) + 1} of {images.length}
          </DialogDescription>
          {current && (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-black sm:aspect-video">
              <Image
                src={current.url}
                alt={current.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-muted-foreground">
              {current?.alt}
            </p>
            {images.length > 1 && (
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {(open ?? 0) + 1} / {images.length}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Next image"
                  onClick={() => go(1)}
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
