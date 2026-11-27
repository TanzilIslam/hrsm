# 2. Database

Full schema for all content, defined once so later modules only add UI and logic.

**Depends on:** 1. **Estimate:** 1 day.

## Tables

| Table | Key fields |
| ----- | ---------- |
| `users` | id, name, email (unique), password hash, role, timestamps |
| `sessions` / auth tables | as required by the auth library chosen in module 3 |
| `services` | id, slug (unique), title, short description, content, icon, image, sort order, published |
| `projects` | id, slug (unique), name, location, type, description, content, status (`completed` / `ongoing` / `upcoming`), start date, completion date, featured, cover image, published |
| `project_images` | id, project id, image URL, alt text, sort order |
| `posts` | id, slug (unique), title, excerpt, content, cover image, published, published at |
| `inquiries` | id, full name, company, email, phone, service required, project location, estimated budget, description, status (`new` / `read` / `replied` / `closed`), created at |
| `media` | id, URL, storage key, file name, size, content type, alt text, created at |

`role` is an enum (`super_admin`, `editor`, `project_manager`, `inquiry_manager`) so adding roles later needs no migration; only `super_admin` is used at launch.

Team, clients, and testimonials are static content (module 10), not tables.

## Tasks

- [ ] Replace the placeholder `employees` table in `db/schema.ts` (drop it with a migration)
- [ ] Define the tables above with enums, unique slugs, and indexes on status, slug, and created at
- [ ] Generate and apply migration with `pnpm db:generate` and `pnpm db:migrate`
- [ ] Add `db/seed.ts` with sample services and projects, and a `pnpm db:seed` script
- [ ] Add Zod schemas next to each table for shared validation

## Done when

- Migration applies cleanly to the Neon `main` branch.
- Seed script fills sample data and can be re-run safely.
- `pnpm validate` passes.
