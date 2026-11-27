import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react"

import { ProjectCard } from "@/components/site/project-card"
import {
  CtaBand,
  EmptyState,
  PageHero,
  Section,
} from "@/components/site/sections"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPublishedProjects } from "@/lib/queries/projects"
import { cn } from "@/lib/utils"
import { projectStatuses } from "@/lib/validation/project"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed, ongoing, and upcoming construction projects by HRSM.",
}

const tabs = [
  { value: "all", label: "All Projects" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
] as const

// Filters live in the URL so a filtered list can be shared and survives reload.
function href(status: string, q: string, page = 1) {
  const params = new URLSearchParams()
  if (status !== "all") params.set("status", status)
  if (q) params.set("q", q)
  if (page > 1) params.set("page", String(page))
  const s = params.toString()
  return `/projects${s ? `?${s}` : ""}`
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const sp = await searchParams
  const status = projectStatuses.find((s) => s === sp.status)
  const q = sp.q?.trim().slice(0, 100) ?? ""
  const page = Math.max(1, Math.floor(Number(sp.page)) || 1)

  const { items, total, pageSize } = await getPublishedProjects({
    status,
    q,
    page,
  })
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const active = status ?? "all"

  // A page number past the end (stale link) goes to the last real page.
  if (items.length === 0 && total > 0) redirect(href(active, q, pages))

  return (
    <>
      <PageHero
        title="Projects"
        description="A look at our completed, ongoing, and upcoming work."
      />
      <Section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Filter projects by status"
            className="flex flex-wrap gap-2"
          >
            {tabs.map((t) => (
              <Link
                key={t.value}
                href={href(t.value, q)}
                aria-current={active === t.value ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === t.value
                    ? "bg-navy text-white"
                    : "bg-white text-navy ring-1 ring-foreground/15 hover:bg-secondary"
                )}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <form action="/projects" className="relative w-full sm:w-72">
            {status && <input type="hidden" name="status" value={status} />}
            <SearchIcon
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              name="q"
              defaultValue={q}
              placeholder="Search projects"
              aria-label="Search projects"
              className="h-10 bg-white pl-9"
            />
          </form>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title={
              q || status ? "No matching projects" : "Projects coming soon"
            }
            description={
              q || status
                ? "Try a different search or filter."
                : "We are updating this page. Please check back shortly."
            }
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        )}

        {pages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-3"
          >
            {page > 1 ? (
              <Link
                href={href(active, q, page - 1)}
                className={buttonVariants({ variant: "outline" })}
              >
                <ChevronLeftIcon />
                Previous
              </Link>
            ) : null}
            <span className="text-sm text-muted-foreground">
              Page {Math.min(page, pages)} of {pages}
            </span>
            {page < pages ? (
              <Link
                href={href(active, q, page + 1)}
                className={buttonVariants({ variant: "outline" })}
              >
                Next
                <ChevronRightIcon />
              </Link>
            ) : null}
          </nav>
        )}
      </Section>
      <CtaBand />
    </>
  )
}
