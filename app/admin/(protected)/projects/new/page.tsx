import type { Metadata } from "next"

import { ProjectForm } from "@/components/admin/projects/project-form"
import { requireRole } from "@/lib/session"

export const metadata: Metadata = { title: "Add project" }

export default async function NewProjectPage() {
  await requireRole("project_manager", "editor")

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">Add project</h1>
      <ProjectForm
        initial={{
          name: "",
          slug: "",
          location: "",
          type: "",
          status: "ongoing",
          startDate: "",
          completionDate: "",
          description: "",
          content: "",
          cover: null,
          gallery: [],
          featured: false,
          published: false,
        }}
      />
    </div>
  )
}
