# 14. Deployment and Handover

**Depends on:** 13. **Estimate:** 1 day.

## Deployment

- Deploy on Vercel with a production Neon branch; accounts, domain, and database in HRSM's name.
- Environment variables set for production (database, auth secret, storage, email, analytics).
- Run migrations against production and create the Super Admin.
- Domain: HRSM provides it after our work is done, so first launch on the Vercel URL, then connect the domain with HTTPS.
- Smoke test on production: pages, login, project upload, inquiry email.

## Handover

- Admin user guide: login, projects, services, blog, inquiries, and how to request other content changes.
- Short technical README: setup, env variables, migrations, seeding, deploy.
- Replace placeholders with the real content, logo, and social links received by then; list anything still static.
- Transfer or confirm ownership of accounts (support is handover-only, so document everything).

## Tasks

- [ ] Production project, env variables, and migrations
- [ ] First Super Admin created, default credentials changed
- [ ] Domain connected with HTTPS (when provided)
- [ ] Analytics and Search Console connected
- [ ] Admin user guide and README written
- [ ] Final client walkthrough

## Done when

- The site is live and all PRD success criteria are met.
- HRSM can log in, add a project, and receive an inquiry.
