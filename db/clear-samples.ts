// Removes the placeholder content created by `pnpm db:seed` so the site can
// launch with real content only. Dry run by default.
//   pnpm db:clear-samples          show what would be deleted
//   pnpm db:clear-samples --yes    delete it
//
// Deleted: projects whose slug starts with "sample-" and the seeded welcome
// post. Kept: the eight services (edit their text in the admin) and any media
// (delete images from Admin > Media).
import { config } from "dotenv"

config({ path: ".env.local" })

const SAMPLE_POST_SLUGS = ["welcome-to-the-new-hrsm-website"]

async function main() {
  const apply = process.argv.includes("--yes")
  const { db } = await import("./index")
  const { posts, projects } = await import("./schema")
  const { inArray, like } = await import("drizzle-orm")

  const sampleProjects = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .where(like(projects.slug, "sample-%"))
  const samplePosts = await db
    .select({ id: posts.id, slug: posts.slug })
    .from(posts)
    .where(inArray(posts.slug, SAMPLE_POST_SLUGS))

  console.log(
    `Sample projects: ${sampleProjects.map((p) => p.slug).join(", ") || "none"}`
  )
  console.log(
    `Sample posts: ${samplePosts.map((p) => p.slug).join(", ") || "none"}`
  )

  if (!apply) {
    console.log("\nDry run. Re-run with --yes to delete these.")
    return
  }

  if (sampleProjects.length) {
    await db.delete(projects).where(
      inArray(
        projects.id,
        sampleProjects.map((p) => p.id)
      )
    )
  }
  if (samplePosts.length) {
    await db.delete(posts).where(
      inArray(
        posts.id,
        samplePosts.map((p) => p.id)
      )
    )
  }
  console.log("\nDeleted.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
