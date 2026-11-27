"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import {
  createProject,
  updateProject,
} from "@/app/admin/(protected)/projects/actions"
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
import { slugify } from "@/lib/slug"
import type { FieldErrors } from "@/lib/validation/auth"
import {
  projectFormSchema,
  projectTypeSuggestions,
  type ProjectFormInput,
} from "@/lib/validation/project"

type Errors = FieldErrors<keyof ProjectFormInput>

const statusItems = [
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
]

export function ProjectForm({
  id,
  initial,
}: {
  id?: number
  initial: ProjectFormInput
}) {
  const router = useRouter()
  const [values, setValues] = useState(initial)
  const [slugTouched, setSlugTouched] = useState(!!id)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)

  const set = <K extends keyof ProjectFormInput>(
    key: K,
    value: ProjectFormInput[K]
  ) => setValues((v) => ({ ...v, [key]: value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = projectFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      toast.error("Please fix the highlighted fields.")
      return
    }
    setErrors({})
    setPending(true)
    try {
      const result = id
        ? await updateProject(id, values)
        : await createProject(values)
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        toast.error(result.message)
        return
      }
      toast.success(id ? "Project updated" : "Project created")
      router.push("/admin/projects")
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
        <FormField id="name" label="Project name" error={errors.name}>
          <Input
            id="name"
            value={values.name}
            placeholder="e.g. Skyline Residential Tower"
            onChange={(e) => {
              const name = e.target.value
              setValues((v) => ({
                ...v,
                name,
                slug: slugTouched ? v.slug : slugify(name),
              }))
            }}
            {...fieldA11y("name", errors.name)}
          />
        </FormField>
        <FormField id="slug" label="Slug (page address)" error={errors.slug}>
          <Input
            id="slug"
            value={values.slug}
            placeholder="skyline-residential-tower"
            onChange={(e) => {
              setSlugTouched(true)
              set("slug", e.target.value)
            }}
            {...fieldA11y("slug", errors.slug)}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField id="location" label="Location" error={errors.location}>
          <Input
            id="location"
            value={values.location}
            placeholder="e.g. Gulshan, Dhaka"
            onChange={(e) => set("location", e.target.value)}
            {...fieldA11y("location", errors.location)}
          />
        </FormField>
        <FormField id="type" label="Project type" error={errors.type}>
          <Input
            id="type"
            list="project-types"
            value={values.type}
            placeholder="e.g. Residential"
            onChange={(e) => set("type", e.target.value)}
            {...fieldA11y("type", errors.type)}
          />
          <datalist id="project-types">
            {projectTypeSuggestions.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </FormField>
        <FormField id="status" label="Status" error={errors.status}>
          <Select
            value={values.status}
            items={statusItems}
            onValueChange={(v) =>
              set("status", v as ProjectFormInput["status"])
            }
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Choose a status" />
            </SelectTrigger>
            <SelectContent>
              {statusItems.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="startDate" label="Start date" error={errors.startDate}>
          <Input
            id="startDate"
            type="date"
            value={values.startDate ?? ""}
            onChange={(e) => set("startDate", e.target.value)}
            {...fieldA11y("startDate", errors.startDate)}
          />
        </FormField>
        <FormField
          id="completionDate"
          label="Completion date"
          error={errors.completionDate}
        >
          <Input
            id="completionDate"
            type="date"
            value={values.completionDate ?? ""}
            onChange={(e) => set("completionDate", e.target.value)}
            {...fieldA11y("completionDate", errors.completionDate)}
          />
        </FormField>
      </div>

      <FormField
        id="description"
        label="Short description"
        error={errors.description}
      >
        <Textarea
          id="description"
          rows={2}
          value={values.description}
          placeholder="One or two sentences shown on project cards"
          onChange={(e) => set("description", e.target.value)}
          {...fieldA11y("description", errors.description)}
        />
      </FormField>

      <FormField id="content" label="Project details" error={errors.content}>
        <Textarea
          id="content"
          rows={9}
          value={values.content}
          placeholder="Scope, size, materials, highlights. Leave a blank line between paragraphs."
          onChange={(e) => set("content", e.target.value)}
          {...fieldA11y("content", errors.content)}
        />
      </FormField>

      <FormField id="cover" label="Cover image" error={errors.cover}>
        <ImageUploader
          value={values.cover ? [values.cover] : []}
          onChange={(imgs) => set("cover", imgs[0] ?? null)}
        />
      </FormField>

      <FormField id="gallery" label="Gallery" error={errors.gallery}>
        <ImageUploader
          multiple
          label="Add gallery images"
          value={values.gallery}
          onChange={(imgs) => set("gallery", imgs)}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex items-center gap-3 text-sm">
          <Switch
            checked={values.published}
            onCheckedChange={(c) => set("published", c)}
          />
          {values.published ? "Published on the website" : "Hidden (draft)"}
        </label>
        <label className="flex items-center gap-3 text-sm">
          <Switch
            checked={values.featured}
            onCheckedChange={(c) => set("featured", c)}
          />
          Feature on the homepage
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : id ? "Save changes" : "Create project"}
        </Button>
        <Link
          href="/admin/projects"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Cancel
        </Link>
      </div>
    </Form>
  )
}
