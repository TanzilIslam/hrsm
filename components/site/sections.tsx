import Link from "next/link"
import { ArrowRightIcon, InboxIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}
      {...props}
    />
  )
}

export function Section({
  className,
  tone = "default",
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: "default" | "muted" }) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        tone === "muted" && "bg-secondary",
        className
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wider text-brand-orange-text uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

export function PageHero({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="bg-navy text-white">
      <Container className="py-14 md:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        <span
          aria-hidden
          className="mt-4 block h-1 w-16 rounded-full bg-brand-orange"
        />
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-white/80">{description}</p>
        )}
      </Container>
    </div>
  )
}

export function CtaBand({
  title = "Let's Build Something Great Together",
  description = "Tell us about your project and our team will get back to you.",
  href = "/contact",
  label = "Contact Us",
}: {
  title?: string
  description?: string
  href?: string
  label?: string
}) {
  return (
    <section className="bg-brand-orange">
      <Container className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">{title}</h2>
          <p className="mt-2 text-navy">{description}</p>
        </div>
        <Link
          href={href}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 bg-navy px-6 text-white hover:bg-navy/90"
          )}
        >
          {label}
          <ArrowRightIcon />
        </Link>
      </Container>
    </section>
  )
}

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-800",
  ongoing: "bg-amber-100 text-amber-800",
  upcoming: "bg-sky-100 text-sky-800",
} as const

export type ProjectStatus = keyof typeof statusStyles

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge className={cn("capitalize", statusStyles[status])}>{status}</Badge>
  )
}

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-14 text-center",
        className
      )}
    >
      <InboxIcon className="size-8 text-muted-foreground" aria-hidden />
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Neutral block shown when an image is missing or not yet supplied.
export function ImagePlaceholder({
  label,
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={cn(
        "grid place-items-center bg-linear-to-br from-navy/90 to-navy/60 text-sm font-medium text-white/70",
        className
      )}
    >
      {label}
    </div>
  )
}
