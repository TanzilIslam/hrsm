// Fills the database with realistic DEMO content and photos so the whole site
// and dashboard can be reviewed. All companies, projects, people, and messages
// are invented. Photos come from db/demo-assets.json (Unsplash, free licence).
//
//   pnpm db:seed-demo
//
// Safe to re-run: services, projects, and posts are matched by slug and
// refreshed, demo inquiries are replaced. It also removes the old
// "sample-*" projects and the seeded welcome post. Replace everything with real
// content before launch.
import { readFileSync } from "node:fs"
import { join } from "node:path"

import { config } from "dotenv"

config({ path: ".env.local" })

type Asset = { url: string; alt: string }
const assets = JSON.parse(
  readFileSync(join(process.cwd(), "db", "demo-assets.json"), "utf8")
) as Record<string, Asset>
const img = (slot: string) => {
  const a = assets[slot]
  if (!a) throw new Error(`Missing demo photo: ${slot}`)
  return a
}

const day = 24 * 60 * 60 * 1000
const ago = (days: number, hours = 0) =>
  new Date(Date.now() - days * day - hours * 60 * 60 * 1000)

const services = [
  {
    slug: "building-construction",
    image: "svc-building-1",
    short:
      "Residential and commercial buildings delivered from foundation to handover.",
    content: [
      "We construct apartment buildings, offices, shopping complexes, and private homes. Every project starts with a clear scope, a realistic schedule, and a fixed point of contact, so you always know what happens next.",
      "Our teams manage structure, services, and finishes together. Materials are tested before use, work is inspected at each stage, and progress is reported to you on a regular schedule.",
      "Whether you are building a single home or a multi-storey tower, we bring the same discipline: safe sites, honest costs, and on-time handover.",
    ],
  },
  {
    slug: "civil-engineering",
    image: "svc-civil-1",
    short:
      "Earthworks, drainage, bridges, and the civil structures that support every project.",
    content: [
      "Our civil engineers plan and build the works that sit beneath and around a project: site preparation, foundations, retaining structures, drainage, culverts, and bridge components.",
      "We combine practical site experience with sound engineering judgement, choosing methods that suit local soil, water, and weather conditions in Bangladesh.",
      "From survey and design review to construction and quality control, we keep civil works safe, durable, and cost-effective.",
    ],
  },
  {
    slug: "industrial-construction",
    image: "svc-industrial-1",
    short:
      "Factories, warehouses, and industrial plants built around your production flow.",
    content: [
      "We build factories, warehouses, cold stores, and utility buildings designed around how your operation actually runs: heavy floor loads, crane runs, clear spans, ventilation, and safe material movement.",
      "Pre-engineered steel and reinforced concrete systems let us deliver large, clear-span buildings quickly, with phasing that allows your team to start production early.",
      "Safety, speed, and room to expand are built into every industrial project we take on.",
    ],
  },
  {
    slug: "road-construction",
    image: "svc-road-1",
    short:
      "Roads, pavements, and supporting infrastructure built to specification.",
    content: [
      "We build and upgrade roads, internal estate roads, car parks, and industrial pavements, including base preparation, drainage, kerbing, asphalt, and rigid pavement.",
      "Our crews use modern compaction and paving equipment, test each layer, and work in stages to keep disruption and traffic risk to a minimum.",
      "Clear drawings, quantity control, and daily site records keep road projects predictable.",
    ],
  },
  {
    slug: "interior-exterior",
    image: "svc-interior-1",
    short: "Interior fit-outs, facades, and finishing that look good and last.",
    content: [
      "We finish spaces end to end: partitions, ceilings, flooring, joinery, painting, lighting, and external cladding and facades.",
      "A single team coordinates design intent, materials, and trades so the finishing stage runs smoothly and the result matches the plan.",
      "From apartment interiors to office fit-outs and building exteriors, we pay attention to the details that clients notice every day.",
    ],
  },
  {
    slug: "structural-engineering",
    image: "svc-structural-1",
    short:
      "Structural design and review that balances safety, cost, and buildability.",
    content: [
      "Our structural engineers design and review reinforced concrete and steel structures for buildings and infrastructure, following applicable codes and good practice.",
      "We work closely with architects and site teams from concept through construction, so designs stay practical and problems are solved before they reach the site.",
      "Structural assessments of existing buildings are also available for renovation and extension projects.",
    ],
  },
  {
    slug: "project-management",
    image: "svc-management-1",
    short:
      "End-to-end construction project management with a single point of accountability.",
    content: [
      "We manage construction projects for owners and developers: scope, programme, procurement, cost control, quality, and safety, from first drawings to final handover.",
      "You get a dedicated project manager, regular written reports, and clear decisions with the cost and time impact explained up front.",
      "Our goal is simple: a project delivered on budget, on schedule, and built the way it was designed.",
    ],
  },
  {
    slug: "renovation",
    image: "svc-renovation-1",
    short:
      "Renovation and remodelling that brings older buildings up to modern standards.",
    content: [
      "We renovate homes, offices, and commercial buildings, from targeted upgrades to full refurbishment: structure, services, layouts, and finishes.",
      "We plan around occupants where buildings stay in use, protect what should remain, and strengthen or replace what has reached the end of its life.",
      "Careful surveys before work begins mean fewer surprises, and honest advice on what is worth keeping.",
    ],
  },
]

