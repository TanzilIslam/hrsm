# 4. Admin Shell

Dashboard layout and overview that all admin modules plug into.

**Depends on:** 3. **Estimate:** 1 day.

## Scope

- `(admin)` layout: sidebar navigation, top bar with user menu, responsive (collapsible on mobile).
- Sidebar entries for in-scope modules: Overview, Projects, Services, Inquiries, Blog. Entries appear as their modules are built.
- Overview page cards: total, completed, and ongoing projects; total and new inquiries; services; blog posts. Pulled from the database.
- Reusable admin building blocks: data table (search, filter, pagination), page header with action button, form layout, confirm-delete dialog, toast notifications, empty and loading states.
- Admin pages are `noindex` and excluded from the sitemap.

## Tasks

- [x] Sidebar, top bar, mobile navigation
- [x] Form components (`Form`, `FormField`, `FieldError`, `PasswordInput`)
- [ ] Reusable data table (build with the first list screen in module 6, then reuse)
- [x] Toast (global `sonner`)
- [ ] Confirm-delete dialog (build with the first delete action in module 6)
- [x] Overview cards with real counts
- [x] `noindex` metadata for `/admin` (the robots.txt rule comes with module 12)

## Done when

- A logged-in admin sees the overview with live counts.
- New admin modules only need to add a sidebar item and pages.
- `pnpm validate` passes.

## Status: mostly done

The shell, sidebar and overview are built and checked in the browser (desktop, collapsed, mobile sheet); `pnpm validate` passes. The data table and confirm-delete dialog are intentionally deferred to module 6, so they are designed around a real list screen rather than guessed.

What exists:

- `app/admin/(protected)/layout.tsx`: shadcn `SidebarProvider` + `SidebarInset` with a sticky top bar and `SidebarTrigger`. Sidebar colors are scoped to the admin area through CSS variables in that layout (navy surface, orange accent).
- `components/admin/admin-sidebar.tsx`: icon-collapsible sidebar holding only the nav links, on the login-page backdrop (`components/admin/admin-backdrop.tsx`, shared with the login showcase; the sidebar uses it with `glow={false}` for a flat navy grid). Mobile uses the sheet.
- The layout wraps every admin page in one centered container (`mx-auto w-full max-w-6xl`). Pages must not add their own width wrapper; narrow pages like Account set a smaller `max-w-*` with `mx-auto` inside it. The top bar has no title text.
- `components/admin/user-menu.tsx`: dropdown at the right of the top bar (avatar and name) with Account and Sign out.
- `lib/admin-nav.ts`: the nav list. **When a module's pages exist, set its `ready: true`** to turn the "Soon" entry into a link.
- `lib/admin-stats.ts` + `app/admin/(protected)/page.tsx`: overview cards from live database counts.
- `components/ui/sidebar.tsx` is generated shadcn with two small edits (`relative overflow-hidden` on the inner containers so the backdrop clips). `hooks/use-mobile.ts` was rewritten with `useSyncExternalStore` to satisfy the lint rule. Re-adding the shadcn sidebar would overwrite both.
- Card gotcha: `CardContent` is `flex-col` by default; use `flex-row` explicitly for horizontal layouts.
