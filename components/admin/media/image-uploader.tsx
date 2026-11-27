"use client"

import Image from "next/image"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ImagePlusIcon,
  XIcon,
} from "lucide-react"
import { useState } from "react"

import { MediaPicker } from "@/components/admin/media/media-picker"
import { Button } from "@/components/ui/button"
import type { ImageValue } from "@/lib/media-types"

// Form field for one or many images. Controlled: pass `value` and `onChange`.
// Removing an image here only detaches it from the field; the file stays in
// the media library. The first image is the cover when `multiple` is set.
export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = multiple ? "Add images" : "Choose image",
}: {
  value: ImageValue[]
  onChange: (value: ImageValue[]) => void
  multiple?: boolean
  label?: string
}) {
  const [open, setOpen] = useState(false)

  function move(from: number, to: number) {
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  function add(images: ImageValue[]) {
    if (!multiple) return onChange(images.slice(0, 1))
    const have = new Set(value.map((v) => v.url))
    onChange([...value, ...images.filter((i) => !have.has(i.url))])
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <ul
          className={
            multiple
              ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              : "grid max-w-48 grid-cols-1"
          }
        >
          {value.map((img, i) => (
            <li
              key={img.url}
              className="overflow-hidden rounded-lg bg-white ring-1 ring-foreground/10"
            >
              <div className="relative aspect-square bg-secondary">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
                {multiple && i === 0 && (
                  <span className="absolute top-1.5 left-1.5 rounded bg-navy px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase">
                    Cover
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between p-1.5">
                <div className="flex">
                  {multiple && (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Move earlier"
                        disabled={i === 0}
                        onClick={() => move(i, i - 1)}
                      >
                        <ArrowLeftIcon />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Move later"
                        disabled={i === value.length - 1}
                        onClick={() => move(i, i + 1)}
                      >
                        <ArrowRightIcon />
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove ${img.alt}`}
                  onClick={() => onChange(value.filter((_, x) => x !== i))}
                >
                  <XIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <ImagePlusIcon />
        {value.length && !multiple ? "Change image" : label}
      </Button>

      <MediaPicker
        open={open}
        onOpenChange={setOpen}
        multiple={multiple}
        onSelect={add}
      />
    </div>
  )
}
