// PLACEHOLDER team. Replace names, designations, bios, and add photos (use a
// media-library image URL in `photo`). Groups render in this order.

export type TeamMember = {
  name: string
  designation: string
  bio: string
  photo?: string
}

export type TeamGroup = { title: string; members: TeamMember[] }

const todo = {
  name: "Name to be added",
  bio: "Short biography to be added.",
}

export const teamGroups: TeamGroup[] = [
  {
    title: "Leadership",
    members: [
      { ...todo, designation: "Chairman" },
      { ...todo, designation: "Managing Director" },
      { ...todo, designation: "Project Director" },
    ],
  },
  {
    title: "Engineering and design",
    members: [
      { ...todo, designation: "Chief Engineer" },
      { ...todo, designation: "Architect" },
      { ...todo, designation: "Civil Engineer" },
    ],
  },
  {
    title: "Delivery",
    members: [
      { ...todo, designation: "Project Manager" },
      { ...todo, designation: "Technical Lead" },
    ],
  },
]
