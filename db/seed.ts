// Sample data for development. Safe to re-run: rows are matched by slug and
// existing ones are left untouched. Remove or replace before launch.
import { config } from "dotenv"

config({ path: ".env.local" })

const services = [
  [
    "building-construction",
    "Building Construction",
    "Residential and commercial buildings",
    "building-2",
  ],
  [
    "civil-engineering",
    "Civil Engineering",
    "Civil construction and engineering",
    "hard-hat",
  ],
  [
    "industrial-construction",
    "Industrial Construction",
    "Factory and industrial buildings",
    "factory",
  ],
  [
    "road-construction",
    "Road Construction",
    "Roads and infrastructure",
    "route",
  ],
  [
    "interior-exterior",
    "Interior & Exterior",
    "Interior and exterior solutions",
    "paint-roller",
  ],
  [
    "structural-engineering",
    "Structural Engineering",
    "Structural design and engineering",
    "ruler",
  ],
  [
    "project-management",
    "Project Management",
    "Construction project management",
    "clipboard-list",
  ],
  ["renovation", "Renovation", "Building renovation and remodeling", "wrench"],
] as const

const projects = [
  {
    slug: "sample-residential-tower",
    name: "Sample Residential Tower",
    location: "Dhaka",
    type: "Residential",
    description: "A sample residential tower used as placeholder content.",
    status: "completed",
    startDate: "2022-01-10",
    completionDate: "2024-03-30",
    featured: true,
    published: true,
  },
  {
    slug: "sample-factory-complex",
    name: "Sample Factory Complex",
    location: "Gazipur",
    type: "Industrial",
    description: "A sample industrial complex used as placeholder content.",
    status: "ongoing",
    startDate: "2024-05-01",
    completionDate: null,
    featured: true,
    published: true,
  },
  {
    slug: "sample-commercial-plaza",
    name: "Sample Commercial Plaza",
    location: "Chattogram",
    type: "Commercial",
    description: "A sample commercial plaza used as placeholder content.",
    status: "upcoming",
    startDate: null,
    completionDate: null,
    featured: false,
    published: true,
  },
] as const

const posts = [
  {
    slug: "welcome-to-the-new-hrsm-website",
    title: "Welcome to the new HRSM website",
    excerpt: "A sample post used as placeholder content.",
    content: "This is a sample post. Replace it with real company news.",
    published: true,
    publishedAt: new Date(),
  },
] as const

async function main() {
  const { db } = await import("./index")
  const {
    posts: postsTable,
    projects: projectsTable,
    services: servicesTable,
  } = await import("./schema")
  const { postInput, projectInput, serviceInput } = await import("./validation")

  await db
    .insert(servicesTable)
    .values(
      services.map(([slug, title, shortDescription, icon], i) =>
        serviceInput.parse({
          slug,
          title,
          shortDescription,
          icon,
          sortOrder: i,
          published: true,
        })
      )
    )
    .onConflictDoNothing({ target: servicesTable.slug })

  await db
    .insert(projectsTable)
    .values(projects.map((p) => projectInput.parse(p)))
    .onConflictDoNothing({ target: projectsTable.slug })

  await db
    .insert(postsTable)
    .values(posts.map((p) => postInput.parse(p)))
    .onConflictDoNothing({ target: postsTable.slug })

  console.log("Seed complete.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
