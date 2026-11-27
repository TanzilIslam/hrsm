import {
  BadgeCheckIcon,
  HandshakeIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  TargetIcon,
  EyeIcon,
  type LucideIcon,
} from "lucide-react"

// DEMO content (invented, for design review). Replace with HRSM's real text;
// the pages render whatever is here, so no component changes are needed.

export const aboutIntro = {
  image: {
    url: "https://e2ghm7xyzayxjb1o.public.blob.vercel-storage.com/media/demo/about-1.jpg",
    alt: "Engineers in safety vests surveying a large construction site",
  },
  eyebrow: "Who we are",
  title: "A construction company built on trust and craftsmanship",
  paragraphs: [
    "HRSM is a construction and engineering company based in Bangladesh. We deliver residential, commercial, industrial, and infrastructure projects with a focus on quality, safety, and on-time completion.",
    "From the first site visit to final handover, our engineers, architects, and project managers work as one team so that clients always know where their project stands.",
  ],
}

export const missionVision: {
  title: string
  text: string
  icon: LucideIcon
}[] = [
  {
    title: "Our mission",
    text: "To build safe, durable, and well-designed structures that serve communities for generations, delivered with honesty and respect for our clients' time and budget.",
    icon: TargetIcon,
  },
  {
    title: "Our vision",
    text: "To be the most trusted construction partner in Bangladesh, known for engineering excellence and for always keeping our word.",
    icon: EyeIcon,
  },
]

export const coreValues: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Quality first",
    text: "We choose proven materials and methods, and inspect our work at every stage.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Safety always",
    text: "Every worker goes home safe. Site safety is planned, not improvised.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Integrity",
    text: "Clear quotes, honest timelines, and open communication from start to finish.",
    icon: HandshakeIcon,
  },
  {
    title: "Innovation",
    text: "We adopt modern techniques and technology where they make projects better.",
    icon: LightbulbIcon,
  },
]

export const history: { year: string; title: string; text: string }[] = [
  {
    year: "2009",
    title: "Company founded in Dhaka",
    text: "HRSM began with a small team of engineers delivering private homes and small apartment buildings.",
  },
  {
    year: "2014",
    title: "Expanded into commercial buildings",
    text: "We took on offices and shopping complexes and grew our in-house engineering and project management teams.",
  },
  {
    year: "2019",
    title: "Industrial and infrastructure projects",
    text: "Factories, warehouses, and roads joined our portfolio, along with a dedicated structural engineering unit.",
  },
  {
    year: "2024",
    title: "Landmark towers and logistics hubs",
    text: "We started a 20-storey commercial tower in Gulshan and a 22,000 square metre logistics hub in Narayanganj.",
  },
]

export const strengths = [
  "Experienced in-house engineers and architects",
  "Transparent quotes and regular progress updates",
  "Strict safety and quality procedures on every site",
  "Reliable supply chain for materials and equipment",
  "A track record of on-time handover",
]

export const certifications: { title: string; text: string }[] = [
  {
    title: "Quality management certification",
    text: "Sample entry: certifying body and year",
  },
  {
    title: "Occupational health and safety certification",
    text: "Sample entry: certifying body and year",
  },
  {
    title: "Registered contractor, Class A",
    text: "Sample entry: registering authority and number",
  },
  {
    title: "Best Residential Project nominee",
    text: "Sample entry: awarding organization and year",
  },
]
