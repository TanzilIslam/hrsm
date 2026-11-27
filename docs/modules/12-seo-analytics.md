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

- [ ] Metadata helper and per-route metadata
- [ ] Sitemap and robots
- [ ] JSON-LD components
- [ ] Analytics script behind env variable, loaded after consent-friendly defaults
- [ ] Check canonical URLs and no-index on admin and drafts

## Done when

- `/sitemap.xml` and `/robots.txt` are correct and exclude admin and drafts.
- Rich result test passes for organization and article pages.
- `pnpm validate` passes.
