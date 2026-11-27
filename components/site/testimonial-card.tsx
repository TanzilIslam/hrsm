import { QuoteIcon } from "lucide-react"

import type { Testimonial } from "@/content/clients"

// Shared by the clients page and the homepage.
export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-xl bg-white p-6 shadow-xs ring-1 ring-foreground/10">
      <QuoteIcon className="size-7 text-brand-orange" aria-hidden />
      <blockquote className="flex-1 leading-relaxed text-ink">
        {t.quote}
      </blockquote>
      <figcaption>
        <p className="font-semibold text-navy">{t.name}</p>
        <p className="text-sm text-muted-foreground">
          {t.role}, {t.company}
        </p>
      </figcaption>
    </figure>
  )
}
