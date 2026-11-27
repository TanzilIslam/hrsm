import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/site/sections"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <section className="bg-navy text-white">
      <Container className="py-24 md:py-32">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/80">
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
              "h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Get a Quote
          </Link>
        </div>
      </Container>
    </section>
  )
}
