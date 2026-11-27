// DEMO clients, partners, and testimonials (invented, for design review).
// Add a `logo` (media-library image URL) to show a logo instead of the name.

export type Organization = { name: string; logo?: string }

export const clients: Organization[] = [
  { name: "Padma Developers Ltd" },
  { name: "Eastern Textile Group" },
  { name: "Bengal Foods" },
  { name: "Sundarban Hospitality" },
  { name: "Metro Retail Holdings" },
  { name: "Shapla Healthcare" },
]

export const partners: Organization[] = [
  { name: "Titan Steel Supply" },
  { name: "Delta Cement Works" },
  { name: "Apex Engineering Consultants" },
  { name: "Union Power Systems" },
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
      "HRSM handed over our apartment tower on the date they promised and kept us informed every week. The finishing quality matched the drawings.",
    name: "Kazi Mostafa",
    role: "Managing Director",
    company: "Padma Developers Ltd",
  },
  {
    quote:
      "They built our new production hall in phases without stopping the existing factory. Safety on site was excellent from the first day.",
    name: "Rehana Akter",
    role: "Head of Operations",
    company: "Eastern Textile Group",
  },
  {
    quote:
      "Clear quotation, honest advice, and a project manager who answered every call. We have already signed them for our second project.",
    name: "Arif Chowdhury",
    role: "Owner",
    company: "Metro Retail Holdings",
  },
]
