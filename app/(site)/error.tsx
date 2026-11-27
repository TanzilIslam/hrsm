"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/site/sections"

export default function Error({ retry }: { error: Error; retry: () => void }) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button className="mt-6" size="lg" onClick={() => retry()}>
        Try again
      </Button>
    </Container>
  )
}
