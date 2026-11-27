"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { createPost, updatePost } from "@/app/admin/(protected)/blog/actions"
import { ImageUploader } from "@/components/admin/media/image-uploader"
import { Markdown } from "@/components/site/markdown"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/slug"
import type { FieldErrors } from "@/lib/validation/auth"
import { postFormSchema, type PostFormInput } from "@/lib/validation/post"
import { cn } from "@/lib/utils"

type Errors = FieldErrors<keyof PostFormInput>

export function PostForm({
  id,
  initial,
}: {
  id?: number
  initial: PostFormInput
}) {
  const router = useRouter()
  const [values, setValues] = useState(initial)
  const [slugTouched, setSlugTouched] = useState(!!id)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [tab, setTab] = useState<"write" | "preview">("write")

  const set = <K extends keyof PostFormInput>(
    key: K,
    value: PostFormInput[K]
  ) => setValues((v) => ({ ...v, [key]: value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = postFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      toast.error("Please fix the highlighted fields.")
      return
    }
    setErrors({})
    setPending(true)
    try {
      const result = id
        ? await updatePost(id, values)
        : await createPost(values)
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        toast.error(result.message)
        return
      }
      toast.success(id ? "Post updated" : "Post created")
      router.push("/admin/blog")
      router.refresh()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Form onSubmit={onSubmit} className="gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="title" label="Title" error={errors.title}>
          <Input
            id="title"
            value={values.title}
            placeholder="e.g. HRSM completes Skyline Tower"
            onChange={(e) => {
              const title = e.target.value
              setValues((v) => ({
                ...v,
                title,
                slug: slugTouched ? v.slug : slugify(title),
              }))
            }}
            {...fieldA11y("title", errors.title)}
          />
        </FormField>
        <FormField id="slug" label="Slug (page address)" error={errors.slug}>
          <Input
            id="slug"
            value={values.slug}
            placeholder="hrsm-completes-skyline-tower"
            onChange={(e) => {
              setSlugTouched(true)
              set("slug", e.target.value)
            }}
            {...fieldA11y("slug", errors.slug)}
          />
        </FormField>
      </div>

      <FormField id="excerpt" label="Excerpt" error={errors.excerpt}>
        <Textarea
          id="excerpt"
          rows={2}
          value={values.excerpt}
          placeholder="A short summary shown on the blog list and in search results"
          onChange={(e) => set("excerpt", e.target.value)}
          {...fieldA11y("excerpt", errors.excerpt)}
        />
      </FormField>

      <FormField id="content" label="Article" error={errors.content}>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Editor mode"
              className="inline-flex rounded-lg bg-secondary p-1"
            >
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors",
                    tab === t
                      ? "bg-white text-navy shadow-xs"
                      : "text-muted-foreground hover:text-navy"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Markdown: # heading, **bold**, - list, [link](https://)
            </p>
          </div>
          {tab === "write" ? (
            <Textarea
              id="content"
              rows={16}
              value={values.content}
              placeholder="Write your article here..."
              onChange={(e) => set("content", e.target.value)}
              {...fieldA11y("content", errors.content)}
            />
          ) : (
            <div
              id="content"
              className="min-h-64 rounded-md border bg-white p-4"
            >
              {values.content.trim() ? (
                <Markdown>{values.content}</Markdown>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          )}
        </div>
      </FormField>

      <FormField id="cover" label="Cover image" error={errors.cover}>
        <ImageUploader
          value={values.cover ? [values.cover] : []}
          onChange={(imgs) => set("cover", imgs[0] ?? null)}
        />
      </FormField>

      <div className="grid items-end gap-5 sm:grid-cols-2">
        <FormField
          id="publishDate"
          label="Publish date (optional)"
          error={errors.publishDate}
        >
          <Input
            id="publishDate"
            type="date"
            value={values.publishDate ?? ""}
            onChange={(e) => set("publishDate", e.target.value)}
            {...fieldA11y("publishDate", errors.publishDate)}
          />
        </FormField>
        <label className="flex h-9 items-center gap-3 text-sm">
          <Switch
            checked={values.published}
            onCheckedChange={(c) => set("published", c)}
          />
          {values.published ? "Published" : "Draft (hidden)"}
        </label>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">
        A published post with a future date goes live on that date. Leave the
        date empty to publish now.
      </p>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : id ? "Save changes" : "Create post"}
        </Button>
        <Link
          href="/admin/blog"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Cancel
        </Link>
      </div>
    </Form>
  )
}
