import { EmptyState, PageHero, Section } from "@/components/site/sections"

// Temporary body for pages built in later modules.
export function PagePlaceholder({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <>
      <PageHero title={title} description={description} />
      <Section>
        <EmptyState
          title="Content coming soon"
          description="This page is part of the build plan and will be filled in by a later module."
        />
      </Section>
    </>
  )
}
