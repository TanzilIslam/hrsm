"use client"

import { ImageIcon, UploadIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_MB,
  formatBytes,
  type MediaItem,
} from "@/lib/media-types"
import type { FieldErrors } from "@/lib/validation/auth"
import { cn } from "@/lib/utils"

const schema = z.object({
  file: z
    .instanceof(File, { message: "Choose an image to upload" })
    .refine((f) => f.size > 0, "Choose an image to upload")
    .refine(
      (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
      "Use a JPEG, PNG, or WebP image"
    )
    .refine(
      (f) => f.size <= MAX_IMAGE_MB * 1024 * 1024,
      `The image must be under ${MAX_IMAGE_MB} MB`
    ),
  alt: z
    .string()
    .trim()
    .min(3, "Describe the image in a few words (min 3 characters)")
    .max(200, "Keep the description under 200 characters"),
})

export function UploadForm({
  onUploaded,
}: {
  onUploaded: (item: MediaItem) => void
}) {
  const [errors, setErrors] = useState<FieldErrors<"file" | "alt">>({})
  const [pending, setPending] = useState(false)
  const [chosen, setChosen] = useState<File | null>(null)

  // Local preview of the chosen file; revoked when it changes or on unmount.
  const preview = useMemo(
    () => (chosen ? URL.createObjectURL(chosen) : null),
    [chosen]
  )
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview)
    },
    [preview]
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const parsed = schema.safeParse({
      file: data.get("file"),
      alt: data.get("alt") ?? "",
    })
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      return
    }
    setErrors({})
    setPending(true)

    const body = new FormData()
    body.set("file", parsed.data.file)
    body.set("alt", parsed.data.alt)
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (json.field === "alt" || json.field === "file") {
          setErrors({ [json.field]: [json.error] })
        }
        toast.error(json.error || "Upload failed. Please try again.")
        return
      }
      toast.success("Image uploaded")
      formEl.reset()
      setChosen(null)
      onUploaded(json.item as MediaItem)
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField id="file" label="Image" error={errors.file}>
        <label
          htmlFor="file"
          className={cn(
            "relative flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed p-4 text-center transition-colors hover:border-brand-orange hover:bg-brand-orange/5 has-focus-visible:border-brand-orange has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
            errors.file && "border-destructive"
          )}
        >
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Selected image preview"
                className="max-h-40 rounded-md object-contain"
              />
              <span className="max-w-full truncate text-xs text-muted-foreground">
                {chosen?.name} · {chosen ? formatBytes(chosen.size) : ""}
              </span>
            </>
          ) : (
            <>
              <span className="grid size-11 place-items-center rounded-full bg-brand-orange/15 text-brand-orange">
                <ImageIcon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-navy">
                Click to choose an image
              </span>
              <span className="text-xs text-muted-foreground">
                JPEG, PNG or WebP, up to {MAX_IMAGE_MB} MB
              </span>
            </>
          )}
          <Input
            id="file"
            name="file"
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            className="sr-only"
            onChange={(e) => setChosen(e.target.files?.[0] ?? null)}
            {...fieldA11y("file", errors.file)}
          />
        </label>
      </FormField>
      <FormField id="alt" label="Description (alt text)" error={errors.alt}>
        <Input
          id="alt"
          name="alt"
          placeholder="e.g. Six storey residential building in Dhaka"
          {...fieldA11y("alt", errors.alt)}
        />
      </FormField>
      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={pending}
      >
        <UploadIcon />
        {pending ? "Uploading..." : "Upload image"}
      </Button>
    </Form>
  )
}
