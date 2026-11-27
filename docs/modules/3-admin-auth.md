# 3. Admin Auth

Secure login for the dashboard. Launch with a single Super Admin; keep the model ready for more roles.

**Depends on:** 2. **Estimate:** 2 days.

## Scope

- Email + password login at `/admin/login`; logout.
- Password hashing (argon2 or bcrypt), secure httpOnly session cookies, session expiry.
- Route protection for everything under `/admin` and for admin-only server actions, checked on the server (not only middleware/proxy).
- A permission helper (`requireRole`) that already understands the four roles, but only `super_admin` is created at launch.
- Seed script to create the first Super Admin from env variables.
- Login rate limiting and generic error messages (no "email not found").
- Change-password screen for the logged-in admin.

## Tasks

- [x] Choose the auth approach (see decisions in the modules README) and install it
- [x] Login page, logout action, session handling
- [x] `requireUser` / `requireRole` server helpers used by every admin action
- [x] Protect `/admin/**` layout
- [x] `pnpm db:seed-admin` script reading `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [x] Rate limit login attempts
- [x] Change password

## Done when

- Unauthenticated requests to `/admin` and admin actions are rejected.
- A wrong password never reveals whether the email exists.
- Passwords are never stored or logged in plain text.
- `pnpm validate` passes.

## Later

Adding Editor, Project Manager, and Inquiry Manager means a user-management screen plus role checks on each module's actions.

## Status: done

Built with Better Auth (Drizzle adapter). Checked in the browser; `pnpm validate` passes.

What exists:

- `lib/auth.ts`: Better Auth config. Email + password only, sign-up disabled, 10 character minimum, 7 day sessions, database-backed rate limits (5 sign-in or password-change attempts per minute per IP), `nextCookies()` plugin last. The `role` field is server-set only (`input: false`).
- `lib/session.ts`: `getSession` (cached per request), `requireUser()`, `requireRole(...roles)` (super_admin always passes; a failed check redirects to `/admin?forbidden=1`). Call one of these first in every admin page, layout, and server action.
- `proxy.ts`: optimistic redirect to `/admin/login` when there is no session cookie. It does not authorize anything, and it leaves the login page alone so a stale cookie cannot cause a redirect loop.
- Routes: `/admin/login`, `/admin` (placeholder), `/admin/account` (change password; other sessions are revoked). `/api/auth/[...all]` is the Better Auth handler. Admin pages are `noindex`.
- Auth tables in `db/schema.ts`: `user` (with `role` enum, default `editor`), `session`, `account`, `verification`, `rate_limit`. Migration `0003_auth_tables`.
- `pnpm db:seed-admin` creates or re-asserts the Super Admin from `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` in `.env.local`. `.env.example` lists every variable.

Verified: wrong password and unknown email show the same message; the 4th rapid attempt returns 429; `/api/auth/sign-up/email` is rejected; sign-out ends access to `/admin`; a bogus session cookie redirects to login without looping.

Form pattern (reuse in every admin and public form):

- Lay forms out with `Form` / `FormField` / `fieldA11y` (`components/ui/form.tsx`): consistent gap-5 between fields, gap-2 within a field.
- Validate with a Zod schema (`lib/validation/auth.ts` holds the login and change-password ones) and show the first message for each field under it with `<FieldError>`, plus `aria-invalid` and `aria-describedby` on the input. Every input has a placeholder.
- Report API and server responses with a global toast (`toast.success` / `toast.error` from `sonner`; `<Toaster />` is mounted once in the root layout). Show the API's own `error.message` with a fallback.
- Password fields use `<PasswordInput>` (eye icon show/hide toggle).

Notes for later modules:

- Production needs `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (the real site URL) set, then `pnpm db:seed-admin` run against the production database. Change the seeded password after first login.
- The password in `.env.local` is a development value. Use a strong, different one in production.
- Adding Editor, Project Manager, and Inquiry Manager later means a user-management screen plus `requireRole` calls in each module's actions. No schema change is needed.
- The `/admin` shell in `app/admin/(protected)/layout.tsx` is temporary; module 4 replaces it.
