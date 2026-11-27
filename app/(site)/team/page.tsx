import type { Metadata } from "next"
import Image from "next/image"

import { CtaBand, PageHero, Section } from "@/components/site/sections"
import { teamGroups, type TeamMember } from "@/content/team"

export const metadata: Metadata = {
  alternates: { canonical: "/team" },
  title: "Our Team",
  description: "Meet the leadership, engineers, and project teams behind HRSM.",
}

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "H"
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-xs ring-1 ring-foreground/10">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={112}
          height={112}
          className="size-28 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-28 place-items-center rounded-full bg-navy text-3xl font-bold text-white"
        >
          {initials(member.name)}
        </span>
      )}
      <div>
        <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
        <p className="text-sm font-medium text-brand-orange">
          {member.designation}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {member.bio}
      </p>
    </div>
  )
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        description="The people behind HRSM: leaders, engineers, and project managers."
      />
      {teamGroups.map((group, i) => (
        <Section key={group.title} tone={i % 2 ? "muted" : "default"}>
          <h2 className="mb-8 text-2xl font-bold text-navy">{group.title}</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((m, k) => (
              <li key={`${m.designation}-${k}`}>
                <MemberCard member={m} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <CtaBand />
    </>
  )
}
