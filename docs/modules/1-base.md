# 1. Base

Foundation every other module builds on: design system, public layout shell, conventions.

**Depends on:** nothing. **Estimate:** 2 days.

## Scope

- Design tokens in `app/globals.css`: navy `#142B45`, orange `#F28C28`, white, light gray `#F3F5F7`, dark gray `#202A35` (placeholders until the logo arrives), mapped to shadcn theme variables, light mode first.
- Fonts, typography scale, spacing and container width conventions.
- Route groups: `(site)` for public pages, `(admin)` for the dashboard, so each has its own layout.
- Public shell: header with logo, navigation, "Get a Quote" button, mobile menu; footer with company info, quick links, services, contact details, social links, copyright.
- Shared components: section heading, page hero banner, CTA band, status badge, empty state, image with fallback.
- Global pages: custom 404, error boundary, loading states.
- Site config file (`lib/site.ts`): company name, contact details, social URLs, nav items, all static placeholders in one place.
- Remove starter template leftovers (`ThemeProvider` dark-mode toggle if unused).

## Tasks

- [ ] Add tokens and map them to shadcn variables
- [ ] Add needed shadcn components (button, input, textarea, select, card, badge, sheet, dialog, form pieces)
- [ ] Build `(site)` layout: header, mobile menu, footer
- [ ] Add `lib/site.ts` with placeholder company data
- [ ] Build shared section components
- [ ] Add `not-found.tsx` and `error.tsx`
- [ ] Add empty placeholder routes for all public pages so navigation works

## Done when

- Every nav link resolves to a page (placeholder content is fine).
- Layout is correct at phone, tablet, and desktop widths.
- `pnpm validate` passes.
