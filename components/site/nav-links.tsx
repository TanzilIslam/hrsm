"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: {
  className?: string
  linkClassName?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={className}>
      {mainNav.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors hover:text-brand-orange",
              active ? "text-brand-orange" : "text-navy",
              linkClassName
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
