// Single source for company details. Values marked "placeholder" are swapped
// for real data when HRSM supplies it.
export const site = {
  name: "HRSM",
  fullName: "HRSM Construction",
  tagline: "Building The Future With Excellence",
  description:
    "HRSM is a construction and engineering company in Bangladesh delivering residential, commercial, industrial, and infrastructure projects.",
  contact: {
    // placeholder
    address: "House 00, Road 00, Dhaka, Bangladesh",
    phone: "+880 1700-000000",
    email: "info@hrsm.example",
    hours: "Sat – Thu, 9:00 AM – 6:00 PM",
    // WhatsApp number in international format, digits only (placeholder)
    whatsapp: "8801700000000",
    // Text for the Google Maps embed on the contact page (placeholder)
    mapQuery: "Dhaka, Bangladesh",
  },
  // Homepage hero. The poster is a photo (DEMO: Unsplash). Add a short, compressed
  // MP4 as `video` (for example in public/videos) and it fades in over the
  // photo; leave it empty for a photo-only hero.
  hero: {
    video: "",
    poster:
      "https://e2ghm7xyzayxjb1o.public.blob.vercel-storage.com/media/demo/hero-1.jpg",
  },
  social: {
    // placeholder: replace with real URLs
    facebook: "https://facebook.com",
    linkedin: "",
  },
} as const

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Our Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
] as const

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Clients & Partners", href: "/clients" },
    { label: "News & Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const
