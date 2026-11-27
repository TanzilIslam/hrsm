// DEMO team (invented names, for design review). Replace names, designations,
// bios, and add photos (a media-library image URL in `photo`). Groups render in
// this order.

export type TeamMember = {
  name: string
  designation: string
  bio: string
  photo?: string
}

export type TeamGroup = { title: string; members: TeamMember[] }

export const teamGroups: TeamGroup[] = [
  {
    title: "Leadership",
    members: [
      {
        name: "Engr. Hasan Reza Shahid",
        designation: "Chairman",
        bio: "Founder of HRSM with more than 30 years in construction. Leads the company's strategy and long-term client relationships.",
      },
      {
        name: "Engr. Md. Sakib Rahman",
        designation: "Managing Director",
        bio: "Civil engineer who oversees operations, finance, and delivery across all HRSM projects.",
      },
      {
        name: "Mahbub Alam",
        designation: "Project Director",
        bio: "Directs project planning and site execution, with a focus on safety, programme, and cost control.",
      },
    ],
  },
  {
    title: "Engineering and design",
    members: [
      {
        name: "Dr. Farzana Karim",
        designation: "Chief Engineer",
        bio: "Structural engineer with a PhD in earthquake-resistant design. Reviews all structural designs and site methods.",
      },
      {
        name: "Ar. Tasnim Haque",
        designation: "Lead Architect",
        bio: "Architect who coordinates design, planning approvals, and the interface with client design teams.",
      },
      {
        name: "Engr. Rafiqul Islam",
        designation: "Senior Civil Engineer",
        bio: "Manages civil, road, and infrastructure works, from survey and earthworks to final testing.",
      },
    ],
  },
  {
    title: "Delivery",
    members: [
      {
        name: "Shafiqul Bari",
        designation: "Senior Project Manager",
        bio: "Runs residential and commercial projects day to day, reporting progress to clients every week.",
      },
      {
        name: "Nazmul Hasan",
        designation: "Site Safety Manager",
        bio: "Builds and enforces safety plans on every site, from training to equipment inspection.",
      },
      {
        name: "Jahid Hossain",
        designation: "Quality and Technical Lead",
        bio: "Leads materials testing and quality inspections so every stage meets specification before the next begins.",
      },
    ],
  },
]
