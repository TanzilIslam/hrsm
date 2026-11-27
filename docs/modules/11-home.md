# 11. Home

The homepage, assembled from live data and the earlier modules. Built late so it can show real content.

**Depends on:** 6, 7, 10. **Estimate:** 3 days.

## Sections (in order)

1. Hero: full-width background video (poster image fallback, muted autoplay, paused for reduced-motion users), headline, intro, Explore Projects and Get a Quote buttons.
2. About HRSM: short overview, Learn More.
3. Services: cards from the database, View All Services.
4. Featured projects: featured flag from module 7, grouped completed, ongoing, upcoming.
5. Why choose HRSM: quality, experienced team, modern technology, on-time delivery, safety and reliability.
6. Statistics: years of experience, completed projects, ongoing projects, happy clients (static values until real numbers arrive; counters animate once).
7. Testimonials.
8. Call to action: "Let's Build Something Great Together" to Contact.

Header and footer come from module 1.

## Notes

- Hero video is the heaviest asset: compress it, serve a lightweight poster first, and do not load video on slow or data-saver connections.
- Placeholder video/poster is used until HRSM supplies the real file.

## Tasks

- [x] Hero with video, poster, and reduced-motion handling
- [x] Sections 2–8 wired to data and content files
- [x] Scroll animations, restrained and respecting reduced motion
- [x] Homepage metadata

## Done when

- Homepage loads with good Lighthouse performance on mobile despite the video.
- Featured projects and services reflect what admins publish.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser (desktop and phone width: no horizontal overflow); `pnpm validate` passes.

What exists (`app/(site)/page.tsx`):

1. Hero with a looping background video, a navy overlay for text contrast, the headline, intro, and the Explore Projects and Get a Quote buttons.
2. About teaser (first paragraph from `content/about.ts`) with four highlights and Learn More.
3. Services: up to six published services from the database with a View All Services button.
4. Featured projects: projects flagged Featured in the admin (up to six); the section hides itself when none are featured.
5. Why choose HRSM: five items from `content/home.ts`.
6. Statistics: animated counters (`components/site/stat-counter.tsx`) that count up once when scrolled into view. The final number is in the server HTML, and users who prefer reduced motion see it without animation.
7. Testimonials: from `content/clients.ts`.
8. Call to action band.

Hero video (`components/site/hero-video.tsx`, config in `lib/site.ts` under `hero`):

- The video file is a **placeholder** (an 80 KB animated gradient made with ffmpeg) at `public/videos/hero-placeholder.mp4` with a poster `hero-poster.jpg`. To use the real video, drop the file in `public/videos` (or host it) and change `site.hero.video` and `site.hero.poster`. Keep it short, muted, compressed (about 1 to 3 MB, 720p to 1080p, H.264), and set `site.hero.video` to an empty string to show a plain navy hero.
- The video is skipped (poster only) when the visitor prefers reduced motion or has Data Saver or a 2G connection on, and it only preloads metadata.

Notes for later work:

- Featured projects and services update from the admin; statistics, testimonials, and "Why choose" come from the content files and are placeholders.
- Real hero video, stats, and testimonials are needed from HRSM before launch.

### Update: photo hero

The homepage hero now shows a real construction photo (`site.hero.poster`) with `site.hero.video` left empty, so it is a photo-only hero. The video path still works: set `site.hero.video` to an MP4 and it fades in over the photo.
