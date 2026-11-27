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

- Schema: `db/schema.ts`; client: `db/index.ts` (`drizzle-orm/neon-http`); migrations output to `drizzle/`; config in `drizzle.config.ts`.
- Schema change workflow: edit `db/schema.ts` → `pnpm db:generate` → `pnpm db:migrate`. `pnpm db:push` syncs directly (dev only); `pnpm db:studio` opens Drizzle Studio.
