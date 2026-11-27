import Image from "next/image"
import Link from "next/link"
import { MapPinIcon } from "lucide-react"

import { ImagePlaceholder, StatusBadge } from "@/components/site/sections"
import type { ProjectCard as ProjectCardData } from "@/lib/queries/projects"

export function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: ProjectCardData
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3"
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-foreground/10 transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.coverImageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            label={project.name}
            className="absolute inset-0 px-4 text-center"
          />
        )}
        <span className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold tracking-wider text-brand-orange-text uppercase">
          {project.type}
        </p>
        <Heading className="text-lg font-semibold text-navy">
          {project.name}
        </Heading>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPinIcon className="size-4 shrink-0" aria-hidden />
          {project.location}
        </p>
      </div>
    </Link>
  )
}
