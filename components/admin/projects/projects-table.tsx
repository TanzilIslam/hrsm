"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BuildingIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import {
  deleteProject,
  setProjectFlag,
} from "@/app/admin/(protected)/projects/actions"
import { EmptyState, StatusBadge } from "@/components/site/sections"
import { Button, buttonVariants } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type ProjectRow = {
  id: number
  name: string
  slug: string
  location: string
  type: string
  status: "completed" | "ongoing" | "upcoming"
  coverImage: string | null
  coverImageAlt: string
  featured: boolean
  published: boolean
}

const filters = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
] as const

function href(status: string, q: string) {
  const params = new URLSearchParams()
  if (status !== "all") params.set("status", status)
  if (q) params.set("q", q)
  const s = params.toString()
  return `/admin/projects${s ? `?${s}` : ""}`
}

export function ProjectsTable({
  rows,
  query,
  status,
}: {
  rows: ProjectRow[]
  query: string
  status: string
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [target, setTarget] = useState<ProjectRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  function setFlag(
    id: number,
    flag: "published" | "featured",
    value: boolean,
    message: string
  ) {
    startTransition(async () => {
      const result = await setProjectFlag(id, flag, value)
      if (!result.ok) {
        toast.error(result.message)
        return
      }
      toast.success(message)
      router.refresh()
    })
  }

  async function confirmDelete() {
    if (!target) return
    setDeleting(true)
    const result = await deleteProject(target.id)
    setDeleting(false)
    if (!result.ok) {
      toast.error(result.message)
      return
    }
    toast.success("Project deleted")
    setTarget(null)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Projects</h1>
        <Link
          href="/admin/projects/new"
          className={buttonVariants({ size: "lg" })}
        >
          <PlusIcon />
          Add project
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Filter by status" className="flex gap-1.5">
          {filters.map((f) => (
            <Link
              key={f.value}
              href={href(f.value, query)}
              aria-current={status === f.value ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                status === f.value
                  ? "bg-navy text-white"
                  : "bg-white text-navy ring-1 ring-foreground/10 hover:bg-secondary"
              )}
            >
              {f.label}
            </Link>
          ))}
        </nav>
        {/* Plain GET form: works without JavaScript and keeps the status filter. */}
        <form action="/admin/projects" className="relative w-full sm:w-72">
          {status !== "all" && (
            <input type="hidden" name="status" value={status} />
          )}
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search name, location, type"
            aria-label="Search projects"
            className="bg-white pl-9"
          />
        </form>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title={
            query || status !== "all"
              ? "No matching projects"
              : "No projects yet"
          }
          description={
            query || status !== "all"
              ? "Try a different search or filter."
              : "Add your first project to show it on the website."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Project</TableHead>
                <TableHead className="hidden w-32 md:table-cell">
                  Status
                </TableHead>
                <TableHead className="w-20 text-center">Featured</TableHead>
                <TableHead className="w-24">Published</TableHead>
                <TableHead className="w-24 pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      {row.coverImage ? (
                        <Image
                          src={row.coverImage}
                          alt={row.coverImageAlt}
                          width={48}
                          height={48}
                          className="size-12 rounded-md object-cover"
                        />
                      ) : (
                        <span className="grid size-12 place-items-center rounded-md bg-navy/10 text-navy">
                          <BuildingIcon className="size-5" aria-hidden />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium">{row.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {row.type} · {row.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={pending}
                      aria-pressed={row.featured}
                      aria-label={`${row.featured ? "Remove from" : "Add to"} featured: ${row.name}`}
                      title={row.featured ? "Featured" : "Not featured"}
                      onClick={() =>
                        setFlag(
                          row.id,
                          "featured",
                          !row.featured,
                          row.featured
                            ? "Removed from featured"
                            : "Marked as featured"
                        )
                      }
                    >
                      <StarIcon
                        className={cn(
                          row.featured
                            ? "fill-brand-orange text-brand-orange"
                            : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={row.published}
                      disabled={pending}
                      aria-label={`${row.published ? "Unpublish" : "Publish"} ${row.name}`}
                      onCheckedChange={(checked) =>
                        setFlag(
                          row.id,
                          "published",
                          checked,
                          checked ? "Project published" : "Project hidden"
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex justify-end gap-0.5">
                      <Link
                        href={`/admin/projects/${row.id}/edit`}
                        aria-label={`Edit ${row.name}`}
                        title="Edit"
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon-sm",
                        })}
                      >
                        <PencilIcon />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${row.name}`}
                        title="Delete"
                        onClick={() => setTarget(row)}
                      >
                        <Trash2Icon className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!target}
        onOpenChange={(o) => !o && !deleting && setTarget(null)}
        title={`Delete "${target?.name ?? ""}"?`}
        description="The project and its gallery links are removed from the website immediately. The images stay in the media library."
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
