"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { authClient } from "@/lib/auth-client"
import { loginSchema, type FieldErrors } from "@/lib/validation/auth"

export function LoginForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<FieldErrors<"email" | "password">>({})
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const parsed = loginSchema.safeParse({
      email: form.get("email") ?? "",
      password: form.get("password") ?? "",
    })

    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      return
    }
    setErrors({})
    setPending(true)

    const { error } = await authClient.signIn.email(parsed.data)
    if (error) {
      // The API message is generic for unknown email and wrong password.
      toast.error(error.message || "Could not sign in. Please try again.")
      setPending(false)
      return
    }

    toast.success("Signed in successfully")
    router.replace("/admin")
    router.refresh()
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormField id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@yourcompany.com"
          autoComplete="username"
          {...fieldA11y("email", errors.email)}
        />
      </FormField>
      <FormField id="password" label="Password" error={errors.password}>
        <PasswordInput
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...fieldA11y("password", errors.password)}
        />
      </FormField>
      <Button
        type="submit"
        size="lg"
        className="mt-1 w-full"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </Form>
  )
}
