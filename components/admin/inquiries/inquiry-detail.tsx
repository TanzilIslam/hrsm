"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MailIcon, PhoneIcon, Trash2Icon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import {
  deleteInquiry,
  setInquiryStatus,
} from "@/app/admin/(protected)/inquiries/actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inquiryStatusLabel } from "@/lib/inquiry-ui"
import { inquiryStatuses } from "@/lib/validation/inquiry"

export type InquiryData = {
  id: number
  fullName: string
  company: string | null
  email: string
  phone: string
  serviceRequired: string | null
  projectLocation: string | null
  estimatedBudget: string | null
  description: string
  status: (typeof inquiryStatuses)[number]
  received: string
}

const statusItems = inquiryStatuses.map((s) => ({
  value: s,
  label: inquiryStatusLabel[s],
}))

export function InquiryDetail({ inquiry }: { inquiry: InquiryData }) {
  const router = useRouter()
  const [status, setStatus] = useState(inquiry.status)
  const [saving, setSaving] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Opening a new inquiry marks it as read (once).
  const marked = useRef(false)
  useEffect(() => {
    if (inquiry.status !== "new" || marked.current) return
    marked.current = true
    setInquiryStatus(inquiry.id, "read").then((r) => {
      if (r.ok) {
        setStatus("read")
        router.refresh()
      }
    })
  }, [inquiry.id, inquiry.status, router])

  async function changeStatus(next: string) {
    const previous = status
    setStatus(next as typeof status)
    setSaving(true)
    const result = await setInquiryStatus(inquiry.id, next)
    setSaving(false)
    if (!result.ok) {
      setStatus(previous)
      toast.error(result.message)
      return
    }
    toast.success(`Marked as ${inquiryStatusLabel[next as typeof status]}`)
    router.refresh()
  }

  async function confirmDelete() {
    setDeleting(true)
    const result = await deleteInquiry(inquiry.id)
    setDeleting(false)
    if (!result.ok) {
      toast.error(result.message)
      return
    }
    toast.success("Inquiry deleted")
    router.push("/admin/inquiries")
    router.refresh()
  }

  const fields: [string, string | null][] = [
    ["Company", inquiry.company],
    ["Service required", inquiry.serviceRequired],
    ["Project location", inquiry.projectLocation],
    ["Estimated budget", inquiry.estimatedBudget],
    ["Received", inquiry.received],
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
      <div className="space-y-6 rounded-xl bg-white p-6 ring-1 ring-foreground/10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-navy">{inquiry.fullName}</h1>
          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
        </div>

        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-sm">{value || "-"}</dd>
            </div>
          ))}
        </dl>

        <div>
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Message
          </h2>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
            {inquiry.description}
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl bg-white p-6 ring-1 ring-foreground/10">
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select
            value={status}
            items={statusItems}
            disabled={saving}
            onValueChange={(v) => v && changeStatus(v)}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusItems.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <a
            href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your inquiry to HRSM")}`}
            className={buttonVariants({ size: "lg" })}
          >
            <MailIcon />
            Reply by email
          </a>
          <a
            href={`tel:${inquiry.phone.replace(/[^+\d]/g, "")}`}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <PhoneIcon />
            {inquiry.phone}
          </a>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Link
            href="/admin/inquiries"
            className="text-sm font-medium text-navy hover:text-brand-orange"
          >
            Back to inbox
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmOpen(true)}
            className="text-destructive"
          >
            <Trash2Icon />
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(o) => !deleting && setConfirmOpen(o)}
        title="Delete this inquiry?"
        description="It is removed permanently and cannot be recovered."
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
