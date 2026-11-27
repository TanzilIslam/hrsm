import {
  BadgeCheckIcon,
  ClockIcon,
  CpuIcon,
  ShieldCheckIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

// PLACEHOLDER numbers: replace with HRSM's real figures before launch.
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 120, suffix: "+", label: "Completed projects" },
  { value: 12, suffix: "", label: "Ongoing projects" },
  { value: 90, suffix: "+", label: "Happy clients" },
]

export const whyChoose: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Quality construction",
    text: "Proven materials and methods, inspected at every stage.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Experienced team",
    text: "In-house engineers, architects, and project managers.",
    icon: UsersIcon,
  },
  {
    title: "Modern technology",
    text: "Current tools and techniques that improve every project.",
    icon: CpuIcon,
  },
  {
    title: "On-time delivery",
    text: "Realistic schedules and regular progress updates.",
    icon: ClockIcon,
  },
  {
    title: "Safety and reliability",
    text: "Strict site safety and a partner you can count on.",
    icon: ShieldCheckIcon,
  },
]
