import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "News & Blog" }

export default function Page() {
  return (
    <PagePlaceholder
      title="News & Blog"
      description="Company news, project updates, and industry insights."
    />
  )
}
