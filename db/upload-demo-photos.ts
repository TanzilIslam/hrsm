// One-off helper that was used to publish the demo photos: uploads every file
// listed in a manifest to Vercel Blob, registers it in the media library, and
// writes db/demo-assets.json (url, alt text, photographer) for `pnpm db:seed-demo`.
//
//   tsx db/upload-demo-photos.ts <folder with raw/*.jpg> <manifest.json>
//
// Photos are from Unsplash (free to use under the Unsplash License). Re-running
// replaces the files in place (same keys), so it never duplicates uploads.
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { config } from "dotenv"

config({ path: ".env.local" })

// Descriptive alt text per photo slot (key-number).
const alts: Record<string, string> = {
  "hero-1":
    "Tower crane silhouetted against a dusk sky over a construction site",
  "about-1": "Engineers in safety vests surveying a large construction site",
  "proj-riverside-1":
    "Modern apartment block with dark facade panels and large windows",
  "proj-riverside-2":
    "Multi-storey residential building with colourful balconies",
  "proj-riverside-3": "Apartment tower facade lit by warm evening light",
  "proj-riverside-4":
    "Contemporary residential building with brick and black cladding",
  "proj-meridian-1": "Glass curtain wall of a modern office building",
  "proj-meridian-2":
    "Curved glass facade of a commercial tower against a blue sky",
  "proj-meridian-3": "Skyscraper corner seen from below",
  "proj-meridian-4": "Business plaza towers with a sweeping glass facade",
  "proj-karnaphuli-1": "Steel roof structure of an industrial hall",
  "proj-karnaphuli-2": "Black steel bracing on an industrial building",
  "proj-karnaphuli-3": "Steel pipe bridge and framework at an industrial plant",
  "proj-karnaphuli-4": "Large factory building with chimneys and a clear sky",
  "proj-bypass-1": "Road roller compacting fresh asphalt",
  "proj-bypass-2": "Wide multi-lane urban highway with a city skyline",
  "proj-bypass-3": "Newly laid road with a paving truck in the distance",
  "proj-lakeview-1": "Modern white villa with a swimming pool",
  "proj-lakeview-2": "Contemporary villa with a long terrace and pool",
  "proj-lakeview-3": "Modern two-storey house glowing at sunset",
  "proj-heritage-1":
    "Glass-partitioned office corridor with warm wood and lighting",
  "proj-heritage-2": "Open-plan office with desks and exposed brick walls",
  "proj-heritage-3": "Executive office with a white desk and wood paneling",
  "proj-greenfield-1": "Large white warehouse building under a cloudy sky",
  "proj-greenfield-2":
    "Empty warehouse hall with a polished floor and steel roof",
  "proj-greenfield-3": "Logistics building with loading area and fence",
  "proj-seaview-1": "Bright apartment living room with framed art",
  "proj-seaview-2": "Elegant living room with a large sofa and pendant lights",
  "proj-seaview-3": "Double-height apartment lounge with a glass wall",
  "svc-building-1": "Concrete frame of a building with scaffolding",
  "svc-civil-1": "Bridge section being lifted by a crane over a river",
  "svc-industrial-1": "Industrial plant with tall chimneys beside the water",
  "svc-road-1": "Crew and rollers working on a new asphalt road",
  "svc-interior-1": "Paint roller on a tray during interior finishing",
  "svc-structural-1": "Steel beams and joints lit in orange against the dark",
  "svc-management-1": "Architectural sketches and drawing tools on a desk",
  "svc-renovation-1":
    "Historic brick building under renovation with scaffolding",
  "blog-milestone-1": "Glass skyscrapers with a tower crane against a blue sky",
  "blog-safety-1": "Red safety helmet on a construction site",
  "blog-materials-1":
    "Workers fixing steel reinforcement bars for a concrete slab",
  "blog-update-1": "Aerial view of a busy construction site",
}

async function main() {
  const [folder, manifestPath] = process.argv.slice(2)
  if (!folder || !manifestPath) {
    throw new Error(
      "Usage: tsx db/upload-demo-photos.ts <folder> <manifest.json>"
    )
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
    key: string
    n: number
    file: string
    id: string
    photographer: string
    link: string
  }[]

  const { put } = await import("@vercel/blob")
  const { db } = await import("./index")
  const { media } = await import("./schema")

  const out: Record<
    string,
    { url: string; alt: string; photographer: string; source: string }
  > = {}

  for (const m of manifest) {
    const slot = `${m.key}-${m.n}`
    const alt = alts[slot]
    if (!alt) throw new Error(`No alt text for ${slot}`)
    const bytes = readFileSync(join(folder, m.file))
    const storageKey = `media/demo/${slot}.jpg`

    const blob = await put(storageKey, bytes, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    await db
      .insert(media)
      .values({
        url: blob.url,
        storageKey,
        fileName: `${slot}.jpg`,
        size: bytes.length,
        contentType: "image/jpeg",
        alt,
      })
      .onConflictDoUpdate({
        target: media.storageKey,
        set: { url: blob.url, size: bytes.length, alt },
      })
    out[slot] = {
      url: blob.url,
      alt,
      photographer: m.photographer,
      source: m.link,
    }
    console.log("uploaded", slot)
  }

  writeFileSync(
    join(process.cwd(), "db", "demo-assets.json"),
    JSON.stringify(out, null, 2) + "\n"
  )
  console.log(`Done: ${Object.keys(out).length} photos`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
