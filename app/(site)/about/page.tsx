import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "About Us" }

export default function Page() {
  return (
    <PagePlaceholder
      title="About Us"
      description="Who we are, what we stand for, and how we work."
    />
  )
}