const projects = [
  {
    slug: "riverside-heights-apartments",
    name: "Riverside Heights Apartments",
    location: "Uttara, Dhaka",
    type: "Residential",
    status: "completed" as const,
    startDate: "2022-02-01",
    completionDate: "2024-04-30",
    featured: true,
    description:
      "A 14-storey residential tower with 56 apartments, a rooftop terrace, and two levels of basement parking.",
    content: [
      "Riverside Heights is a 14-storey residential building in Uttara with 56 apartments, a landscaped rooftop terrace, and two basement levels for parking and services.",
      "The reinforced concrete frame was completed in 11 months, followed by facade, services, and finishing works in parallel floors to keep the programme on track.",
      "Handover was completed on schedule after a full snagging inspection with the owner's representatives.",
    ],
    slots: ["riverside-1", "riverside-2", "riverside-3", "riverside-4"],
  },
  {
    slug: "meridian-business-plaza",
    name: "Meridian Business Plaza",
    location: "Gulshan, Dhaka",
    type: "Commercial",
    status: "ongoing" as const,
    startDate: "2024-08-15",
    completionDate: null,
    featured: true,
    description:
      "A 20-storey commercial tower with a glass curtain wall, retail podium, and column-free office floors.",
    content: [
      "Meridian Business Plaza is a 20-storey commercial building in Gulshan with a retail podium, column-free office floors, and a unitised glass curtain wall.",
      "The structure has reached the 14th floor. Curtain wall installation and mechanical, electrical, and plumbing works are progressing in sequence below.",
      "Completion is planned for next year, with floors handed over to tenants in phases.",
    ],
    slots: ["meridian-1", "meridian-2", "meridian-3", "meridian-4"],
  },
  {
    slug: "karnaphuli-industrial-works",
    name: "Karnaphuli Industrial Works",
    location: "Chattogram",
    type: "Industrial",
    status: "completed" as const,
    startDate: "2021-06-01",
    completionDate: "2023-03-15",
    featured: true,
    description:
      "A 38,000 square metre production facility with heavy steel framing, crane bays, and a utilities block.",
    content: [
      "This production facility near the Karnaphuli river covers about 38,000 square metres, with long-span steel framing, overhead crane bays, and a separate utilities block.",
      "Foundations were designed for heavy machinery and poor soil, using piled foundations and a reinforced industrial slab.",
      "The plant was delivered in two phases so production could begin in the first hall while the second was still being built.",
    ],
    slots: ["karnaphuli-1", "karnaphuli-2", "karnaphuli-3", "karnaphuli-4"],
  },
  {
    slug: "northern-bypass-road-upgrade",
    name: "Northern Bypass Road Upgrade",
    location: "Gazipur",
    type: "Road & infrastructure",
    status: "completed" as const,
    startDate: "2023-01-10",
    completionDate: "2024-02-28",
    featured: false,
    description:
      "Widening and resurfacing of 6.4 km of the northern bypass, including drainage and street lighting.",
    content: [
      "We widened and resurfaced a 6.4 km section of the northern bypass, adding a median, new drainage, and street lighting.",
      "Work was staged in short sections to keep one lane open at all times, with night paving on the busiest stretches.",
      "Every asphalt layer was tested for density and thickness before the next was placed.",
    ],
    slots: ["bypass-1", "bypass-2", "bypass-3"],
  },
  {
    slug: "lakeview-villas",
    name: "Lakeview Villas",
    location: "Sylhet",
    type: "Residential",
    status: "upcoming" as const,
    startDate: "2027-02-01",
    completionDate: null,
    featured: true,
    description:
      "A gated community of 24 contemporary villas with private pools, planned around a central lake.",
    content: [
      "Lakeview Villas is a planned gated community of 24 contemporary villas arranged around a central lake, each with a private garden and pool.",
      "Site investigation and design coordination are complete. Construction is scheduled to start early next year, in three phases of eight villas.",
      "Register your interest through the contact page to receive updates on availability.",
    ],
    slots: ["lakeview-1", "lakeview-2", "lakeview-3"],
  },
  {
    slug: "heritage-office-renovation",
    name: "Heritage Office Renovation",
    location: "Dhanmondi, Dhaka",
    type: "Renovation",
    status: "completed" as const,
    startDate: "2024-03-01",
    completionDate: "2024-09-20",
    featured: false,
    description:
      "Full refurbishment of a 1980s office building into a modern, open workspace while keeping its character.",
    content: [
      "A 1980s office building in Dhanmondi was refurbished into a modern open workspace, keeping the original brick walls and adding glazed partitions, new lighting, and upgraded services.",
      "The building stayed partly occupied, so noisy work was done out of hours and the tenant moved floor by floor.",
      "A structural survey at the start identified two beams for strengthening, avoiding surprises during the works.",
    ],
    slots: ["heritage-1", "heritage-2", "heritage-3"],
  },
  {
    slug: "greenfield-logistics-hub",
    name: "Greenfield Logistics Hub",
    location: "Narayanganj",
    type: "Industrial",
    status: "ongoing" as const,
    startDate: "2025-09-01",
    completionDate: null,
    featured: true,
    description:
      "A 22,000 square metre warehouse and distribution hub with 18 loading docks and a mezzanine office.",
    content: [
      "Greenfield Logistics Hub is a 22,000 square metre warehouse and distribution centre with 18 loading docks, a polished concrete floor, and a mezzanine office block.",
      "The steel frame and roof are complete and the floor slab is being poured in bays. Fit-out of the docks and fire protection systems follows.",
      "The client plans to start operations in the second quarter of next year.",
    ],
    slots: ["greenfield-1", "greenfield-2", "greenfield-3"],
  },
  {
    slug: "seaview-apartment-interiors",
    name: "Seaview Apartment Interiors",
    location: "Cox's Bazar",
    type: "Interior & exterior",
    status: "completed" as const,
    startDate: "2024-10-01",
    completionDate: "2025-06-30",
    featured: true,
    description:
      "Complete interior fit-out of 32 holiday apartments with custom joinery, lighting, and furniture.",
    content: [
      "We fitted out 32 holiday apartments in a beachfront building, from ceilings and flooring to custom joinery, lighting, and furniture.",
      "Materials were chosen to cope with salt air and humidity, and each apartment was finished to a single design standard.",
      "All apartments were handed over before the holiday season opened.",
    ],
    slots: ["seaview-1", "seaview-2", "seaview-3"],
  },
]

