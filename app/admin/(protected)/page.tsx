import {
  BuildingIcon,
  CheckCircle2Icon,
  FileTextIcon,
  HardHatIcon,
  InboxIcon,
  MailPlusIcon,
  TimerIcon,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getAdminStats } from "@/lib/admin-stats"
import { requireUser } from "@/lib/session"

function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
}: {
  label: string
  value: number
  icon: LucideIcon
  accent?: boolean
}) {
  return (
    <Card>
      <CardContent className="flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold text-navy">{value}</p>
        </div>
        <span
          className={
            accent
              ? "grid size-11 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange"
              : "grid size-11 place-items-center rounded-lg bg-navy/10 text-navy"
          }
        >
          <Icon className="size-5" aria-hidden />
        </span>
      </CardContent>
    </Card>
  )
}

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ forbidden?: string }>
}) {
  const user = await requireUser()
  const { forbidden } = await searchParams
  const stats = await getAdminStats()

  return (
    <div className="space-y-8">
      {forbidden && (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
        >
          You do not have permission to open that page.
        </p>
      )}

      <div>
        <h1 className="text-2xl font-bold text-navy">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here is what is happening on the HRSM website.
        </p>
      </div>

      <section aria-labelledby="projects-heading" className="space-y-3">
        <h2 id="projects-heading" className="text-sm font-semibold text-navy">
          Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total projects"
            value={stats.projects.total}
            icon={BuildingIcon}
          />
          <StatCard
            label="Completed"
            value={stats.projects.completed}
            icon={CheckCircle2Icon}
          />
          <StatCard
            label="Ongoing"
            value={stats.projects.ongoing}
            icon={TimerIcon}
          />
        </div>
      </section>

      <section aria-labelledby="content-heading" className="space-y-3">
        <h2 id="content-heading" className="text-sm font-semibold text-navy">
          Inquiries and content
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total inquiries"
            value={stats.inquiries.total}
            icon={InboxIcon}
          />
          <StatCard
            label="New inquiries"
            value={stats.inquiries.new}
            icon={MailPlusIcon}
            accent
          />
          <StatCard
            label="Services"
            value={stats.services}
            icon={HardHatIcon}
          />
          <StatCard
            label="Blog posts"
            value={stats.posts}
            icon={FileTextIcon}
          />
        </div>
      </section>
    </div>
  )
}
