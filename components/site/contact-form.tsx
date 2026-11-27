"use client"

import { CheckCircle2Icon, SendIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { submitInquiry } from "@/app/(site)/contact/actions"
import { Button } from "@/components/ui/button"
import { Form, FormField, fieldA11y } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { FieldErrors } from "@/lib/validation/auth"
import {
  budgetOptions,
  inquiryFormSchema,
  type InquiryFormInput,
} from "@/lib/validation/inquiry"

type Errors = FieldErrors<keyof InquiryFormInput>

const empty: InquiryFormInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  serviceRequired: "",
  projectLocation: "",
  estimatedBudget: "",
  description: "",
}

export function ContactForm({ services }: { services: string[] }) {
  const [values, setValues] = useState(empty)
  const [trap, setTrap] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof InquiryFormInput>(
    key: K,
    value: InquiryFormInput[K]
  ) => setValues((v) => ({ ...v, [key]: value }))

  const serviceItems = [...services, "Other"].map((s) => ({
    value: s,
    label: s,
  }))
  const budgetItems = budgetOptions.map((b) => ({ value: b, label: b }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = inquiryFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      return
    }
    setErrors({})
    setPending(true)
    try {
      const result = await submitInquiry(values, trap)
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        toast.error(result.message)
        return
      }
      setSent(true)
      setValues(empty)
      toast.success("Thank you! We will contact you soon.")
    } catch {
      toast.error("Something went wrong. Please try again or call us.")
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl bg-white p-10 text-center shadow-xs ring-1 ring-foreground/10"
      >
        <CheckCircle2Icon className="size-12 text-emerald-600" aria-hidden />
        <h3 className="text-xl font-semibold text-navy">Message sent</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for contacting HRSM. Our team will review your project
          details and get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="gap-5 rounded-xl bg-white p-6 shadow-xs ring-1 ring-foreground/10 sm:p-8"
    >
      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" error={errors.fullName}>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Your full name"
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            {...fieldA11y("fullName", errors.fullName)}
          />
        </FormField>
        <FormField
          id="company"
          label="Company name (optional)"
          error={errors.company}
        >
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Your company"
            value={values.company ?? ""}
            onChange={(e) => set("company", e.target.value)}
            {...fieldA11y("company", errors.company)}
          />
        </FormField>
        <FormField id="email" label="Email address" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            {...fieldA11y("email", errors.email)}
          />
        </FormField>
        <FormField id="phone" label="Phone number" error={errors.phone}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880 1XXX-XXXXXX"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            {...fieldA11y("phone", errors.phone)}
          />
        </FormField>
        <FormField
          id="serviceRequired"
          label="Service required"
          error={errors.serviceRequired}
        >
          <Select
            value={values.serviceRequired || null}
            items={serviceItems}
            onValueChange={(v) => set("serviceRequired", v ?? "")}
          >
            <SelectTrigger id="serviceRequired" className="w-full">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceItems.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          id="projectLocation"
          label="Project location"
          error={errors.projectLocation}
        >
          <Input
            id="projectLocation"
            placeholder="e.g. Uttara, Dhaka"
            value={values.projectLocation ?? ""}
            onChange={(e) => set("projectLocation", e.target.value)}
            {...fieldA11y("projectLocation", errors.projectLocation)}
          />
        </FormField>
      </div>

      <FormField
        id="estimatedBudget"
        label="Estimated budget"
        error={errors.estimatedBudget}
      >
        <Select
          value={values.estimatedBudget || null}
          items={budgetItems}
          onValueChange={(v) => set("estimatedBudget", v ?? "")}
        >
          <SelectTrigger id="estimatedBudget" className="w-full">
            <SelectValue placeholder="Choose a range" />
          </SelectTrigger>
          <SelectContent>
            {budgetItems.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        id="description"
        label="Project description"
        error={errors.description}
      >
        <Textarea
          id="description"
          rows={5}
          placeholder="Tell us about your project: type, size, timeline, and anything else we should know."
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          {...fieldA11y("description", errors.description)}
        />
      </FormField>

      <Button
        type="submit"
        size="lg"
        className="h-11 w-fit px-6"
        disabled={pending}
      >
        <SendIcon />
        {pending ? "Sending..." : "Send message"}
      </Button>
    </Form>
  )
}
