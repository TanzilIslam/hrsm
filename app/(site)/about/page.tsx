import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2Icon } from "lucide-react"

import {
  CtaBand,
  ImagePlaceholder,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/sections"
import { buttonVariants } from "@/components/ui/button"
import {
  aboutIntro,
  certifications,
  coreValues,
  history,
  missionVision,
  strengths,
} from "@/content/about"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description: `Learn about ${site.fullName}: our story, mission, values, strengths, and certifications.`,
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Who we are, what we stand for, and how we work."
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-wider text-brand-orange-text uppercase">
              {aboutIntro.eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">
              {aboutIntro.title}
            </h2>
            {aboutIntro.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <Link
              href="/team"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Meet our team
            </Link>
          </div>
          <ImagePlaceholder
            label="Company photo"
            className="aspect-4/3 rounded-xl"
          />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          {missionVision.map((m) => (
            <div
              key={m.title}
              className="space-y-3 rounded-xl bg-white p-8 shadow-xs ring-1 ring-foreground/10"
            >
              <span className="grid size-12 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange">
                <m.icon className="size-6" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold text-navy">{m.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What guides us"
          title="Our core values"
          align="center"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v) => (
            <li key={v.title} className="space-y-3 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-navy text-white">
                <v.icon className="size-6" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Our journey" title="Company history" />
        <ol className="relative ml-3 space-y-8 border-l-2 border-brand-orange/40 pl-8">
          {history.map((h, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[2.55rem] size-4 rounded-full border-4 border-secondary bg-brand-orange"
              />
              <p className="text-sm font-semibold text-brand-orange-text">
                {h.year}
              </p>
              <h3 className="text-lg font-semibold text-navy">{h.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {h.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why HRSM" title="Our strengths" />
            <ul className="space-y-3">
              {strengths.map((s) => (
                <li key={s} className="flex gap-3">
                  <CheckCircle2Icon
                    className="mt-0.5 size-5 shrink-0 text-brand-orange"
                    aria-hidden
                  />
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Recognition"
              title="Certifications and achievements"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-white p-5 shadow-xs ring-1 ring-foreground/10"
                >
                  <h3 className="font-semibold text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
