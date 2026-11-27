import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { CtaBand, PageHero, Section } from "@/components/site/sections"
import { getPublishedServiceBySlug } from "@/lib/queries/services"
import { serviceIcons, toIconKey } from "@/lib/service-icons"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getPublishedServiceBySlug((await params).slug)
  if (!service) return { title: "Service not found" }
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: service.image ? { images: [service.image] } : undefined,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getPublishedServiceBySlug((await params).slug)
  if (!service) notFound()

  const Icon = serviceIcons[toIconKey(service.icon)].icon
  const paragraphs = service.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <PageHero title={service.title} description={service.shortDescription} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-brand-orange"
          >
            <ArrowLeftIcon className="size-4" aria-hidden />
            All services
          </Link>

          {service.image && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 48rem, 95vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange">
              <Icon className="size-6" aria-hidden />
            </span>
            <div className="space-y-4 text-base leading-relaxed text-ink">
              {paragraphs.length ? (
                paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))
              ) : (
                <p>{service.shortDescription}</p>
              )}
            </div>
          </div>

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-brand-orange px-6 text-navy hover:bg-brand-orange/90"
            )}
          >
            Get a quote for this service
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  )
}
