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

- [ ] Sidebar, top bar, mobile navigation
- [ ] Reusable data table and form components
- [ ] Confirm dialog and toast
- [ ] Overview cards with real counts
- [ ] `noindex` metadata and robots rule for `/admin`

## Done when

- A logged-in admin sees the overview with live counts.
- New admin modules only need to add a sidebar item and pages.
- `pnpm validate` passes.
