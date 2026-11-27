import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { HeroVideo } from "@/components/site/hero-video"
import { ProjectCard } from "@/components/site/project-card"
import {
  Container,
  CtaBand,
  Section,
  SectionHeading,
} from "@/components/site/sections"
import { StatCounter } from "@/components/site/stat-counter"
import { TestimonialCard } from "@/components/site/testimonial-card"
import { buttonVariants } from "@/components/ui/button"
import { aboutIntro } from "@/content/about"
import { testimonials } from "@/content/clients"
import { stats, whyChoose } from "@/content/home"
import { getFeaturedProjects } from "@/lib/queries/projects"
import { getPublishedServices } from "@/lib/queries/services"
import { serviceIcons, toIconKey } from "@/lib/service-icons"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { alternates: { canonical: "/" } }

export default async function HomePage() {
  const [services, projects] = await Promise.all([
    getPublishedServices(),
    getFeaturedProjects(6),
  ])

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {site.hero.poster && (
          <Image
            src={site.hero.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {site.hero.video && <HeroVideo src={site.hero.video} />}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/70 to-navy/30"
        />
        <Container className="relative flex min-h-[32rem] flex-col justify-center py-24 md:min-h-[38rem]">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 bg-brand-orange px-6 text-navy hover:bg-brand-orange/90"
              )}
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/50 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              )}
            >
              Get a Quote
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. About */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-wider text-brand-orange-text uppercase">
              About {site.name}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">
              {aboutIntro.title}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {aboutIntro.paragraphs[0]}
            </p>
            <Link
              href="/about"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Learn more about {site.name}
              <ArrowRightIcon />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {whyChoose.slice(0, 4).map((w) => (
              <li
                key={w.title}
                className="rounded-xl bg-secondary p-5 transition-colors hover:bg-brand-orange/10"
              >
                <w.icon className="size-6 text-brand-orange" aria-hidden />
                <p className="mt-3 font-semibold text-navy">{w.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. Services */}
      {services.length > 0 && (
        <Section tone="muted">
          <SectionHeading
            eyebrow="What we do"
            title="Our services"
            description="Construction and engineering services for every kind of project."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => {
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
                      <h3 className="text-lg font-semibold text-navy">
                        {s.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.shortDescription}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/services" className={buttonVariants({ size: "lg" })}>
              View All Services
              <ArrowRightIcon />
            </Link>
          </div>
        </Section>
      )}

      {/* 4. Featured projects */}
      {projects.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Our work"
            title="Featured projects"
            description="Completed, ongoing, and upcoming projects we are proud of."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              View All Projects
              <ArrowRightIcon />
            </Link>
          </div>
        </Section>
      )}

      {/* 5. Why choose HRSM */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why choose us"
          title={`Why choose ${site.name}`}
          align="center"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyChoose.map((w) => (
            <li key={w.title} className="space-y-3 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-navy text-white">
                <w.icon className="size-6" aria-hidden />
              </span>
              <h3 className="font-semibold text-navy">{w.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {w.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Statistics */}
      <section className="bg-navy py-14 text-white">
        <Container>
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="text-4xl font-extrabold text-brand-orange md:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-white/75">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 7. Testimonials */}
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

      {/* 8. Call to action */}
      <CtaBand />
    </>
  )
}
