import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

import { auth } from "@/lib/auth"

export type UserRole =
  "super_admin" | "editor" | "project_manager" | "inquiry_manager"

// One session lookup per request, shared by layouts, pages, and actions.
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
)

// Use in every admin page, layout, and server action.
export async function requireUser() {
  const session = await getSession()
  if (!session) redirect("/admin/login")
  return session.user
}

// super_admin always passes; other roles must be listed.
export async function requireRole(...allowed: UserRole[]) {
  const user = await requireUser()
  const role = user.role as UserRole
  if (role !== "super_admin" && !allowed.includes(role)) {
    redirect("/admin?forbidden=1")
  }
  return user
}
