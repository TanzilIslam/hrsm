import { z } from "zod"

// Empty optional text -> null so the database stores a real "not given".
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters`)
    .transform((v) => v || null)

export const budgetOptions = [
  "Under 10 lakh BDT",
  "10 – 50 lakh BDT",
  "50 lakh – 1 crore BDT",
  "1 – 5 crore BDT",
  "Over 5 crore BDT",
  "Not sure yet",
] as const

export const inquiryFormSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(160),
  company: optionalText(200),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email address"))
    .pipe(z.string().max(254)),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(40, "Enter a valid phone number")
    .regex(/^[+\d][\d\s()-]*$/, "Use digits, spaces, + or - only"),
  serviceRequired: optionalText(160),
  projectLocation: optionalText(200),
  estimatedBudget: optionalText(80),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(4000, "Please keep the description under 4000 characters"),
})

export type InquiryFormInput = z.input<typeof inquiryFormSchema>
export type InquiryFormValues = z.output<typeof inquiryFormSchema>

export const inquiryStatuses = ["new", "read", "replied", "closed"] as const
