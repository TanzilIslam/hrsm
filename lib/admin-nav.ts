import {
  BuildingIcon,
  FileTextIcon,
  HardHatIcon,
  ImageIcon,
  InboxIcon,
  LayoutDashboardIcon,
  type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  // Set to true when the module's pages exist; until then it shows as "Soon".
  ready: boolean
}

export const adminNav: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboardIcon, ready: true },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: BuildingIcon,
    ready: true,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: HardHatIcon,
    ready: true,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: InboxIcon,
    ready: true,
  },
  { label: "Blog", href: "/admin/blog", icon: FileTextIcon, ready: true },
  { label: "Media", href: "/admin/media", icon: ImageIcon, ready: true },
]
