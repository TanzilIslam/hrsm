"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

import {
  deleteService,
  moveService,
  setServicePublished,
} from "@/app/admin/(protected)/services/actions"
import { EmptyState } from "@/components/site/sections"
import { Button, buttonVariants } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { serviceIcons, toIconKey } from "@/lib/service-icons"

export type ServiceRow = {
  id: number
  title: string
  slug: string
  shortDescription: string
  icon: string | null
  image: string | null
  imageAlt: string
  published: boolean
}

export function ServicesTable({ rows }: { rows: ServiceRow[] }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [target, setTarget] = useState<ServiceRow | null>(null)
  const [deleting, setDeleting] = useState(false)

  function run(
    action: () => Promise<{ ok: boolean; message?: string }>,
    ok?: string
  ) {
    startTransition(async () => {
      const result = await action()
      if (!result.ok) {
        toast.error(result.message ?? "Something went wrong.")
        return
      }
      if (ok) toast.success(ok)
      router.refresh()
    })
  }

  async function confirmDelete() {
    if (!target) return
    setDeleting(true)
    const result = await deleteService(target.id)
    setDeleting(false)
    if (!result.ok) {
      toast.error(result.message)
      return
    }
    toast.success("Service deleted")
    setTarget(null)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Services</h1>
        <Link
          href="/admin/services/new"
          className={buttonVariants({ size: "lg" })}
        >
          <PlusIcon />
          Add service
        </Link>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No services yet"
          description="Add your first service to show it on the website."
        />
      ) : (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 pl-4">Order</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="w-32">Published</TableHead>
                <TableHead className="w-28 pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => {
                const Icon = serviceIcons[toIconKey(row.icon)].icon
                return (
                  <TableRow key={row.id}>
                    <TableCell className="pl-4">
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Move ${row.title} up`}
                          disabled={pending || i === 0}
                          onClick={() => run(() => moveService(row.id, "up"))}
                        >
                          <ArrowUpIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Move ${row.title} down`}
                          disabled={pending || i === rows.length - 1}
                          onClick={() => run(() => moveService(row.id, "down"))}
                        >
                          <ArrowDownIcon />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {row.image ? (
                          <Image
                            src={row.image}
                            alt={row.imageAlt}
                            width={40}
                            height={40}
                            className="size-10 rounded-md object-cover"
                          />
                        ) : (
                          <span className="grid size-10 place-items-center rounded-md bg-navy/10 text-navy">
                            <Icon className="size-5" aria-hidden />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium">{row.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            /services/{row.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={row.published}
                        disabled={pending}
                        aria-label={`${row.published ? "Unpublish" : "Publish"} ${row.title}`}
                        onCheckedChange={(checked) =>
                          run(
                            () => setServicePublished(row.id, checked),
                            checked ? "Service published" : "Service hidden"
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex justify-end gap-0.5">
                        <Link
                          href={`/admin/services/${row.id}/edit`}
                          aria-label={`Edit ${row.title}`}
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
                          aria-label={`Delete ${row.title}`}
                          title="Delete"
                          onClick={() => setTarget(row)}
                        >
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!target}
        onOpenChange={(o) => !o && !deleting && setTarget(null)}
        title={`Delete "${target?.title ?? ""}"?`}
        description="It disappears from the website immediately. The image stays in the media library."
        pending={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
