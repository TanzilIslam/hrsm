import { JsonLd } from "@/components/site/json-ld"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { WhatsAppButton } from "@/components/site/whatsapp-button"
import { site } from "@/lib/site"
import { absoluteUrl } from "@/lib/site-url"

// Placeholder contact details come from lib/site.ts; confirm them before launch.
const organization = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.fullName,
  url: absoluteUrl("/"),
  description: site.description,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address,
    addressCountry: "BD",
  },
  areaServed: "BD",
  sameAs: [site.social.facebook, site.social.linkedin].filter(Boolean),
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <JsonLd data={organization} />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
