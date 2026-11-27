import type { Metadata } from "next"

import { LegalPage } from "@/components/site/legal-page"
import { privacyPolicy } from "@/content/legal"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HRSM collects, uses, and protects your information.",
}

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />
}
