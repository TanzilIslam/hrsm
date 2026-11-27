"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import {
  createService,
  updateService,
} from "@/app/admin/(protected)/services/actions"
import { ImageUploader } from "@/components/admin/media/image-uploader"
import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { serviceIcons, type ServiceIconKey } from "@/lib/service-icons"
import { slugify } from "@/lib/slug"
import type { FieldErrors } from "@/lib/validation/auth"
import {
  serviceFormSchema,
  type ServiceFormValues,
} from "@/lib/validation/service"

type Errors = FieldErrors<keyof ServiceFormValues>

const iconItems = Object.entries(serviceIcons).map(([value, v]) => ({
  value,
  label: v.label,
}))

export function ServiceForm({
  id,
  initial,
}: {
  id?: number
  initial: ServiceFormValues
}) {
  const router = useRouter()
  const [values, setValues] = useState(initial)
  // New services follow the title until the admin edits the slug by hand.
  const [slugTouched, setSlugTouched] = useState(!!id)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)

  const set = <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K]
  ) => setValues((v) => ({ ...v, [key]: value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = serviceFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      return
    }
    setErrors({})
    setPending(true)
    try {
      const result = id
        ? await updateService(id, parsed.data)
        : await createService(parsed.data)
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        toast.error(result.message)
        return
      }
      toast.success(id ? "Service updated" : "Service created")
      router.push("/admin/services")
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
            placeholder="e.g. Building Construction"
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
            placeholder="building-construction"
            onChange={(e) => {
              setSlugTouched(true)
              set("slug", e.target.value)
            }}
            {...fieldA11y("slug", errors.slug)}
          />
        </FormField>
      </div>

      <FormField
        id="shortDescription"
        label="Short description"
        error={errors.shortDescription}
      >
        <Textarea
          id="shortDescription"
          rows={2}
          value={values.shortDescription}
          placeholder="One or two sentences shown on the services list"
          onChange={(e) => set("shortDescription", e.target.value)}
          {...fieldA11y("shortDescription", errors.shortDescription)}
        />
      </FormField>

      <FormField id="content" label="Full details" error={errors.content}>
        <Textarea
          id="content"
          rows={9}
          value={values.content}
          placeholder="Describe the service. Leave a blank line between paragraphs."
          onChange={(e) => set("content", e.target.value)}
          {...fieldA11y("content", errors.content)}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="icon" label="Icon" error={errors.icon}>
          <Select
            value={values.icon}
            items={iconItems}
            onValueChange={(v) => set("icon", v as ServiceIconKey)}
          >
            <SelectTrigger id="icon" className="w-full">
              <SelectValue placeholder="Choose an icon" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(serviceIcons).map(([key, { label, icon: I }]) => (
                <SelectItem key={key} value={key}>
                  <I />
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <div className="grid content-start gap-2">
          <span className="text-sm leading-none font-medium">Visibility</span>
          <label className="flex h-9 items-center gap-3 text-sm">
            <Switch
              checked={values.published}
              onCheckedChange={(c) => set("published", c)}
            />
            {values.published ? "Published on the website" : "Hidden (draft)"}
          </label>
        </div>
      </div>

      <FormField id="image" label="Cover image" error={errors.image}>
        <ImageUploader
          value={
            values.image ? [{ url: values.image, alt: values.imageAlt }] : []
          }
          onChange={(imgs) => {
            set("image", imgs[0]?.url ?? null)
            set("imageAlt", imgs[0]?.alt ?? "")
          }}
        />
      </FormField>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : id ? "Save changes" : "Create service"}
        </Button>
        <Link
          href="/admin/services"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Cancel
        </Link>
      </div>
    </Form>
  )
}
