import type { Metadata } from "next"
import Image from "next/image"

import { TestimonialCard } from "@/components/site/testimonial-card"
import {
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/sections"
import {
  clients,
  partners,
  testimonials,
  type Organization,
} from "@/content/clients"

export const metadata: Metadata = {
  alternates: { canonical: "/clients" },
  title: "Clients & Partners",
  description: "Organizations that trust HRSM, and the partners we work with.",
}

function OrgGrid({ items, label }: { items: Organization[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
    >
      {items.map((o, i) => (
        <li
          key={`${o.name}-${i}`}
          className="grid h-24 place-items-center rounded-xl bg-white p-4 text-center text-sm font-medium text-muted-foreground shadow-xs ring-1 ring-foreground/10"
        >
          {o.logo ? (
            <Image
              src={o.logo}
              alt={o.name}
              width={160}
              height={64}
              className="max-h-14 w-auto object-contain"
            />
          ) : (
            o.name
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ClientsPage() {
  return (
    <>
      <PageHero
        title="Clients & Partners"
        description="Organizations that trust HRSM with their projects."
      />
      <Section>
        <SectionHeading eyebrow="Trusted by" title="Our clients" />
        <OrgGrid items={clients} label="Clients" />
      </Section>
      <Section tone="muted">
        <SectionHeading eyebrow="Working together" title="Business partners" />
        <OrgGrid items={partners} label="Partners" />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          align="center"
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i}>
              <TestimonialCard t={t} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  )
}
