import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "Projects" }

export default function Page() {
  return (
    <PagePlaceholder
      title="Projects"
      description="A look at our completed, ongoing, and upcoming work."
    />
  )
}
