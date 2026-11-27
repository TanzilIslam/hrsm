import Link from "next/link"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { footerLinks, footerServices, site } from "@/lib/site"

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold tracking-wider text-brand-orange uppercase">
        {title}
      </h2>
      {children}
    </div>
  )
}

const linkClass = "text-sm text-white/75 transition-colors hover:text-white"

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-white/75">
            {site.description}
          </p>
          <div className="flex gap-4 text-sm">
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Facebook
              </a>
            )}
            {site.social.linkedin && (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <FooterColumn title="Quick links">
          <ul className="space-y-2.5">
            {footerLinks.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Services">
          <ul className="space-y-2.5">
            {footerServices.map((s) => (
              <li key={s}>
                <Link href="/services" className={linkClass}>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contact">
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand-orange" />
              {site.contact.address}
            </li>
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-brand-orange" />
              <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-brand-orange" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {footerLinks.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
