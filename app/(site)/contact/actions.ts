"use server"

import { headers } from "next/headers"
import { after } from "next/server"
import { z } from "zod"

import { db } from "@/db"
import { inquiries } from "@/db/schema"
import { sendInquiryNotification } from "@/lib/email"
import { withinRateLimit } from "@/lib/rate-limit"
import {
  inquiryFormSchema,
  type InquiryFormInput,
} from "@/lib/validation/inquiry"

export type InquiryResult =
  | { ok: true }
  | {
      ok: false
      message: string
      fieldErrors?: Partial<Record<keyof InquiryFormInput, string[]>>
    }

async function clientKey() {
  const h = await headers()
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  return `inquiry:${ip}`
}

// `trap` is a hidden field real visitors never fill in; bots usually do.
export async function submitInquiry(
  values: InquiryFormInput,
  trap: string
): Promise<InquiryResult> {
  // Pretend success so bots get no signal, and store nothing.
  if (trap) return { ok: true }

  const parsed = inquiryFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  // 5 inquiries per 15 minutes per IP.
  if (!(await withinRateLimit(await clientKey(), 5, 15 * 60))) {
    return {
      ok: false,
      message:
        "You have sent several messages recently. Please wait a few minutes or call us.",
    }
  }

  let id: number
  try {
    const [row] = await db
      .insert(inquiries)
      .values(parsed.data)
      .returning({ id: inquiries.id })
    id = row.id
  } catch (err) {
    console.error("submitInquiry failed", err)
    return {
      ok: false,
      message: "We could not send your message. Please try again or call us.",
    }
  }

  // Email after the response is sent; the inquiry is already safely stored.
  after(() => sendInquiryNotification(parsed.data, id))
  return { ok: true }
}
