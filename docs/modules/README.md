# Build Plan: Modules

The [PRD](../prd.md) split into ordered modules. Build in number order; each module lists what it depends on, its tasks, and when it is done. Tick the checklist as modules finish.

Every module ends with `pnpm validate` passing. Day counts are rough estimates for planning, not commitments.

| # | Module | Depends on | Days | Status |
| - | ------ | ---------- | ---- | ------ |
| 1 | [Base](./1-base.md): design system, layout shell, conventions | | 2 | [x] |
| 2 | [Database](./2-database.md): schema for all content | 1 | 1 | [x] |
| 3 | [Admin auth](./3-admin-auth.md): Super Admin login and route protection | 2 | 2 | [x] |
| 4 | [Admin shell](./4-admin-shell.md): dashboard layout and overview | 3 | 1 | [x] |
| 5 | [Media](./5-media.md): image upload and storage | 4 | 1 | [x] |
| 6 | [Services](./6-services.md): admin CRUD + public pages | 4, 5 | 2 | [x] |
| 7 | [Projects](./7-projects.md): admin CRUD + public portfolio | 4, 5 | 3 | [x] |
| 8 | [Inquiries](./8-inquiries.md): contact form, inbox, email | 4 | 2 | [x] |
| 9 | [Blog](./9-blog.md): admin CRUD + public blog | 4, 5 | 2 | [x] |
| 10 | [Static pages](./10-static-pages.md): About, Team, Clients, testimonials | 1 | 2 | [x] |
| 11 | [Home](./11-home.md): homepage assembled from live data | 6, 7, 10 | 3 | [x] |
| 12 | [SEO and analytics](./12-seo-analytics.md) | 6–11 | 1 | [x] |
| 13 | [QA and hardening](./13-qa-hardening.md): security, a11y, performance | all | 2 | [x] |
| 14 | [Deployment and handover](./14-deployment-handover.md) | 13 | 1 | [x] |

Total about 25 days of work, inside the 28-day estimate in the PRD.

**All 14 modules are built.** What remains is handover work that depends on HRSM (domain, real content, logo, email account); see the open list at the bottom of [14-deployment-handover.md](./14-deployment-handover.md).

## Dependency flow

```
1 Base ─┬─ 2 Database ─ 3 Auth ─ 4 Admin shell ─┬─ 5 Media ─┬─ 6 Services ─┐
        │                                       │           ├─ 7 Projects ─┤
        │                                       │           └─ 9 Blog      │
        │                                       └─ 8 Inquiries             ├─ 11 Home ─ 12 SEO ─ 13 QA ─ 14 Deploy
        └─ 10 Static pages ───────────────────────────────────────────────┘
```

Modules 6–10 are independent of each other once their dependencies are done, so they can be reordered or split between people.

## Cross-cutting rules

- Stack: Next.js (App Router), TypeScript, shadcn/ui + Tailwind, Zod, Neon + Drizzle. Check `node_modules/next/dist/docs/` before using Next APIs.
- Validate every input with Zod on the server, including admin forms.
- Public pages are server-rendered from the database; admin writes revalidate the affected pages.
- Schema changes go through `pnpm db:generate` and `pnpm db:migrate`, never edited by hand in Neon.
- Use placeholder content where the client has not supplied real content yet (see "Static for now" in the PRD).

## Decisions still needed from us

| Decision | Needed by | Default if undecided |
| -------- | --------- | -------------------- |
| Image storage provider | Module 5 | Decided and built: Vercel Blob |
| Email provider for inquiry notifications | Module 8 | Built for Resend; account, domain, and API key still needed |
| Auth approach (library vs. hand-rolled sessions) | Module 3 | Decided and built: Better Auth with the Drizzle adapter |
