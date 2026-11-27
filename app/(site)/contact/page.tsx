import type { Metadata } from "next"
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react"

import { ContactForm } from "@/components/site/contact-form"
import { PageHero, Section } from "@/components/site/sections"
import { getPublishedServices } from "@/lib/queries/services"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell HRSM about your project. Send an inquiry, call, or message us on WhatsApp.",
}

const detailClass = "flex gap-4"
const iconClass =
  "grid size-11 shrink-0 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange"

export default async function ContactPage() {
  const services = await getPublishedServices()
  const c = site.contact
  const whatsapp = c.whatsapp.replace(/\D/g, "")

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Tell us about your project and our team will get back to you."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-navy">Get in touch</h2>
              <p className="text-muted-foreground">
                Visit our office, call, or send an inquiry. We usually reply
                within one working day.
              </p>
            </div>

            <ul className="space-y-6">
              <li className={detailClass}>
                <span className={iconClass}>
                  <MapPinIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-navy">Office</p>
                  <p className="text-sm text-muted-foreground">{c.address}</p>
                </div>
              </li>
              <li className={detailClass}>
                <span className={iconClass}>
                  <PhoneIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <a
                    href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}
                    className="text-sm text-muted-foreground hover:text-navy"
                  >
                    {c.phone}
                  </a>
                </div>
              </li>
              <li className={detailClass}>
                <span className={iconClass}>
                  <MailIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-navy">Email</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-muted-foreground hover:text-navy"
                  >
                    {c.email}
                  </a>
                </div>
              </li>
              <li className={detailClass}>
                <span className={iconClass}>
                  <ClockIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-navy">Office hours</p>
                  <p className="text-sm text-muted-foreground">{c.hours}</p>
                </div>
              </li>
              {whatsapp && (
                <li className={detailClass}>
                  <span className={iconClass}>
                    <MessageCircleIcon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-navy">WhatsApp</p>
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-navy"
                    >
                      Chat with us
                    </a>
                  </div>
                </li>
              )}
            </ul>

            {site.social.facebook && (
              <p className="text-sm text-muted-foreground">
                Follow us on{" "}
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy underline underline-offset-4 hover:text-brand-orange"
                >
                  Facebook
                </a>
                {site.social.linkedin && (
                  <>
                    {" "}
                    and{" "}
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy underline underline-offset-4 hover:text-brand-orange"
                    >
                      LinkedIn
                    </a>
                  </>
                )}
                .
              </p>
            )}
          </div>

          <ContactForm services={services.map((s) => s.title)} />
        </div>

        <div className="mt-12 overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <iframe
            title={`Map showing ${c.mapQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>
    </>
  )
}
