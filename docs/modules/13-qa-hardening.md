# 13. QA and Hardening

**Depends on:** all earlier modules. **Estimate:** 2 days.

## Checklist

**Security**

- [ ] Every admin page and action enforces auth and role on the server
- [ ] All inputs validated with Zod; no raw SQL; rendered content sanitized (XSS)
- [ ] Upload type and size limits verified
- [ ] Security headers (CSP, HSTS, frame, referrer, content-type) configured
- [ ] No secrets in the repo; `.env*` ignored; production env variables listed in the handover doc
- [ ] Rate limits on login and inquiry form tested

**Quality**

- [ ] Responsive check at phone, tablet, desktop on every page
- [ ] Browsers: current Chrome, Firefox, Safari, Edge
- [ ] Accessibility: keyboard navigation, focus states, contrast, labels, alt text, reduced motion (WCAG)
- [ ] Performance: Lighthouse on home, projects, project detail, blog; images sized and lazy-loaded
- [ ] 404, error, and empty states reviewed
- [ ] Full inquiry flow tested end to end with a real email

**Data**

- [ ] Neon backups and restore option confirmed (point-in-time restore window)
- [ ] Seed/sample data removed or replaced before launch

## Done when

- Checklist complete and `pnpm validate` passes.
