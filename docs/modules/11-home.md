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

- [ ] Hero with video, poster, and reduced-motion handling
- [ ] Sections 2–8 wired to data and content files
- [ ] Scroll animations, restrained and respecting reduced motion
- [ ] Homepage metadata

## Done when

- Homepage loads with good Lighthouse performance on mobile despite the video.
- Featured projects and services reflect what admins publish.
- `pnpm validate` passes.
