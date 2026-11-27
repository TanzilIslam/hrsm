import {
  BadgeCheckIcon,
  HandshakeIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  TargetIcon,
  EyeIcon,
  type LucideIcon,
} from "lucide-react"

// PLACEHOLDER content. Replace with HRSM's real text; the pages render
// whatever is here, so no component changes are needed.

export const aboutIntro = {
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
    year: "Year",
    title: "Company founded",
    text: "HRSM began as a small team delivering residential projects.",
  },
  {
    year: "Year",
    title: "Expanded into commercial work",
    text: "We took on larger commercial buildings and grew our engineering team.",
  },
  {
    year: "Year",
    title: "Industrial and infrastructure projects",
    text: "We added factories, roads, and structural engineering to our services.",
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
  { title: "Certification name", text: "Issuing body and year" },
  { title: "Registration or license", text: "Authority and number" },
  { title: "Award or recognition", text: "Organization and year" },
]
