import type { Metadata } from "next"

import { PagePlaceholder } from "@/components/site/page-placeholder"

export const metadata: Metadata = { title: "Services" }

export default function Page() {
  return (
    <PagePlaceholder
      title="Services"
      description="Construction and engineering services for every kind of project."
    />
  )
}
