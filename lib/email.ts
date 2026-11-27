import "server-only"

import type { InquiryFormValues } from "@/lib/validation/inquiry"

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

// Sends the "new inquiry" notification through Resend's HTTP API.
// Returns false (and logs) when email is not configured or the send fails.
// A failed email must never lose the inquiry, so callers do not depend on it.
export async function sendInquiryNotification(
  inquiry: InquiryFormValues,
  id: number
) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.INQUIRY_NOTIFY_EMAIL?.split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  if (!apiKey || !to?.length) {
    console.warn(
      `Inquiry #${id} saved but no email sent: set RESEND_API_KEY and INQUIRY_NOTIFY_EMAIL.`
    )
    return false
  }

  const rows: [string, string | null][] = [
    ["Name", inquiry.fullName],
    ["Company", inquiry.company],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Service", inquiry.serviceRequired],
    ["Project location", inquiry.projectLocation],
    ["Estimated budget", inquiry.estimatedBudget],
  ]
  const text =
    rows.map(([k, v]) => `${k}: ${v ?? "-"}`).join("\n") +
    `\n\nMessage:\n${inquiry.description}`
  const html =
    `<h2>New website inquiry</h2><table cellpadding="6">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v ?? "-")}</td></tr>`
      )
      .join("") +
    `</table><p><strong>Message</strong></p><p style="white-space:pre-line">${escapeHtml(inquiry.description)}</p>`

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.INQUIRY_FROM_EMAIL ??
          "HRSM Website <onboarding@resend.dev>",
        to,
        reply_to: inquiry.email,
        subject: `New inquiry from ${inquiry.fullName}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error(
        `Inquiry #${id} email failed: ${res.status} ${await res.text()}`
      )
      return false
    }
    return true
  } catch (err) {
    console.error(`Inquiry #${id} email failed`, err)
    return false
  }
}
