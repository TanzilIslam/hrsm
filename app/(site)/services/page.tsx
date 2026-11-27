import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import {
  CtaBand,
  EmptyState,
  PageHero,
  Section,
} from "@/components/site/sections"
import { getPublishedServices } from "@/lib/queries/services"
import { serviceIcons, toIconKey } from "@/lib/service-icons"

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Construction and engineering services by HRSM: building, civil, industrial, road, interior and exterior, structural, project management, and renovation.",
}

export default async function ServicesPage() {
  const items = await getPublishedServices()

  return (
    <>
      <PageHero
        title="Services"
        description="Construction and engineering services for every kind of project."
      />
      <Section>
        {items.length === 0 ? (
          <EmptyState
            title="Services coming soon"
            description="We are updating this page. Please check back shortly."
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => {
              const Icon = serviceIcons[toIconKey(s.icon)].icon
              return (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-foreground/10 transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    {s.image && (
                      <div className="relative aspect-video overflow-hidden bg-secondary">
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="grid size-11 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h2 className="text-lg font-semibold text-navy">
                        {s.title}
                      </h2>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:text-brand-orange">
                        Learn more
                        <ArrowRightIcon className="size-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </Section>
      <CtaBand />
    </>
  )
}
