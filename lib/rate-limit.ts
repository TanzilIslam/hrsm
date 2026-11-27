import "server-only"

import { eq, sql } from "drizzle-orm"

import { db } from "@/db"
import { rateLimit } from "@/db/schema"

// Fixed-window limiter stored in Postgres (works across serverless instances).
// Returns true when the caller is within the limit.
export async function withinRateLimit(
  key: string,
  max: number,
  windowSeconds: number
) {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  const id = `rl:${key}`

  const [row] = await db
    .insert(rateLimit)
    .values({ id, key: id, count: 1, lastRequest: now })
    .onConflictDoUpdate({
      target: rateLimit.key,
      set: {
        // Start a new window if the old one expired, otherwise count up.
        count: sql`case when ${now} - ${rateLimit.lastRequest} > ${windowMs} then 1 else ${rateLimit.count} + 1 end`,
        lastRequest: sql`case when ${now} - ${rateLimit.lastRequest} > ${windowMs} then ${now} else ${rateLimit.lastRequest} end`,
      },
    })
    .returning({ count: rateLimit.count })

  return row.count <= max
}

export async function resetRateLimit(key: string) {
  await db.delete(rateLimit).where(eq(rateLimit.key, `rl:${key}`))
}
