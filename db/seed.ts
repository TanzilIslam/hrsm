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

// Placeholder service copy (replace with HRSM's real text in the admin).
const serviceContent: Record<string, string> = {
  "building-construction":
    "We build residential and commercial buildings from foundation to handover, with careful planning, quality materials, and clear communication at every stage.\n\nFrom apartment blocks to office buildings, our teams follow engineering standards and deliver on schedule.",
  "civil-engineering":
    "Our civil engineering team handles site works, drainage, earthworks, and the structures that support them.\n\nWe combine practical site experience with sound engineering to deliver safe, durable results.",
  "industrial-construction":
    "We construct factories, warehouses, and industrial facilities designed around your production flow, loads, and future expansion.\n\nSpeed, safety, and long-term reliability guide every industrial project we take on.",
  "road-construction":
    "We deliver roads, pavements, and supporting infrastructure, including base preparation, drainage, and surfacing.\n\nOur crews work to specification and keep disruption to a minimum.",
  "interior-exterior":
    "From interior fit-outs to façades and landscaping, we finish spaces so they look good and last.\n\nOur team coordinates design, materials, and trades so the finishing stage runs smoothly.",
  "structural-engineering":
    "We provide structural design and review for buildings and infrastructure, balancing safety, cost, and buildability.\n\nOur engineers work closely with architects and site teams from concept to completion.",
  "project-management":
    "We manage construction projects end to end: scheduling, procurement, cost control, quality, and safety.\n\nYou get a single point of accountability and regular, honest progress updates.",
  renovation:
    "We renovate and remodel existing buildings, from targeted upgrades to full refurbishments.\n\nWe plan around occupants, protect what stays, and bring older buildings up to modern standards.",
}

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

// Placeholder project copy (replace with real details in the admin).
const projectContent: Record<string, string> = {
  "sample-residential-tower":
    "A placeholder entry for a completed residential tower.\n\nReplace this with the project scope, number of floors, floor area, and the key challenges your team solved.",
  "sample-factory-complex":
    "A placeholder entry for an ongoing industrial complex.\n\nReplace this with the facility size, structure type, and the current phase of construction.",
  "sample-commercial-plaza":
    "A placeholder entry for an upcoming commercial plaza.\n\nReplace this with the planned scope, expected timeline, and design highlights.",
}

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
  const { and, eq } = await import("drizzle-orm")

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

  // Fill empty content on existing sample services without touching edits.
  for (const [slug, text] of Object.entries(serviceContent)) {
    await db
      .update(servicesTable)
      .set({ content: text })
      .where(and(eq(servicesTable.slug, slug), eq(servicesTable.content, "")))
  }

  await db
    .insert(projectsTable)
    .values(projects.map((p) => projectInput.parse(p)))
    .onConflictDoNothing({ target: projectsTable.slug })

  for (const [slug, body] of Object.entries(projectContent)) {
    await db
      .update(projectsTable)
      .set({ content: body })
      .where(and(eq(projectsTable.slug, slug), eq(projectsTable.content, "")))
  }

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
