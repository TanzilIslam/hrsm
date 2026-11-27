import { z } from "zod"

// Empty date input -> null.
const optionalDate = z
  .union([z.literal(""), z.iso.date("Enter a valid date")])
  .transform((v) => v || null)

export const postFormSchema = z
  .object({
    title: z.string().trim().min(2, "Enter a title").max(200),
    slug: z
      .string()
      .trim()
      .min(1, "Enter a slug")
      .max(200)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers, and hyphens only"
      ),
    excerpt: z
      .string()
      .trim()
      .min(10, "Write at least 10 characters")
      .max(400, "Keep it under 400 characters"),
    content: z
      .string()
      .trim()
      .min(20, "Write at least 20 characters")
      .max(50000, "The article is too long"),
    cover: z
      .object({
        url: z.string().trim().url(),
        alt: z.string().trim().max(200),
      })
      .nullable(),
    publishDate: optionalDate,
    published: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.cover && v.cover.alt.length < 3) {
      ctx.addIssue({
        code: "custom",
        path: ["cover"],
        message: "Add a short description for the cover image",
      })
    }
  })

export type PostFormInput = z.input<typeof postFormSchema>
export type PostFormValues = z.output<typeof postFormSchema>
