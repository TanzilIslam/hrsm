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

- [x] Server actions and Zod schema for posts
- [x] Editor choice and safe rendering
- [x] Admin list and form
- [x] Public list and article pages
- [x] Seed a few sample posts

## Done when

- An admin publishes a post and it appears on `/blog` and in the sitemap.
- Scheduled or draft posts are not visible publicly.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser (validation, Markdown preview, scheduling, publish, article page, delete); `pnpm validate` passes.

What exists:

- Admin (`/admin/blog`, Editor or Super Admin): table with cover thumbnail, a Live, Scheduled, or Draft badge, publish switch, edit, and delete with confirm. Form: title, slug (follows the title until edited), excerpt, article editor with Write and Preview tabs (Markdown), cover image, optional publish date, and a published switch.
- Publishing rules: a published post with a future date is Scheduled and stays hidden (404) until that date. No date means the post publishes now, and the date is stamped the first time it is published and kept afterwards. Dates are Bangladesh time (UTC+6).
- Safe Markdown (`components/site/markdown.tsx`, `react-markdown` + GFM): raw HTML is shown as plain text, never executed; `javascript:` links are dropped. Verified with a script tag, an image with `onerror`, and a `javascript:` link.
- Public: `/blog` (9 per page, Newer and Older links, a page past the end redirects to the last page) and `/blog/[slug]` (cover, date, article, Facebook, LinkedIn, and WhatsApp share links built from the request host, more posts, quote button, Open Graph article metadata). Queries are in `lib/queries/posts.ts`; `getRecentPosts(limit)` is ready for the homepage.
- Database: migration `0006_post_cover_alt` adds `posts.cover_image_alt`. Media delete is already blocked while a post uses an image.

Notes for later work:

- Articles are Markdown text. Images inside an article are plain `![alt](url)` links (paste a media-library image URL); there is no inline image picker.
- The seeded "Welcome to the new HRSM website" post is a placeholder; replace or delete it before launch.
- Sample content order is newest publish date first.
