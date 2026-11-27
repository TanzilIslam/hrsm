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

- [x] Add tokens and map them to shadcn variables
- [x] Add needed shadcn components (button, input, textarea, select, card, badge, sheet, dialog, form pieces)
- [x] Build `(site)` layout: header, mobile menu, footer
- [x] Add `lib/site.ts` with placeholder company data
- [x] Build shared section components
- [x] Add `not-found.tsx` and `error.tsx`
- [x] Add empty placeholder routes for all public pages so navigation works

## Done when

- Every nav link resolves to a page (placeholder content is fine).
- Layout is correct at phone, tablet, and desktop widths.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser (desktop, mobile menu, 404) with `pnpm validate` passing.

Notes for later modules:

- Shared pieces live in `components/site/` (`sections.tsx` has `Container`, `Section`, `SectionHeading`, `PageHero`, `CtaBand`, `StatusBadge`, `EmptyState`, `ImagePlaceholder`). Company data is in `lib/site.ts`.
- Light mode only: `next-themes` and the dark-mode hotkey were removed.
- `cn()` now uses `clsx` + `tailwind-merge`; the shadcn starter had imported it from an unrelated npm package.
- Next 16 error boundaries receive `retry`, not `reset`.
- `pnpm typecheck` runs `next typegen` first so stale generated route types cannot fail the check.
- Footer services and the contact details are placeholders until modules 6 and 8.
- A shared `<MediaImage>` using `next/image` comes with module 5; until then `ImagePlaceholder` is used.