const posts = [
  {
    slug: "riverside-heights-handed-over",
    title: "Riverside Heights handed over on schedule",
    daysAgo: 5,
    slot: "milestone-1",
    excerpt:
      "After 26 months of construction, the 56 apartments of Riverside Heights in Uttara have been handed over to their owners.",
    content: `We are proud to announce that **Riverside Heights**, our 14-storey residential tower in Uttara, has been handed over to its owners on schedule.

## What we delivered

- 56 apartments across 14 floors
- Two basement levels for parking and building services
- A landscaped rooftop terrace
- A full snagging inspection with the owner's team before handover

## Thank you

This project was delivered by a team of more than 120 engineers, supervisors, and skilled workers. Thank you to every one of them, and to our client for their trust.

See the full project on our [projects page](/projects/riverside-heights-apartments).`,
  },
  {
    slug: "site-safety-week-2026",
    title: "Safety first: our Site Safety Week",
    daysAgo: 19,
    slot: "safety-1",
    excerpt:
      "Every site stopped for a day of training, equipment checks, and open conversations about working safely.",
    content: `Last week all HRSM sites paused regular work for our annual **Site Safety Week**.

## What happened

1. Every worker completed refresher training on working at height and lifting.
2. Supervisors inspected scaffolding, harnesses, and electrical equipment.
3. Teams reviewed near-miss reports and agreed improvements.

## Why it matters

Safety is not a poster on a wall. It is planning, equipment, and the habit of speaking up. We will keep running safety weeks every year.`,
  },
  {
    slug: "choosing-materials-for-bangladesh-climate",
    title: "Choosing building materials for Bangladesh's climate",
    daysAgo: 40,
    slot: "materials-1",
    excerpt:
      "Heat, humidity, and monsoon rain are hard on buildings. Here is how we select materials that last.",
    content: `Bangladesh's hot, humid climate and heavy monsoon rains put buildings under constant stress. Good material choices make the difference between a building that lasts decades and one that needs repairs in a few years.

## Concrete and reinforcement

Use the right cover to the steel, a low water-to-cement ratio, and proper curing. Corrosion of reinforcement is the most common cause of early deterioration.

## Waterproofing

Roofs, basements, and wet areas need a planned waterproofing system, not a repair after the first leak.

## Finishes

Choose paints and cladding rated for humidity and sun, and detail joints so water drains away from the structure.

If you are planning a new building, talk to us early so these choices are built into the design.`,
  },
  {
    slug: "meridian-business-plaza-progress",
    title: "Meridian Business Plaza reaches the 14th floor",
    daysAgo: 70,
    slot: "update-1",
    excerpt:
      "The structure of our Gulshan commercial tower is now two thirds complete, with curtain wall installation under way.",
    content: `Construction of **Meridian Business Plaza** in Gulshan has reached the 14th floor of 20.

## Progress so far

- Structural frame: 14 of 20 floors complete
- Curtain wall: installation started on the lower floors
- Mechanical and electrical works: under way in the podium

## What is next

The remaining six floors are scheduled over the coming months, followed by the roof plant and external works. We will share more photos as the glass facade takes shape.`,
  },
]

