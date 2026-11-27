import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { InquiryDetail } from "@/components/admin/inquiries/inquiry-detail"
import { db } from "@/db"
import { inquiries } from "@/db/schema"
import { formatReceived } from "@/lib/inquiry-ui"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Inquiry" }

export default async function InquiryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireRole("inquiry_manager")
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) notFound()

  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id))
  if (!row) notFound()

  return (
    <InquiryDetail
      inquiry={{
        id: row.id,
        fullName: row.fullName,
        company: row.company,
        email: row.email,
        phone: row.phone,
        serviceRequired: row.serviceRequired,
        projectLocation: row.projectLocation,
        estimatedBudget: row.estimatedBudget,
        description: row.description,
        status: row.status,
        received: formatReceived(row.createdAt),
      }}
    />
  )
}
