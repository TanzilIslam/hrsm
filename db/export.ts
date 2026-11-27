// Exports every content table to a JSON file in ./backups (gitignored).
// Usage: pnpm db:export
//
// This is a safety net on top of Neon's own history (only 6 hours on the free
// plan). The file contains personal data (inquiries) and password hashes, so
// store it somewhere private and never commit it.
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { config } from "dotenv"

config({ path: ".env.local" })

async function main() {
  const { db } = await import("./index")
  const s = await import("./schema")

  // Sessions, verification codes, and rate-limit counters are temporary.
  const tables = {
    services: s.services,
    projects: s.projects,
    project_images: s.projectImages,
    posts: s.posts,
    inquiries: s.inquiries,
    media: s.media,
    user: s.user,
    account: s.account,
  } as const

  const data: Record<string, unknown[]> = {}
  for (const [name, table] of Object.entries(tables)) {
    data[name] = await db.select().from(table)
  }

  const dir = join(process.cwd(), "backups")
  mkdirSync(dir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16)
  const file = join(dir, `hrsm-${stamp}.json`)
  writeFileSync(
    file,
    JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)
  )

  const counts = Object.entries(data)
    .map(([k, v]) => `${k}: ${v.length}`)
    .join(", ")
  console.log(`Exported to ${file}\n${counts}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
