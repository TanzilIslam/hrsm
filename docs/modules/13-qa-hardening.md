# 13. QA and Hardening

**Depends on:** all earlier modules. **Estimate:** 2 days.

## Checklist

**Security**

- [x] Every admin page and action enforces auth and role on the server
- [x] All inputs validated with Zod; no raw SQL; rendered content sanitized (XSS)
- [x] Upload type and size limits verified
- [x] Security headers (CSP, HSTS, frame, referrer, content-type) configured
- [x] No secrets in the repo; `.env*` ignored; production env variables listed in the handover doc
- [x] Rate limits on login and inquiry form tested

**Quality**

- [x] Responsive check at phone, tablet, desktop on every page
- [ ] Browsers: current Chrome, Firefox, Safari, Edge (only Chromium was tested here; check the others before launch)
- [x] Accessibility: keyboard navigation, focus states, contrast, labels, alt text, reduced motion (WCAG)
- [x] Performance: Lighthouse on home, projects, project detail, blog; images sized and lazy-loaded
- [x] 404, error, and empty states reviewed
- [ ] Full inquiry flow tested end to end with a real email (saving and the inbox work; the email needs a Resend key, see module 8)

**Data**

- [x] Neon backups and restore option confirmed (point-in-time restore window)
- [ ] Seed/sample data removed or replaced before launch (run `pnpm db:clear-samples`, see below)

## Done when

- Checklist complete and `pnpm validate` passes.

## Status: done, with three open items

Checks were run against a production build (`next build` + `next start`) and the dev server. `pnpm validate` passes.

### Security

- Headers on every response (`next.config.ts`): Content-Security-Policy, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, and Strict-Transport-Security in production; `X-Powered-By` removed. The CSP allows only this site, Vercel Blob images, Google Analytics, and the Google Maps embed (plus `https:` images because blog articles can embed pictures). It keeps `'unsafe-inline'` for scripts and styles because Next.js needs it for hydration data. Verified: home, contact (map), and every admin page load and hydrate under the policy with no violations.
- Dependencies: `pnpm audit` found a high-severity `zod` and a moderate `esbuild` issue inside other packages; both are patched with `overrides` in `pnpm-workspace.yaml`. `pnpm audit` now reports none. Re-run it before launch.
- Secrets: git history scanned for connection strings, tokens, and keys; none found. `.env*` is ignored and `.env.example` lists every variable.
- Authorization: every admin server action and API route checks the user and role on the server (verified by reading each `actions.ts` and by the 401 checks in modules 3 and 5). The only public action is the contact form, which validates, rate limits, and has a bot trap.
- Upload limits, login rate limit, and inquiry rate limit were tested in earlier modules.

### Quality

- Lighthouse (mobile, production build): performance 92 to 96, accessibility 100, best practices 96 to 100, SEO 100 on home, about, service detail, projects, project detail, blog, post, contact, and team. LCP is about 3 seconds in Lighthouse's throttled mobile simulation, CLS 0, TBT under 70 ms.
- Fixes made from the audit: darker orange for text on light backgrounds (`text-brand-orange-text`, contrast 5.3:1 or better; the bright orange is for backgrounds and icons), logo link and link text labels, heading order on the project and blog lists, hero poster served as an optimized priority image while the video starts only after the page is idle (home performance went from 71 to 92), and `htmlLimitedBots` so page metadata is always in the head.
- Accessibility: axe-core (WCAG 2.0/2.1 A and AA) found no violations on all main admin pages in the production build after fixing the user menu label.
- Responsive: no horizontal overflow at 375 px on every public page and the main admin pages.
- Error, 404, and empty states were reviewed in earlier modules.

### Data

- Neon backups: this project is on the free plan, whose point-in-time restore window is only **6 hours**. Upgrade the plan for a longer window before launch if the data matters, and keep your own copy with `pnpm db:export`, which writes every content table to `backups/` (gitignored; it contains personal data and password hashes, so keep it private).
- `pnpm db:clear-samples` shows (dry run) and with `--yes` deletes the placeholder projects and the welcome post. The eight services stay (edit their text), and sample images are deleted in Admin, Media.

### Open items before launch

1. Test in Firefox, Safari, and Edge (and on a real phone).
2. Send one real inquiry through the contact form once the Resend key is set.
3. Run `pnpm db:clear-samples --yes` and replace placeholder content (see the "everything is placeholder" lists in modules 10 and 11).
