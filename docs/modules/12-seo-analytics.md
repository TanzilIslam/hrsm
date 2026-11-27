# 12. SEO and Analytics

**Depends on:** 6–11. **Estimate:** 1 day.

## Scope

- Metadata for every public page (title template, description, canonical URL, Open Graph, Twitter card).
- `sitemap.ts` (static pages plus published services, projects, posts) and `robots.ts` (disallow `/admin`).
- JSON-LD schema: `Organization`/`GeneralContractor` on the site, `Article` on posts, `BreadcrumbList` on detail pages.
- Image alt text enforced from the media module.
- Keywords: static starter set (Construction Company in Bangladesh, Civil Engineering Company, Building Construction Services, Industrial Construction Bangladesh, Commercial Building Construction) used naturally in copy and metadata.
- Google Analytics added through an env-driven measurement ID; Search Console verification when HRSM provides the account.
- Per-page SEO editing in the dashboard is out of scope (we update on request).

## Tasks

- [x] Metadata helper and per-route metadata
- [x] Sitemap and robots
- [x] JSON-LD components
- [x] Analytics script behind env variable, loaded after consent-friendly defaults
- [x] Check canonical URLs and no-index on admin and drafts

## Done when

- `/sitemap.xml` and `/robots.txt` are correct and exclude admin and drafts.
- Rich result test passes for organization and article pages.
- `pnpm validate` passes.

## Status: done

Checked against the running app and a production build; `pnpm validate` passes.

What exists:

- Base URL: `lib/site-url.ts` reads `NEXT_PUBLIC_SITE_URL`, then Vercel's production URL, then localhost. The root layout sets `metadataBase` from it, so canonical and Open Graph URLs are absolute.
- Metadata: title template and description on every page; `alternates.canonical` on every public page (filters and page numbers are not part of the canonical); site-wide Open Graph (`siteName`, `en_BD`) and Twitter large-card defaults. Detail pages (service, project, blog) build a complete Open Graph object with `openGraphFor()` in `lib/seo.ts`, using the cover image or the default card. A page-level `openGraph` replaces the root one entirely, so always use that helper for new detail pages.
- `app/opengraph-image.tsx`: a generated 1200x630 brand card (navy, orange, company name, tagline), used when a page has no cover image.
- `app/sitemap.ts`: static pages plus every published service, project, and live blog post with last-modified dates, generated from the database on each request (`/sitemap.xml`). `app/robots.ts`: allows the site, disallows `/admin` and `/api/`, and points to the sitemap. Admin pages are also `noindex`.
- Structured data (`components/site/json-ld.tsx`): `GeneralContractor` organization on every public page, `BlogPosting` on posts, and `BreadcrumbList` on service, project, and post pages. The organization data comes from the placeholders in `lib/site.ts` (address, phone, email, socials). Confirm them before launch so Google does not index wrong details.
- Analytics and verification: Google Analytics 4 loads only in production when `NEXT_PUBLIC_GA_ID` is set (`@next/third-parties`); the Search Console token goes in `NEXT_PUBLIC_GSC_VERIFICATION`. Both verified in a production build with test values.
- Image alt text is required by the media library and the admin forms.

To finish after launch:

- Set `NEXT_PUBLIC_SITE_URL` to the real domain, `NEXT_PUBLIC_GA_ID`, and `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel; then add the property in Search Console and submit `/sitemap.xml`.
- Run Google's Rich Results Test on a project, service, and post page. It cannot be run against localhost.
- The privacy policy already mentions analytics cookies. Add a cookie banner only if HRSM wants one.
- Target keywords from the PRD (Construction Company in Bangladesh, Civil Engineering Company, and so on) should appear naturally in the real page copy, not just the placeholders.
