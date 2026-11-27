import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "Clients & Partners" }

export default function Page() {
  return (
    <PagePlaceholder
      title="Clients & Partners"
      description="Organizations that trust HRSM."
    />
  )
}
