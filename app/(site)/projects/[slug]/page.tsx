import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  CalendarIcon,
  CalendarCheckIcon,
  LayersIcon,
  MapPinIcon,
} from "lucide-react"

import { ProjectCard } from "@/components/site/project-card"
import { ProjectGallery } from "@/components/site/project-gallery"
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  StatusBadge,
} from "@/components/site/sections"
import { buttonVariants } from "@/components/ui/button"
import {
  getPublishedProjectBySlug,
  getRelatedProjects,
} from "@/lib/queries/projects"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

// Dates are stored as YYYY-MM-DD; format in UTC so the day never shifts.
function formatDate(d: string | null) {
  if (!d) return null
  return new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getPublishedProjectBySlug((await params).slug)
  if (!project) return { title: "Project not found" }
  return {
    title: project.name,
    description: project.description,
    openGraph: project.coverImage
      ? { images: [project.coverImage] }
      : undefined,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getPublishedProjectBySlug((await params).slug)
  if (!project) notFound()

  const related = await getRelatedProjects(project.type, project.id)
  const paragraphs = project.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  const started = formatDate(project.startDate)
  const finished = formatDate(project.completionDate)

  const facts = [
    { icon: MapPinIcon, label: "Location", value: project.location },
    { icon: LayersIcon, label: "Type", value: project.type },
    started && { icon: CalendarIcon, label: "Started", value: started },
    finished && {
      icon: CalendarCheckIcon,
      label: "Completed",
      value: finished,
    },
  ].filter(Boolean) as {
    icon: typeof MapPinIcon
    label: string
    value: string
  }[]

  return (
    <>
      <PageHero title={project.name} description={project.description} />
      <Section>
        <div className="mx-auto max-w-4xl space-y-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-brand-orange"
          >
            <ArrowLeftIcon className="size-4" aria-hidden />
            All projects
          </Link>

          {project.coverImage && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
              <Image
                src={project.coverImage}
                alt={project.coverImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 56rem, 95vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="grid gap-4 rounded-xl bg-secondary p-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Status
              </p>
              <StatusBadge status={project.status} />
            </div>
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="space-y-1">
                <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </p>
                <p className="text-sm font-medium text-navy">{value}</p>
              </div>
            ))}
          </div>

          {paragraphs.length > 0 && (
            <div className="space-y-4 text-base leading-relaxed text-ink">
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          )}

          {project.images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-navy">Gallery</h2>
              <ProjectGallery images={project.images} />
            </div>
          )}

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-brand-orange px-6 text-navy hover:bg-brand-orange/90"
            )}
          >
            Start a similar project
          </Link>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="More work" title="Related projects" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand />
    </>
  )
}
