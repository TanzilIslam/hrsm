import Link from "next/link"

import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

// Text logo until HRSM provides the real one.
export function Logo({
  className,
  light = false,
}: {
  className?: string
  light?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-md bg-brand-orange text-lg font-extrabold text-navy"
      >
        H
      </span>
      <span
        className={cn(
          "text-xl font-extrabold tracking-wide",
          light ? "text-white" : "text-navy"
        )}
      >
        {site.name}
      </span>
    </Link>
  )
}
