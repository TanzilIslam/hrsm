# 10. Static Pages

Pages whose content we update on request (client chose the smaller dashboard), so content lives in code, not the database.

**Depends on:** 1. **Estimate:** 2 days. Can run in parallel with modules 5–9.

## Scope

Content files under `content/` (typed TypeScript objects), rendered by the pages:

- **About Us** (`/about`): introduction, history, mission and vision, core values, leadership, strengths, certifications and achievements (placeholders until supplied).
- **Our Team** (`/team`): groups for management, Chief Engineer, architects, civil engineers, project managers, technical team; each member has photo, name, designation, short bio.
- **Clients & Partners** (`/clients`): client and partner logo grid, testimonials.
- **Legal pages**: privacy policy and terms (basic drafts for HRSM to review).
- Shared pieces reused by the homepage: testimonials list, statistics values, "Why choose HRSM" items.

Placeholders are clearly typed so a swap to real content is a data-only change. Images go in `public/` or the media store.

## Tasks

- [x] Define content types and files in `content/`
- [x] About page sections
- [x] Team page with grouped members
- [x] Clients, partners, and testimonials sections
- [x] Privacy and terms pages
- [x] Per-page metadata

## Done when

- All pages render from content files with no hardcoded copy in components.
- Replacing a placeholder needs only a content-file edit.
- `pnpm validate` passes.

## Status: done

All five pages render from content files; `pnpm validate` passes and each page was loaded in the browser (200, correct title and headings).

What exists:

- `content/about.ts`, `content/team.ts`, `content/clients.ts`, `content/legal.ts`, `content/home.ts`: typed, plain TypeScript data. Edit these files to change copy; no component edits are needed.
- `/about`: intro with a photo slot, mission and vision, four core values, history timeline, strengths, certifications.
- `/team`: groups (Leadership, Engineering and design, Delivery); members show a photo or initials, name, designation, and bio.
- `/clients`: client and partner grids (logo or name) and testimonials (`components/site/testimonial-card.tsx`).
- `/privacy` and `/terms`: rendered by `components/site/legal-page.tsx` from `content/legal.ts`.
- `content/home.ts` already holds the homepage statistics and the "Why choose HRSM" items for module 11, and `TestimonialCard` is ready for it.
- The old `PagePlaceholder` component was removed; every public page now has real content.

**Everything here is placeholder until HRSM supplies real details**: team names show "Name to be added", client and partner names are "Client name" or "Partner name", history years read "Year", certifications are generic, the statistics are sample numbers, and the testimonials are marked as placeholders. The Privacy Policy and Terms are basic drafts that HRSM should review, ideally with a lawyer, before launch.

How to fill in real content:

- Photos and logos: upload in Admin, Media, then paste the image URL into `photo` or `logo`. The Blob host is already allowed for `next/image`.
- Content changes need a code change and a deploy (the client chose the smaller dashboard). These pages can move into the dashboard later if HRSM wants to edit them itself.

### Update: demo content

The placeholder text above was replaced with invented **demo** content for design review: a nine-person team (no photos), six clients, four partners, three testimonials, a four-step history, and sample certifications, plus a real photo on the About page. See `docs/demo-content.md`. It still must be replaced with HRSM's real details.
