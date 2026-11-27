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

- [ ] Choose the auth approach (see decisions in the modules README) and install it
- [ ] Login page, logout action, session handling
- [ ] `requireUser` / `requireRole` server helpers used by every admin action
- [ ] Protect `/admin/**` layout
- [ ] `pnpm db:seed-admin` script reading `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- [ ] Rate limit login attempts
- [ ] Change password

## Done when

- Unauthenticated requests to `/admin` and admin actions are rejected.
- A wrong password never reveals whether the email exists.
- Passwords are never stored or logged in plain text.
- `pnpm validate` passes.

## Later

Adding Editor, Project Manager, and Inquiry Manager means a user-management screen plus role checks on each module's actions.
