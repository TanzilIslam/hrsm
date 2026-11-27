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

- [x] Production project, env variables, and migrations
- [x] First Super Admin created, default credentials changed
- [ ] Domain connected with HTTPS (waiting for HRSM to provide the domain; steps are in README.md)
- [ ] Analytics and Search Console connected (needs the real domain and an HRSM Google account; env vars are ready)
- [x] Admin user guide and README written
- [ ] Final client walkthrough (not done yet)

## Done when

- The site is live and all PRD success criteria are met.
- HRSM can log in, add a project, and receive an inquiry.

## Status: deployed, handover items open

The site is live at **https://hrsm-mu.vercel.app** (Vercel project `hrsm`, production). `pnpm validate` passes and the commits for modules 6 to 14 are on local `main` (push them to GitHub to keep the repository in sync with what is deployed; pushing also triggers an automatic production deploy).

What was done:

- Neon: `main` is now **production** and a new `development` branch (a copy) is used locally, so local work can no longer touch live data. `.env.local` points at `development`. Migrations 0000 to 0006 are applied to both.
- Vercel production environment variables: `DATABASE_URL` (Neon integration), `BLOB_READ_WRITE_TOKEN`, and new `BETTER_AUTH_SECRET` (a fresh secret, different from local), `BETTER_AUTH_URL`, and `NEXT_PUBLIC_SITE_URL`, both set to `https://hrsm-mu.vercel.app`.
- Production admin: the existing Super Admin `admin@hrsm.local` got a new random password (`pnpm db:seed-admin -- --reset-password`, which also signs out its old sessions). The login is saved in the local, gitignored file `.env.production.local`. It has not been used to sign in yet. **Sign in once, change the password in Admin, Account, and add a real admin email** (run `pnpm db:seed-admin` against production with the real address) before handing over.
- Deployed with `vercel deploy --prod`. Production smoke test: all 17 public pages, robots.txt, sitemap.xml, social card, and static assets return 200; `/nope` returns 404; security headers present (HSTS, CSP, X-Frame-Options); `/admin` redirects to sign in and the admin API returns 401 when signed out; a test inquiry sent through the live contact form was saved in the production database and then removed.
- Documentation: `README.md` (setup, environment variables, commands, branches, migrations, deploy, domain), `docs/admin-guide.md` and `docs/admin-guide.docx` (guide for HRSM staff).

Not verified on production: the admin login (the password was not typed into the live site), image upload, and the notification email. Check these after signing in once.

Still to do before calling the project handed over:

1. Sign in on production, change the password, add the real admin account.
2. Real domain: HRSM buys or provides it; follow "Connecting the real domain" in README.md (add in Vercel, update `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL`, redeploy, then Search Console and Analytics).
3. Resend account, verified domain, and the three email variables in Vercel; then send one real inquiry (module 8).
4. Run `pnpm db:clear-samples --yes` against production and replace the placeholder content, logo, hero video, and details listed in modules 10 and 11.
5. Upgrade the Neon plan or schedule `pnpm db:export` (free plan keeps only 6 hours of history).
6. Cross-browser check (Firefox, Safari, Edge) and a walkthrough with HRSM.
