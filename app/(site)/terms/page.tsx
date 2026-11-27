import type { Metadata } from "next"

import { LegalPage } from "@/components/site/legal-page"
import { termsOfUse } from "@/content/legal"

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms",
  description: "The terms for using the HRSM website.",
}

export default function TermsPage() {
  return <LegalPage doc={termsOfUse} />
}
