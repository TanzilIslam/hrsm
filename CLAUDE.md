# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is pnpm (`pnpm-lock.yaml`). No test runner is configured.

```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm lint         # eslint (flat config, eslint.config.mjs)
pnpm typecheck    # next typegen && tsc --noEmit
pnpm format       # prettier --write "**/*.{ts,tsx}"
pnpm format:check # prettier --check (no writes)
pnpm validate     # typecheck → lint → format:check → build (run before committing)
```

## Architecture

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui. The build plan is in `docs/modules/` (follow it in order; the PRD is `docs/prd.md`). Next 16 docs live in `node_modules/next/dist/docs/` — consult them before using Next APIs (see AGENTS.md).

- `app/` — App Router routes. Root `layout.tsx` sets fonts and metadata only; public pages live in the `(site)` route group, whose layout adds header and footer (the planned `(admin)` group gets its own layout). `globals.css` holds Tailwind v4 config and brand tokens (navy `--primary`, orange `--accent`, plus `bg-navy`/`bg-brand-orange` utilities); light mode only. Error boundaries receive `retry` (not `reset`) in this Next version.
- `components/site/` — public layout pieces and shared sections; `lib/site.ts` holds company details, nav, and footer links (placeholders until the client supplies real data).
- `components/ui/` — shadcn components, style `base-vega`, built on `@base-ui/react` (not Radix). Add with `npx shadcn@latest add <name>`; config in `components.json` (RSC enabled, lucide icons).
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge). Generated shadcn files may import `cn` from the wrong package; it must come from `@/lib/utils`. `hooks/` — shared hooks (empty).
- Import alias: `@/*` maps to the repo root (e.g. `@/components/ui/button`).

## Conventions

Prettier: no semicolons, double quotes, 2-space indent, `trailingComma: es5`, with `prettier-plugin-tailwindcss` sorting classes (including inside `cn`/`cva`).

## Database (Neon + Drizzle)

Neon project `hrsm` (`lucky-scene-40954637`, branch `main`, db `neondb`). `DATABASE_URL` lives in `.env.local` (gitignored); get it with `neon connection-string --project-id lucky-scene-40954637`.

- Schema: `db/schema.ts` (services, projects, project_images, posts, inquiries, media, plus Better Auth tables user/session/account/verification/rate_limit); Zod input schemas in `db/validation.ts` (via `drizzle-zod`); client: `db/index.ts` (`drizzle-orm/neon-http`); migrations output to `drizzle/`; config in `drizzle.config.ts`.
- `pnpm db:seed` loads idempotent sample data (`db/seed.ts`, matched by slug). `drizzle-kit generate` needs a TTY when it cannot tell a rename from a drop-and-create.
- Schema change workflow: edit `db/schema.ts` → `pnpm db:generate` → `pnpm db:migrate`. `pnpm db:push` syncs directly (dev only); `pnpm db:studio` opens Drizzle Studio.

## Auth (Better Auth)

- Config in `lib/auth.ts`; browser client in `lib/auth-client.ts`; handler at `app/api/auth/[...all]/route.ts`. Sign-up is disabled: create admins with `pnpm db:seed-admin` (reads `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`). Env vars are listed in `.env.example`.
- Authorize on the server: call `requireUser()` or `requireRole(...)` from `lib/session.ts` at the top of every admin page, layout, and server action. `proxy.ts` only does an optimistic cookie check and is not a security boundary.
- Admin routes live under `app/admin`; protected pages go in the `(protected)` group, the login page stays outside it.
- Only `super_admin` exists at launch; the `user_role` enum already has editor, project_manager, inquiry_manager.

## Forms

Build forms with `Form` / `FormField` / `fieldA11y` from `components/ui/form.tsx` (fixed spacing: gap-5 between fields, gap-2 inside a field; do not hand-roll `space-y-*`). Validate with Zod and show per-field errors through `FormField`; give every input a placeholder; use `PasswordInput` for passwords. Report API/server results with `toast` from `sonner` (global `<Toaster />` in the root layout). `components/admin/login-form.tsx` is the reference example.

## Admin shell

Admin pages render inside `app/admin/(protected)/layout.tsx` (shadcn sidebar, navy backdrop). Add a nav entry in `lib/admin-nav.ts` and set `ready: true` once the pages exist. `components/ui/sidebar.tsx` and `hooks/use-mobile.ts` are hand-edited shadcn files; do not overwrite them when re-adding components.

## Media

Images are stored in Vercel Blob (store `hrsm-media`, `BLOB_READ_WRITE_TOKEN`). Upload and delete go through `app/api/admin/media`; use `ImageUploader` / `MediaPicker` from `components/admin/media/` in forms and `ConfirmDialog` before destructive actions. Image fields store a URL plus alt text. The Vercel project `hrsm` is linked locally (`.vercel/`, gitignored); `vercel env pull` overwrites `.env.local`, so pull to a temp file and copy only what you need.

Buttons: the shadcn button was edited so icon-to-text gap is `gap-2` (default and lg sizes). Re-adding the button would overwrite this.
