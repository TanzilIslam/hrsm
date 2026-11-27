// PLACEHOLDER clients, partners, and testimonials. Add a `logo` (media-library
// image URL) to show a logo instead of the name.

export type Organization = { name: string; logo?: string }

export const clients: Organization[] = [
  { name: "Client name" },
  { name: "Client name" },
  { name: "Client name" },
  { name: "Client name" },
  { name: "Client name" },
  { name: "Client name" },
]

export const partners: Organization[] = [
  { name: "Partner name" },
  { name: "Partner name" },
  { name: "Partner name" },
  { name: "Partner name" },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "HRSM delivered our building on schedule and kept us informed at every stage. Placeholder testimonial.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
  {
    quote:
      "Professional team, clear communication, and quality work. Placeholder testimonial.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
  {
    quote:
      "We would happily work with HRSM again on our next project. Placeholder testimonial.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
]
