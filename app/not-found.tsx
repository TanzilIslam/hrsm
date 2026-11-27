import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/site/sections"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-24 text-center">
          <p className="text-sm font-semibold tracking-wider text-brand-orange uppercase">
            404
          </p>
          <h1 className="mt-2 text-4xl font-bold text-navy">Page not found</h1>
          <p className="mt-3 text-muted-foreground">
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className={buttonVariants({ size: "lg" }) + " mt-6"}>
            Back to home
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </div>
  )
}
