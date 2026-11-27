import { MessageCircleIcon } from "lucide-react"

import { site } from "@/lib/site"

// Floating chat button shown on every public page.
export function WhatsAppButton() {
  const number = site.contact.whatsapp.replace(/\D/g, "")
  if (!number) return null

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      <MessageCircleIcon className="size-7" aria-hidden />
    </a>
  )
}
