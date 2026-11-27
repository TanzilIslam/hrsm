# 2. Database

Full schema for all content, defined once so later modules only add UI and logic.

**Depends on:** 1. **Estimate:** 1 day.

## Tables

| Table | Key fields |
| ----- | ---------- |
| Auth tables (`users`, sessions) | Added in module 3, shaped by the auth library; the `user_role` enum is defined here |
| `services` | id, slug (unique), title, short description, content, icon, image, sort order, published |
| `projects` | id, slug (unique), name, location, type, description, content, status (`completed` / `ongoing` / `upcoming`), start date, completion date, featured, cover image, published |
| `project_images` | id, project id, image URL, alt text, sort order |
| `posts` | id, slug (unique), title, excerpt, content, cover image, published, published at |
| `inquiries` | id, full name, company, email, phone, service required, project location, estimated budget, description, status (`new` / `read` / `replied` / `closed`), created at |
| `media` | id, URL, storage key, file name, size, content type, alt text, created at |

`user_role` is an enum (`super_admin`, `editor`, `project_manager`, `inquiry_manager`) so adding roles later needs no migration; only `super_admin` is used at launch.

Team, clients, and testimonials are static content (module 10), not tables.

## Tasks

- [x] Replace the placeholder `employees` table in `db/schema.ts` (drop it with a migration)
- [x] Define the tables above with enums, unique slugs, and indexes on status, slug, and created at
- [x] Generate and apply migration with `pnpm db:generate` and `pnpm db:migrate`
- [x] Add `db/seed.ts` with sample services and projects, and a `pnpm db:seed` script
- [x] Add Zod schemas next to each table for shared validation

## Done when

- Migration applies cleanly to the Neon `main` branch.
- Seed script fills sample data and can be re-run safely.
- `pnpm validate` passes.

## Status: done

Applied to the Neon `main` branch; `pnpm validate` passes.

What exists:

- `db/schema.ts`: enums plus `services`, `projects`, `project_images`, `posts`, `inquiries`, `media`. Identity integer ids, timestamptz columns, unique slugs, indexes on publish/status/date lookups. Image fields are plain URL strings; `media` is the upload registry.
- `db/validation.ts`: Zod input schemas built with `drizzle-zod` (`serviceInput`, `projectInput`, `postInput`, `inquiryInput`, ...). Slugs are lowercase-hyphen; project completion cannot precede start; the inquiry schema ignores client-sent `status`.
- `db/seed.ts` (`pnpm db:seed`): 8 services, 3 sample projects (completed, ongoing, upcoming), 1 sample post. Matched by slug, so re-running is safe.
- Migrations: `0001_drop_employees` removes the placeholder table; `0002_content_schema` creates the real schema.

Notes for later modules:

- Auth tables are left to module 3 so they match the auth library's expected shape.
- `drizzle-kit generate` is interactive when it cannot tell a rename from a drop-and-create. It needs a TTY, so run it in a normal terminal tab, or make the change in two steps.
- Identity `id` columns are not part of the generated insert schemas, so do not `omit({ id: true })`.
