# HRSM Construction Website

Corporate website and admin dashboard for HRSM, a construction company in Bangladesh.

- Product requirements: [docs/prd.md](docs/prd.md) (client version: [docs/prd-final-v1.md](docs/prd-final-v1.md))
- Build plan and per-module notes: [docs/modules/README.md](docs/modules/README.md)
- Admin user guide for HRSM staff: [docs/admin-guide.md](docs/admin-guide.md)
- Working notes for contributors and AI assistants: [CLAUDE.md](CLAUDE.md)

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Zod, Neon Postgres with Drizzle ORM, Better Auth, Vercel Blob for images. Deployed on Vercel.

## Run it locally

Requirements: Node 22 or newer and pnpm.

```bash
pnpm install
cp .env.example .env.local   # then fill it in (see below)
pnpm db:migrate              # create tables
pnpm db:seed                 # optional sample content
pnpm db:seed-admin           # create the first Super Admin
pnpm dev                     # http://localhost:3000
```

### Environment variables

All are listed with comments in [.env.example](.env.example).

| Variable | Needed for |
| --- | --- |
| `DATABASE_URL` | Neon connection string (use the pooled one) |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | Admin login. Secret: `openssl rand -base64 32`. URL: the site's own URL |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | `pnpm db:seed-admin` only (min 10 character password) |
| `BLOB_READ_WRITE_TOKEN` | Image uploads (Vercel Blob) |
| `NEXT_PUBLIC_SITE_URL` | Canonical links, sitemap, social cards |
| `RESEND_API_KEY`, `INQUIRY_NOTIFY_EMAIL`, `INQUIRY_FROM_EMAIL` | Inquiry email notifications (optional; inquiries are always saved) |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION` | Google Analytics and Search Console (optional) |

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Run, build, and serve the app |
| `pnpm validate` | Typecheck, lint, format check, and build. Run before committing |
| `pnpm db:generate` | Create a migration after editing `db/schema.ts` |
| `pnpm db:migrate` | Apply migrations to the database in `DATABASE_URL` |
| `pnpm db:studio` | Browse the database |
| `pnpm db:seed` | Load sample services, projects, and a post (safe to re-run) |
| `pnpm db:seed-demo` | Fill the database with realistic demo projects, photos, posts, and inquiries (see [docs/demo-content.md](docs/demo-content.md)) |
| `pnpm db:seed-admin` | Create a Super Admin (`-- --reset-password` resets an existing one) |
| `pnpm db:export` | Save all content to `backups/*.json` (gitignored, contains personal data) |
| `pnpm db:clear-samples` | Preview, or with `--yes` delete, the placeholder projects and post |

## Database and environments

The Neon project `hrsm` has two branches:

- `main` is **production**. The Vercel production environment points at it.
- `development` is a copy used for local work (`.env.local`).

Schema changes: edit `db/schema.ts`, run `pnpm db:generate`, test with `pnpm db:migrate` on the development branch, commit the new file in `drizzle/`, then apply it to production before or with the deploy:

```bash
neon connection-string --project-id lucky-scene-40954637 --branch main --pooled
# then, with that value as DATABASE_URL for one command:
DATABASE_URL="<main connection string>" pnpm db:migrate
```

## Deploying

The Vercel project `hrsm` is linked to the GitHub repository, so pushing to `main` deploys to production. You can also deploy by hand with `vercel deploy --prod`. The production site is https://hrsm-bd.vercel.app until a custom domain is connected.

Production environment variables (Vercel, Settings, Environment Variables): `DATABASE_URL` (from the Neon integration), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN`, plus the optional ones above when ready.

### Connecting the real domain

1. In Vercel, project Settings, Domains, add the domain and set the DNS records Vercel shows at the registrar.
2. Change `BETTER_AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the new `https://` address and redeploy. (Signing in only works on the address in `BETTER_AUTH_URL`.)
3. Add the site in Google Search Console and submit `/sitemap.xml`; set `NEXT_PUBLIC_GA_ID`.

### Launch checklist

See [docs/modules/14-deployment-handover.md](docs/modules/14-deployment-handover.md).
