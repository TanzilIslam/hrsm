import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { MobileNav } from "@/components/site/mobile-nav"
import { NavLinks } from "@/components/site/nav-links"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />
        <NavLinks className="hidden items-center gap-7 lg:flex" />
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden bg-brand-orange text-navy hover:bg-brand-orange/90 sm:inline-flex"
            )}
          >
            Get a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
