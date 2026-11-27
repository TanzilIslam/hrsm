import type { Metadata } from "next"

import { site } from "@/lib/site"

// Page-level openGraph replaces the root one entirely, so detail pages build a
// complete object here. Falls back to the generated brand card (app/opengraph-image).
export function openGraphFor({
  title,
  description,
  image,
  type = "website",
  publishedTime,
}: {
  title: string
  description: string
  image?: string | null
  type?: "website" | "article"
  publishedTime?: string
}): NonNullable<Metadata["openGraph"]> {
  const base = {
    siteName: site.fullName,
    locale: "en_BD",
    title,
    description,
    images: [image || "/opengraph-image"],
  }
  return type === "article"
    ? { ...base, type: "article", publishedTime }
    : { ...base, type: "website" }
}
