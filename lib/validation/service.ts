import { z } from "zod"

import { serviceIconKeys } from "@/lib/service-icons"

// Admin form input for a service. sortOrder is managed by the reorder buttons.
export const serviceFormSchema = z
  .object({
    title: z.string().trim().min(2, "Enter a title").max(160),
    slug: z
      .string()
      .trim()
      .min(1, "Enter a slug")
      .max(160)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Use lowercase letters, numbers, and hyphens only"
      ),
    shortDescription: z
      .string()
      .trim()
      .min(10, "Write at least 10 characters")
      .max(400, "Keep it under 400 characters"),
    content: z.string().trim().max(20000, "Content is too long"),
    icon: z.enum(serviceIconKeys, { message: "Choose an icon" }),
    image: z.string().trim().url().nullable(),
    imageAlt: z.string().trim().max(200),
    published: z.boolean(),
  })
  .refine((v) => !v.image || v.imageAlt.length >= 3, {
    message: "Add a short description for the image",
    path: ["image"],
  })

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