const inquiries = [
  {
    fullName: "Farhan Ahmed",
    company: "Ahmed Properties Ltd",
    email: "farhan.ahmed@example.com",
    phone: "+880 1711-482930",
    serviceRequired: "Building Construction",
    projectLocation: "Bashundhara R/A, Dhaka",
    estimatedBudget: "1 – 5 crore BDT",
    description:
      "We own a 10 katha plot in Bashundhara and want to build a 9-storey residential building with two basement levels. Could you share a rough timeline and the process for a detailed quotation?",
    status: "new" as const,
    createdAgo: [0, 3],
  },
  {
    fullName: "Nusrat Jahan",
    company: "Bright Garments",
    email: "nusrat.jahan@example.com",
    phone: "01819-337421",
    serviceRequired: "Industrial Construction",
    projectLocation: "Gazipur",
    estimatedBudget: "Over 5 crore BDT",
    description:
      "We plan a new 25,000 sq ft garment production floor next to our existing factory. Looking for a contractor who can deliver in phases so production is not interrupted.",
    status: "new" as const,
    createdAgo: [1, 6],
  },
  {
    fullName: "Tanvir Hossain",
    company: null,
    email: "tanvir.hossain@example.com",
    phone: "+880 1915-220184",
    serviceRequired: "Renovation",
    projectLocation: "Mirpur 10, Dhaka",
    estimatedBudget: "10 – 50 lakh BDT",
    description:
      "I would like to renovate the top two floors of my family building: new bathrooms, flooring, and a rooftop extension. Can someone visit the site for an assessment?",
    status: "read" as const,
    createdAgo: [3, 2],
  },
  {
    fullName: "Sabrina Rahman",
    company: "Rahman & Associates Architects",
    email: "sabrina@example.com",
    phone: "+880 1713-905511",
    serviceRequired: "Project Management",
    projectLocation: "Sylhet",
    estimatedBudget: "50 lakh – 1 crore BDT",
    description:
      "We are designing a 12-unit villa project in Sylhet and need a construction partner to manage procurement, programme, and quality on site. Happy to share drawings.",
    status: "replied" as const,
    createdAgo: [6, 0],
  },
  {
    fullName: "Md. Kamal Uddin",
    company: "Uddin Textile Mills",
    email: "kamal.uddin@example.com",
    phone: "01670-118842",
    serviceRequired: "Structural Engineering",
    projectLocation: "Narayanganj",
    estimatedBudget: "Not sure yet",
    description:
      "We want a structural assessment of a 20-year-old factory building before adding a floor. Do you provide assessment reports and strengthening design?",
    status: "replied" as const,
    createdAgo: [9, 5],
  },
  {
    fullName: "Ayesha Siddika",
    company: null,
    email: "ayesha.siddika@example.com",
    phone: "+880 1812-760033",
    serviceRequired: "Interior & Exterior",
    projectLocation: "Dhanmondi, Dhaka",
    estimatedBudget: "Under 10 lakh BDT",
    description:
      "Looking for a full interior fit-out of a 1,400 sq ft apartment: false ceiling, wardrobes, kitchen cabinets, and lighting. When can we meet to discuss?",
    status: "closed" as const,
    createdAgo: [14, 1],
  },
  {
    fullName: "Imran Chowdhury",
    company: "Chowdhury Logistics",
    email: "imran@example.com",
    phone: "+880 1722-641908",
    serviceRequired: "Road Construction",
    projectLocation: "Chattogram",
    estimatedBudget: "1 – 5 crore BDT",
    description:
      "We need about 2 km of internal heavy-duty road and a truck yard paved at our new depot. Please advise on pavement options and typical cost per kilometre.",
    status: "read" as const,
    createdAgo: [2, 9],
  },
]

