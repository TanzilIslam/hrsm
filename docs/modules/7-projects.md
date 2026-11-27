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

- [ ] Server actions and Zod schema for project CRUD
- [ ] Gallery management in the admin form
- [ ] Admin list, filters, and form
- [ ] Public list with filter and search (URL-driven so links can be shared)
- [ ] Public detail page with gallery
- [ ] Featured projects query for the homepage
- [ ] Seed sample projects

## Done when

- An admin publishes a project with a gallery and it appears correctly filtered on `/projects`.
- Filter and search state survives reload and sharing.
- `pnpm validate` passes.
