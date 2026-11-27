import { createInsertSchema } from "drizzle-zod"
import { z } from "zod"

import {
  inquiries,
  media,
  posts,
  projectImages,
  projects,
  services,
} from "./schema"

const slug = z
  .string()
  .trim()
  .min(1)
  .max(160)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, hyphens"
  )

const auto = { createdAt: true, updatedAt: true } as const

export const serviceInput = createInsertSchema(services, {
  slug: () => slug,
  title: (s) => s.trim().min(2).max(160),
  shortDescription: (s) => s.trim().min(10).max(400),
}).omit(auto)

export const projectInput = createInsertSchema(projects, {
  slug: () => slug.max(200),
  name: (s) => s.trim().min(2).max(200),
  location: (s) => s.trim().min(2).max(200),
  type: (s) => s.trim().min(2).max(120),
  description: (s) => s.trim().min(10),
})
  .omit(auto)
  .refine(
    (p) => !p.startDate || !p.completionDate || p.completionDate >= p.startDate,
    {
      message: "Completion date cannot be before the start date",
      path: ["completionDate"],
    }
  )

export const projectImageInput = createInsertSchema(projectImages)

export const postInput = createInsertSchema(posts, {
  slug: () => slug.max(200),
  title: (s) => s.trim().min(2).max(200),
}).omit(auto)

export const mediaInput = createInsertSchema(media).omit({ createdAt: true })

// Public contact form. Status and timestamps are never client-controlled.
export const inquiryInput = createInsertSchema(inquiries, {
  fullName: (s) => s.trim().min(2, "Enter your name").max(160),
  company: (s) => s.trim().max(200),
  email: z.email("Enter a valid email").max(254),
  phone: (s) =>
    s
      .trim()
      .min(6, "Enter a valid phone number")
      .max(40)
      .regex(/^[+\d][\d\s()-]*$/, "Enter a valid phone number"),
  serviceRequired: (s) => s.trim().max(160),
  projectLocation: (s) => s.trim().max(200),
  estimatedBudget: (s) => s.trim().max(80),
  description: (s) => s.trim().min(10, "Tell us a bit more").max(4000),
}).omit({ status: true, createdAt: true })

export type ServiceInput = z.infer<typeof serviceInput>
export type ProjectInput = z.infer<typeof projectInput>
export type PostInput = z.infer<typeof postInput>
export type InquiryInput = z.infer<typeof inquiryInput>
