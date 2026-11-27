# 7. Projects

The portfolio: admin management and public pages. The most important content on the site.

**Depends on:** 4, 5. **Estimate:** 3 days.

## Admin

- List with search and status filter; create, edit, delete, publish/unpublish.
- Fields: name, slug, location, type, description, full details, status (completed / ongoing / upcoming), start date, completion date, featured flag, cover image, gallery images (upload, reorder, alt text).
- Validation: completion date not before start date; upcoming projects need no completion date.

## Public

- `/projects`: category tabs (All, Completed, Ongoing, Upcoming), search by name, premium project cards, pagination or load more.
- `/projects/[slug]`: full details, image gallery with lightbox, status and dates, related projects, quote CTA.
- Upcoming projects are shown publicly.
- Per-page metadata and Open Graph image from the cover image.

## Tasks

- [x] Server actions and Zod schema for project CRUD
- [x] Gallery management in the admin form
- [x] Admin list, filters, and form
- [x] Public list with filter and search (URL-driven so links can be shared)
- [x] Public detail page with gallery
- [x] Featured projects query for the homepage
- [x] Seed sample projects

## Done when

- An admin publishes a project with a gallery and it appears correctly filtered on `/projects`.
- Filter and search state survives reload and sharing.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser (validation, create with cover and gallery, edit, delete, filters, search, pagination redirect, detail page, lightbox); `pnpm validate` passes.

What exists:

- Admin (`/admin/projects`, Project Manager, Editor, or Super Admin): status filter tabs and a search box (plain GET form, so it works without JavaScript), table with cover thumbnail, status badge, featured star, publish switch, edit, and delete with confirm. Form at `/new` and `/[id]/edit`: name, slug (follows the name until edited), location, type (free text with suggestions), status, start and completion dates, short description, details, cover image, gallery (reorderable, first image is the thumbnail), featured and published switches.
- Validation (`lib/validation/project.ts`): completed projects need a completion date, completion cannot be before start, a cover needs alt text, at most 24 gallery images, empty dates become null.
- Server actions (`app/admin/(protected)/projects/actions.ts`): create, update, delete, publish and featured toggles. Update replaces the gallery in one atomic batch; create removes the project again if saving the gallery fails. Duplicate slug returns a field error. Every change revalidates the public site.
- Public: `/projects` with All, Completed, Ongoing, Upcoming tabs, search by name, location, or type (wildcards escaped), 9 per page with Previous and Next, all in the URL so links can be shared. Unknown status values are ignored; a page past the end redirects to the last page. `/projects/[slug]`: cover, status and facts, details, gallery with a full-size viewer (arrow keys, buttons, Escape), related projects of the same type, quote button, Open Graph image from the cover. Unpublished and unknown slugs return 404.
- `lib/queries/projects.ts`: `getPublishedProjects`, `getPublishedProjectBySlug`, `getRelatedProjects`, and `getFeaturedProjects(limit)` for the homepage (module 11).
- Database: migration `0005_project_cover_alt` adds `projects.cover_image_alt`. The seed fills placeholder details for the three sample projects.
- Media delete is blocked while an image is a project cover or gallery image.

Notes for later modules:

- The three seeded projects are placeholders; delete or replace them before launch.
- Public sort order is newest start date first (falls back to creation date).
- Project details are plain text paragraphs, not Markdown.
- Counts on the admin overview already read the projects table.
