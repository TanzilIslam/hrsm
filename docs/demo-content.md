# Demo content and photo credits

The local site and dashboard can be filled with realistic **demo** content so the whole design can be reviewed.

```bash
pnpm db:seed          # base rows (the eight services)
pnpm db:seed-demo     # demo projects, photos, blog posts, inquiries
```

What it adds: eight projects with covers and galleries, photos on all eight services, four blog posts with covers, and seven sample inquiries in different states. It also replaces the old "sample-*" projects and welcome post. It is safe to re-run.

The demo team, clients, testimonials, history, and certifications live in `content/*.ts` and are invented. **All names, companies, projects, figures, and certifications are made up. Replace everything with real HRSM content before launch** (`pnpm db:clear-samples` removes the old placeholder projects; delete the demo projects, posts, inquiries, and images in the admin).

The demo seed writes to whichever database `DATABASE_URL` points at. Locally that is the Neon `development` branch; the live site (Neon `main`) is unaffected unless you run it there on purpose.

## Photo credits

Photos are from [Unsplash](https://unsplash.com) and are free to use under the [Unsplash License](https://unsplash.com/license) (attribution is not required, but is given here). They are stored in the Vercel Blob store under `media/demo/`; `db/demo-assets.json` lists their addresses.

| Used for | Photographer | Source |
| --- | --- | --- |
| hero #1 | Olivier Amyot | [Unsplash](https://unsplash.com/photos/crane-and-plane-in-the-sky-at-dusk-5KGLMgOkCdE) |
| about #1 | Scott Blake | [Unsplash](https://unsplash.com/photos/seven-construction-workers-standing-on-white-field-x-ghf9LjrVg) |
| proj-riverside #1 | Luke van Zyl | [Unsplash](https://unsplash.com/photos/black-and-white-cocnrete-building-low-angle-photography-koH7IVuwRLw) |
| proj-riverside #2 | Isaac Quesada | [Unsplash](https://unsplash.com/photos/brown-and-white-concrete-building-s34TlUTPIf4) |
| proj-riverside #3 | Tobias Wilden | [Unsplash](https://unsplash.com/photos/apartment-building-reflecting-pink-sky-4453DIQWtsQ) |
| proj-riverside #4 | Wiktor Karkocha | [Unsplash](https://unsplash.com/photos/brown-and-black-house-WA2uSCbTXkI) |
| proj-meridian #1 | Christian Ladewig | [Unsplash](https://unsplash.com/photos/architectural-photography-of-glass-building-T0iFfJw-rB0) |
| proj-meridian #2 | Kenrick Baksh | [Unsplash](https://unsplash.com/photos/white-and-blue-glass-walled-building-Wm8opOd-MDE) |
| proj-meridian #3 | Patrick Tomasso | [Unsplash](https://unsplash.com/photos/low-angle-photography-curtain-wall-buildings-gMes5dNykus) |
| proj-meridian #4 | Georgi Kalaydzhiev | [Unsplash](https://unsplash.com/photos/a-very-tall-building-next-to-a-very-tall-building-CZnDfXTNYV0) |
| proj-karnaphuli #1 | Flanker Lee | [Unsplash](https://unsplash.com/photos/a-view-of-the-inside-of-a-metal-structure-1cdtE_xP2aQ) |
| proj-karnaphuli #2 | Declan Sun | [Unsplash](https://unsplash.com/photos/a-large-metal-structure-in-a-large-building-RM9Ju2fqauI) |
| proj-karnaphuli #3 | Jan Macháček | [Unsplash](https://unsplash.com/photos/abandoned-industrial-building-with-rusty-metal-structures-Db5ta-HrKMA) |
| proj-karnaphuli #4 | Spencer Gu | [Unsplash](https://unsplash.com/photos/industrial-building-with-smokestacks-under-a-cloudy-sky-Xsd1FMUi5D4) |
| proj-bypass #1 | Michael Evans | [Unsplash](https://unsplash.com/photos/yellow-and-black-heavy-equipment-on-road-during-daytime-_P-hKe5H_o4) |
| proj-bypass #2 | Joyce Wu | [Unsplash](https://unsplash.com/photos/cars-on-road-near-city-buildings-during-daytime-9Tz6W8-Pyjw) |
| proj-bypass #3 | Tom Shamberger | [Unsplash](https://unsplash.com/photos/a-couple-of-trucks-that-are-on-a-road-WRbr71MxE-c) |
| proj-lakeview #1 | Ярослав Алексеенко | [Unsplash](https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo) |
| proj-lakeview #2 | Salman Saqib | [Unsplash](https://unsplash.com/photos/a-building-with-a-pool-z6UAWpQAhXs) |
| proj-lakeview #3 | Elite prop | [Unsplash](https://unsplash.com/photos/a-car-is-parked-in-front-of-a-house-hmlP-v0vJ5o) |
| proj-heritage #1 | Nastuh Abootalebi | [Unsplash](https://unsplash.com/photos/hallway-between-glass-panel-doors-yWwob8kwOCk) |
| proj-heritage #2 | Petr | [Unsplash](https://unsplash.com/photos/office-workspace-with-rows-of-desks-Ugnm0F4e00U) |
| proj-heritage #3 | Musemind | [Unsplash](https://unsplash.com/photos/a-room-with-a-desk-and-a-chair-srTPWPbK0Dg) |
| proj-greenfield #1 | Ryan Parker | [Unsplash](https://unsplash.com/photos/white-building-seQbRNo90Xw) |
| proj-greenfield #2 | Craftsman Concrete Floors | [Unsplash](https://unsplash.com/photos/empty-industrial-warehouse-with-polished-concrete-floor-NADTQRbS0s4) |
| proj-greenfield #3 | Mathias Reding | [Unsplash](https://unsplash.com/photos/large-industrial-warehouse-with-blue-gates-and-road-J-MU2AJNKiI) |
| proj-seaview #1 | Huy Nguyen | [Unsplash](https://unsplash.com/photos/living-room-with-television-and-armchair-AB-q9lwCVv8) |
| proj-seaview #2 | dada design | [Unsplash](https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-chandelier-8aQnBInxp1s) |
| proj-seaview #3 | Aalo Lens | [Unsplash](https://unsplash.com/photos/luxurious-modern-living-room-with-large-windows-and-staircase-Ez7fz5mavj0) |
| svc-building #1 | Ricardo Gomez Angel | [Unsplash](https://unsplash.com/photos/grayscale-photography-of-piled-racks-EqUFBrTIdeE) |
| svc-civil #1 | Wolfgang Weiser | [Unsplash](https://unsplash.com/photos/crane-lifting-bridge-section-over-water-mKqFj9O9JDY) |
| svc-industrial #1 | Alex Simpson | [Unsplash](https://unsplash.com/photos/gray-and-red-factory-building-under-a-calm-blue-sky-9GwMIek9jnY) |
| svc-road #1 | Ray Donnelly | [Unsplash](https://unsplash.com/photos/a-couple-of-men-standing-on-top-of-a-road-_iBS7wyPLKE) |
| svc-interior #1 | Callum Hill | [Unsplash](https://unsplash.com/photos/a-close-up-of-a-paint-roller-on-a-paint-roller-jo4CWjIw4Wc) |
| svc-structural #1 | Alain Pham | [Unsplash](https://unsplash.com/photos/tokyo-tower-steel-girders-at-night-P_qvsF7Yodw) |
| svc-management #1 | Christian Agbede | [Unsplash](https://unsplash.com/photos/architectural-floor-plan-sketch-with-markers-5BQFKcQrciI) |
| svc-renovation #1 | Artists Eyes | [Unsplash](https://unsplash.com/photos/a-building-with-scaffolding-around-it-and-a-bicycle-sign-wrE2MS2VR9I) |
| blog-milestone #1 | Pavel Avakumov | [Unsplash](https://unsplash.com/photos/modern-skyscrapers-under-construction-with-cranes-y-puB7TgIe0) |
| blog-safety #1 | Ümit Yıldırım | [Unsplash](https://unsplash.com/photos/red-hard-hat-on-pavement-9OB46apMbC4) |
| blog-materials #1 | Etienne Girardet | [Unsplash](https://unsplash.com/photos/two-men-working-sgYamIzhAhg) |
| blog-update #1 | Jamie Street | [Unsplash](https://unsplash.com/photos/aerial-photography-of-building-construction--7ip4yX5P6Q) |
