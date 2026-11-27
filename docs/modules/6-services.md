# 6. Services

Admin management and public pages for HRSM's services.

**Depends on:** 4, 5. **Estimate:** 2 days.

## Admin

- List, create, edit, delete, publish/unpublish, reorder services.
- Fields: title, slug (auto from title, editable), short description, full content, icon, cover image, sort order.
- Seed the eight proposed services: Building Construction, Civil Engineering, Industrial Construction, Road Construction, Interior & Exterior, Structural Engineering, Project Management, Renovation.

## Public

- `/services`: grid of service cards with icon, image, short description.
- `/services/[slug]`: detail page with content, image, related projects (if any), and a Get a Quote call to action.
- Per-page metadata, 404 for unknown or unpublished slugs.
- The contact form's "Service required" dropdown reads from this table.

## Tasks

- [ ] Server actions and Zod schema for service CRUD (admin only)
- [ ] Admin list and form pages
- [ ] Public list and detail pages
- [ ] Revalidate public pages on change
- [ ] Seed the eight services

## Done when

- An admin adds a service and it appears on `/services` and in the contact form without a deploy.
- Unpublished services return 404 publicly.
- `pnpm validate` passes.
