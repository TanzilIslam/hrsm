import { PageHero, Section } from "@/components/site/sections"
import type { LegalDoc } from "@/content/legal"

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero title={doc.title} description={`Last updated ${doc.updated}`} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {doc.intro}
          </p>
          {doc.sections.map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="text-xl font-bold text-navy">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="leading-relaxed text-ink">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  )
}
