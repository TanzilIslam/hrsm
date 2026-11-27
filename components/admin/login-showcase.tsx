import {
  BuildingIcon,
  FileTextIcon,
  InboxIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react"

import { AdminBackdrop } from "@/components/admin/admin-backdrop"
import { Logo } from "@/components/site/logo"
import { site } from "@/lib/site"

const stats = [
  { label: "Active projects", value: "12", icon: BuildingIcon },
  { label: "New inquiries", value: "28", icon: InboxIcon },
  { label: "Published posts", value: "9", icon: FileTextIcon },
] as const

// Illustrative values only; the real dashboard arrives in the admin shell module.
const bars = [38, 52, 44, 66, 58, 80, 72]
const line = "0,92 45,78 90,84 135,58 180,64 225,36 270,42 320,14"

export function LoginShowcase() {
  return (
    <aside className="relative isolate hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <AdminBackdrop />

      <div className="relative">
        <Logo light />
      </div>

      <div className="relative max-w-xl space-y-8">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wider text-brand-orange uppercase">
            <ShieldCheckIcon className="size-3.5" />
            Secure admin area
          </p>
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight xl:text-5xl">
            Manage every project,
            <br />
            <span className="text-brand-orange">from one place.</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/70">
            Publish projects and services, follow up on client inquiries, and
            keep the {site.name} website fresh without touching code.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
            >
              <Icon className="size-4 text-brand-orange" aria-hidden />
              <p className="mt-3 text-2xl font-bold">{value}</p>
              <p className="text-xs text-white/60">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">Inquiries overview</p>
              <p className="text-xs text-white/55">Last 7 days · sample data</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
              <TrendingUpIcon className="size-3" aria-hidden />
              +18%
            </span>
          </div>

          <svg
            viewBox="0 0 320 110"
            role="img"
            aria-label="Sample chart of inquiries over the last seven days"
            className="mt-4 h-28 w-full"
          >
            <defs>
              <linearGradient id="login-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f28c28" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#f28c28" stopOpacity="0" />
              </linearGradient>
            </defs>
            {bars.map((h, i) => (
              <rect
                key={i}
                x={i * 46 + 4}
                y={110 - h}
                width="30"
                height={h}
                rx="4"
                fill="white"
                opacity="0.08"
              />
            ))}
            <polygon points={`0,110 ${line} 320,110`} fill="url(#login-area)" />
            <polyline
              points={line}
              fill="none"
              stroke="#f28c28"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p className="relative text-xs text-white/50">
        © {new Date().getFullYear()} {site.fullName}. Authorized staff only.
      </p>
    </aside>
  )
}
