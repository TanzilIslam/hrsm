"use client"

import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth-client"
import { changePasswordSchema, type FieldErrors } from "@/lib/validation/auth"

const fields = [
  {
    name: "current",
    label: "Current password",
    placeholder: "Enter your current password",
    autoComplete: "current-password",
  },
  {
    name: "new",
    label: "New password",
    placeholder: "At least 10 characters",
    autoComplete: "new-password",
  },
  {
    name: "confirm",
    label: "Confirm new password",
    placeholder: "Re-enter the new password",
    autoComplete: "new-password",
  },
] as const

export function ChangePasswordForm() {
  const [errors, setErrors] = useState<
    FieldErrors<"current" | "new" | "confirm">
  >({})
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const parsed = changePasswordSchema.safeParse({
      current: form.get("current") ?? "",
      new: form.get("new") ?? "",
      confirm: form.get("confirm") ?? "",
    })

    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      return
    }
    setErrors({})
    setPending(true)

    const { error } = await authClient.changePassword({
      currentPassword: parsed.data.current,
      newPassword: parsed.data.new,
      revokeOtherSessions: true,
    })
    setPending(false)

    if (error) {
      toast.error(error.message || "Could not change the password.")
      return
    }
    formEl.reset()
    toast.success("Password changed. Other devices were signed out.")
  }

  return (
    <Form onSubmit={onSubmit} className="max-w-sm">
      {fields.map((f) => (
        <FormField
          key={f.name}
          id={f.name}
          label={f.label}
          error={errors[f.name]}
        >
          <PasswordInput
            id={f.name}
            name={f.name}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            {...fieldA11y(f.name, errors[f.name])}
          />
        </FormField>
      ))}
      <Button type="submit" size="lg" className="mt-1 w-fit" disabled={pending}>
        {pending ? "Saving..." : "Change password"}
      </Button>
    </Form>
  )
}
