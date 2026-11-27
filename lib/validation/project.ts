import { z } from "zod"

export const projectStatuses = ["completed", "ongoing", "upcoming"] as const

export const projectTypeSuggestions = [
  "Residential",
  "Commercial",
  "Industrial",
  "Road & infrastructure",
  "Interior & exterior",
  "Renovation",
] as const

// Empty date input -> null.
const optionalDate = z
  .union([z.literal(""), z.iso.date("Enter a valid date")])
  .transform((v) => v || null)

const imageValue = z.object({
  url: z.string().trim().url(),
  alt: z.string().trim().max(200),
})

export const projectFormSchema = z
  .object({
    name: z.string().trim().min(2, "Enter a project name").max(200),
    slug: z
      .string()
      .trim()
      .min(1, "Enter a slug")
      .max(200)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers, and hyphens only"
      ),
    location: z.string().trim().min(2, "Enter a location").max(200),
    type: z.string().trim().min(2, "Enter a project type").max(120),
    status: z.enum(projectStatuses, { message: "Choose a status" }),
    startDate: optionalDate,
    completionDate: optionalDate,
    description: z
      .string()
      .trim()
      .min(10, "Write at least 10 characters")
      .max(500, "Keep it under 500 characters"),
    content: z.string().trim().max(20000, "Details are too long"),
    cover: imageValue.nullable(),
    gallery: z.array(imageValue).max(24, "Use at most 24 gallery images"),
    featured: z.boolean(),
    published: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.status === "completed" && !v.completionDate) {
      ctx.addIssue({
        code: "custom",
        path: ["completionDate"],
        message: "Enter the completion date for a completed project",
      })
    }
    if (v.startDate && v.completionDate && v.completionDate < v.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["completionDate"],
        message: "Completion date cannot be before the start date",
      })
    }
    if (v.cover && v.cover.alt.length < 3) {
      ctx.addIssue({
        code: "custom",
        path: ["cover"],
        message: "Add a short description for the cover image",
      })
    }
  })

export type ProjectFormInput = z.input<typeof projectFormSchema>
export type ProjectFormValues = z.output<typeof projectFormSchema>
