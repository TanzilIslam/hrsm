import "server-only"

import { count, sql } from "drizzle-orm"

import { db } from "@/db"
import { inquiries, posts, projects, services } from "@/db/schema"

const filtered = (cond: ReturnType<typeof sql>) =>
  sql<number>`count(*) filter (where ${cond})`.mapWith(Number)

// Counts for the dashboard overview cards. Callers must already be authorized.
export async function getAdminStats() {
  const [[p], [i], [s], [b]] = await Promise.all([
    db
      .select({
        total: count(),
        completed: filtered(sql`${projects.status} = 'completed'`),
        ongoing: filtered(sql`${projects.status} = 'ongoing'`),
      })
      .from(projects),
    db
      .select({
        total: count(),
        new: filtered(sql`${inquiries.status} = 'new'`),
      })
      .from(inquiries),
    db.select({ total: count() }).from(services),
    db.select({ total: count() }).from(posts),
  ])

  return {
    projects: { total: p.total, completed: p.completed, ongoing: p.ongoing },
    inquiries: { total: i.total, new: i.new },
    services: s.total,
    posts: b.total,
  }
}
