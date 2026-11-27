# 9. Blog

News and articles, managed by HRSM staff from the dashboard.

**Depends on:** 4, 5. **Estimate:** 2 days.

## Admin

- List, create, edit, delete, publish/unpublish posts; set the publish date.
- Fields: title, slug, excerpt, cover image, content, published flag.
- Content editor: rich text or Markdown (pick one in this module; Markdown with preview is the simpler default). Sanitize rendered content to prevent XSS.

## Public

- `/blog`: post cards with cover, excerpt, date; pagination.
- `/blog/[slug]`: article page with cover, content, date, share links, and a quote CTA.
- Per-post metadata, Open Graph image, RSS feed optional.

## Tasks

- [ ] Server actions and Zod schema for posts
- [ ] Editor choice and safe rendering
- [ ] Admin list and form
- [ ] Public list and article pages
- [ ] Seed a few sample posts

## Done when

- An admin publishes a post and it appears on `/blog` and in the sitemap.
- Scheduled or draft posts are not visible publicly.
- `pnpm validate` passes.
