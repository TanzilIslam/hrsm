"use client"

import Link from "next/link"
import { useState } from "react"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLinks } from "@/components/site/nav-links"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{site.name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4">
          <NavLinks
            className="flex flex-col gap-1"
            linkClassName="rounded-md px-3 py-3 text-base hover:bg-muted"
            onNavigate={() => setOpen(false)}
          />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand-orange text-navy hover:bg-brand-orange/90"
            )}
          >
            Get a Quote
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
