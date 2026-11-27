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

- [x] Server actions and Zod schema for service CRUD (admin only)
- [x] Admin list and form pages
- [x] Public list and detail pages
- [x] Revalidate public pages on change
- [x] Seed the eight services

## Done when

- An admin adds a service and it appears on `/services` and in the contact form without a deploy.
- Unpublished services return 404 publicly.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser (list, reorder, publish toggle, create, validation, duplicate slug, edit, delete, public list and detail, 404s); `pnpm validate` passes.

What exists:

- Admin (`/admin/services`, Editor or Super Admin): table with order arrows, icon or image thumbnail, publish switch, edit, and delete with a confirm dialog. Form at `/admin/services/new` and `/[id]/edit`: title, slug (follows the title until edited by hand; unchanged slugs stay put on edit), short description, full details, icon picker, visibility switch, and a cover image through `ImageUploader`.
- Server actions in `app/admin/(protected)/services/actions.ts`: create, update, delete, publish toggle, move up or down (renumbers 0..n-1 in one batch). Each calls `requireRole("editor")` and validates with `lib/validation/service.ts`. A duplicate slug returns a field error. Each change revalidates the whole public site (`revalidatePath("/", "layout")`) because the footer lists services too.
- Public: `/services` card grid and `/services/[slug]` detail (paragraphs split on blank lines, cover image, quote button). Unpublished or unknown slugs return a real 404. The footer now lists up to six published services from the database. Queries are in `lib/queries/services.ts`.
- Database: migration `0004_service_image_alt` adds `services.image_alt`. `pnpm db:seed` now also fills placeholder copy for empty sample services.
- Icons are a fixed list in `lib/service-icons.ts` (the database stores the key; unknown keys fall back to a building).

Notes for later modules (projects, blog reuse these patterns):

- Look icons up as `serviceIcons[toIconKey(value)].icon`. A helper that returns a component trips the React lint rule "Cannot create components during render".
- Do not add `loading.tsx` to the public layout: it makes `notFound()` respond 200 instead of 404.
- Postgres errors from Drizzle carry the code on `error.cause.code` (unique violation is 23505).
- The services table is built directly with the shadcn `Table`; there is no shared data-table abstraction. Build one only if projects and inquiries turn out to need the same search, filter, and pagination.
- Contact form dropdown (module 8) should read `getPublishedServices()`.
- Service content is plain text paragraphs, not Markdown.