async function main() {
  const { db } = await import("./index")
  const s = await import("./schema")
  const { and, eq, inArray, like, sql } = await import("drizzle-orm")

  // 1. Services: refresh text and add photos (the eight services already exist).
  for (const [i, svc] of services.entries()) {
    const photo = img(svc.image)
    const rows = await db
      .update(s.services)
      .set({
        shortDescription: svc.short,
        content: svc.content.join("\n\n"),
        image: photo.url,
        imageAlt: photo.alt,
        sortOrder: i,
        published: true,
      })
      .where(eq(s.services.slug, svc.slug))
      .returning({ id: s.services.id })
    if (!rows.length)
      console.warn(`Service not found (run pnpm db:seed): ${svc.slug}`)
  }

  // 2. Remove the old placeholder sample content.
  await db.delete(s.projects).where(like(s.projects.slug, "sample-%"))
  await db
    .delete(s.posts)
    .where(inArray(s.posts.slug, ["welcome-to-the-new-hrsm-website"]))

  // 3. Projects with covers and galleries.
  for (const p of projects) {
    const [cover, ...rest] = p.slots.map((slot) => img(`proj-${slot}`))
    const values = {
      slug: p.slug,
      name: p.name,
      location: p.location,
      type: p.type,
      status: p.status,
      startDate: p.startDate,
      completionDate: p.completionDate,
      description: p.description,
      content: p.content.join("\n\n"),
      featured: p.featured,
      published: true,
      coverImage: cover.url,
      coverImageAlt: cover.alt,
    }
    const [row] = await db
      .insert(s.projects)
      .values(values)
      .onConflictDoUpdate({ target: s.projects.slug, set: values })
      .returning({ id: s.projects.id })

    await db
      .delete(s.projectImages)
      .where(eq(s.projectImages.projectId, row.id))
    if (rest.length) {
      await db.insert(s.projectImages).values(
        rest.map((r, i) => ({
          projectId: row.id,
          url: r.url,
          alt: r.alt,
          sortOrder: i,
        }))
      )
    }
  }

  // 4. Blog posts.
  for (const post of posts) {
    const cover = img(post.slot.replace(/^/, "blog-"))
    const values = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: cover.url,
      coverImageAlt: cover.alt,
      published: true,
      publishedAt: ago(post.daysAgo),
    }
    await db
      .insert(s.posts)
      .values(values)
      .onConflictDoUpdate({ target: s.posts.slug, set: values })
  }

  // 5. Inquiries: replace any earlier demo rows (they use @example.com).
  await db.delete(s.inquiries).where(like(s.inquiries.email, "%@example.com"))
  await db.insert(s.inquiries).values(
    inquiries.map(({ createdAgo, ...q }) => ({
      ...q,
      createdAt: ago(createdAgo[0], createdAgo[1]),
    }))
  )

  const [{ n }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(s.inquiries)
    .where(and(eq(s.inquiries.status, "new")))
  console.log(
    `Demo content ready: ${services.length} services, ${projects.length} projects, ${posts.length} posts, ${inquiries.length} inquiries (${n} new).`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
