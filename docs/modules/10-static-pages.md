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

- [ ] Define content types and files in `content/`
- [ ] About page sections
- [ ] Team page with grouped members
- [ ] Clients, partners, and testimonials sections
- [ ] Privacy and terms pages
- [ ] Per-page metadata

## Done when

- All pages render from content files with no hardcoded copy in components.
- Replacing a placeholder needs only a content-file edit.
- `pnpm validate` passes.
