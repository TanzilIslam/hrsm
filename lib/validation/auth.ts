import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .pipe(z.email("Enter a valid email address")),
  password: z.string().min(1, "Enter your password"),
})

export const changePasswordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    new: z
      .string()
      .min(10, "Use at least 10 characters")
      .max(128, "Use at most 128 characters"),
    confirm: z.string().min(1, "Confirm your new password"),
  })
  .refine((v) => v.new === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })
  .refine((v) => v.new !== v.current, {
    message: "Choose a password different from the current one",
    path: ["new"],
  })

export type FieldErrors<T extends string> = Partial<Record<T, string[]>>
