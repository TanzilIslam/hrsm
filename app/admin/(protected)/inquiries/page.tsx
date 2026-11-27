import { and, desc, eq, ilike, or } from "drizzle-orm"
import type { Metadata } from "next"
import Link from "next/link"
import { InboxIcon, SearchIcon } from "lucide-react"

import { EmptyState } from "@/components/site/sections"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/db"
import { inquiries } from "@/db/schema"
import {
  formatReceived,
  inquiryStatusLabel,
  inquiryStatusStyle,
} from "@/lib/inquiry-ui"
import { requireRole } from "@/lib/session"
import { cn } from "@/lib/utils"
import { inquiryStatuses } from "@/lib/validation/inquiry"

export const metadata: Metadata = { title: "Inquiries" }

const tabs = [
  { value: "all", label: "All" },
  ...inquiryStatuses.map((s) => ({ value: s, label: inquiryStatusLabel[s] })),
]

function href(status: string, q: string) {
  const params = new URLSearchParams()
  if (status !== "all") params.set("status", status)
  if (q) params.set("q", q)
  const s = params.toString()
  return `/admin/inquiries${s ? `?${s}` : ""}`
}

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  await requireRole("inquiry_manager")
  const sp = await searchParams
  const status = inquiryStatuses.find((s) => s === sp.status)
  const q = sp.q?.trim().slice(0, 100) ?? ""
  const like = q ? `%${q.replace(/[\\%_]/g, "\\$&")}%` : null

  const rows = await db
    .select({
      id: inquiries.id,
      fullName: inquiries.fullName,
      company: inquiries.company,
      email: inquiries.email,
      serviceRequired: inquiries.serviceRequired,
      status: inquiries.status,
      createdAt: inquiries.createdAt,
    })
    .from(inquiries)
    .where(
      and(
        status ? eq(inquiries.status, status) : undefined,
        like
          ? or(
              ilike(inquiries.fullName, like),
              ilike(inquiries.company, like),
              ilike(inquiries.email, like),
              ilike(inquiries.phone, like),
              ilike(inquiries.description, like)
            )
          : undefined
      )
    )
    .orderBy(desc(inquiries.createdAt), desc(inquiries.id))
    .limit(200)

  const active = status ?? "all"

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-navy">Inquiries</h1>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {tabs.map((t) => (
            <Link
              key={t.value}
              href={href(t.value, q)}
              aria-current={active === t.value ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === t.value
                  ? "bg-navy text-white"
                  : "bg-white text-navy ring-1 ring-foreground/10 hover:bg-secondary"
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <form action="/admin/inquiries" className="relative w-full sm:w-72">
          {status && <input type="hidden" name="status" value={status} />}
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone, message"
            aria-label="Search inquiries"
            className="bg-white pl-9"
          />
        </form>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={q || status ? "No matching inquiries" : "No inquiries yet"}
          description={
            q || status
              ? "Try a different search or filter."
              : "Messages sent from the contact form appear here."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">From</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead className="hidden w-44 sm:table-cell">
                  Received
                </TableHead>
                <TableHead className="w-28 pr-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.id}
                  className={cn(r.status === "new" && "bg-brand-orange/5")}
                >
                  <TableCell className="pl-4">
                    <Link
                      href={`/admin/inquiries/${r.id}`}
                      className="group flex items-center gap-3 outline-none"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy/10 text-navy">
                        <InboxIcon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block truncate group-hover:underline group-focus-visible:underline",
                            r.status === "new" ? "font-semibold" : "font-medium"
                          )}
                        >
                          {r.fullName}
                          {r.company ? ` · ${r.company}` : ""}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {r.email}
                        </span>
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-sm md:table-cell">
                    {r.serviceRequired ?? "-"}
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {formatReceived(r.createdAt)}
                  </TableCell>
                  <TableCell className="pr-4">
                    <Badge className={inquiryStatusStyle[r.status]}>
                      {inquiryStatusLabel[r.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
