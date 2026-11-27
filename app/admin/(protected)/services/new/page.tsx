import type { Metadata } from "next"

import { ServiceForm } from "@/components/admin/services/service-form"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Add service" }

export default async function NewServicePage() {
  await requireRole("editor")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Add service</h1>
      <ServiceForm
        initial={{
          title: "",
          slug: "",
          shortDescription: "",
          content: "",
          icon: "building-2",
          image: null,
          imageAlt: "",
          published: true,
        }}
      />
    </div>
  )
}
