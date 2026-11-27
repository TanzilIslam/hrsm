import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "Contact Us" }

export default function Page() {
  return (
    <PagePlaceholder
      title="Contact Us"
      description="Tell us about your project."
    />
  )
}
