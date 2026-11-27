import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "Our Team" }

export default function Page() {
  return (
    <PagePlaceholder title="Our Team" description="The people behind HRSM." />
  )
}
