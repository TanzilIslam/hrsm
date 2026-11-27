# 8. Inquiries

Contact page, inquiry storage, email notification, and the admin inbox.

**Depends on:** 4. **Estimate:** 2 days.

## Public

- `/contact`: office address, phone, email, Google Maps embed, Facebook link (static for now), floating WhatsApp chat button (also added to the site layout; number from `lib/site.ts`).
- Inquiry form with all eight fields: full name, company, email, phone, service required, project location, estimated budget, project description.
- The "Get a Quote" header button goes to the form.
- Success and error states; no page reload needed.

## Server

- Zod validation on the server; save to `inquiries` with status `new`.
- Spam protection: honeypot field plus rate limit per IP, with a CAPTCHA only if abuse appears.
- Email notification to the admin address (provider default Resend; address from env), sent after the save so a mail failure never loses the inquiry.

## Admin

- Inbox list with status filter and search; unread highlight.
- Detail view with all fields, status change (new, read, replied, closed), delete.
- Overview card for new inquiries updates from this table.

## Tasks

- [x] Contact page layout with map and details
- [x] Floating WhatsApp button in the site layout
- [x] Form with client and server validation
- [x] Save action, honeypot, rate limit
- [x] Email notification and env variables
- [x] Admin inbox list and detail pages

## Done when

- A submitted inquiry is stored, emailed to admin, and visible in the inbox with status `new`.
- Invalid or spam submissions are rejected and nothing is emailed.
- `pnpm validate` passes.

## Status: done, except the live email send

Built and checked in the browser; `pnpm validate` passes. **The notification email is implemented but has not been sent for real**: it needs a Resend API key and a notification address, and no account or key exists yet. Until `RESEND_API_KEY` and `INQUIRY_NOTIFY_EMAIL` are set, inquiries are saved and shown in the inbox, and the server logs "no email sent".

What exists:

- Public `/contact`: office details from `lib/site.ts`, WhatsApp link, Facebook link, Google Maps embed (no API key; uses `site.contact.mapQuery`), and the inquiry form with all eight fields (service list comes from published services; budget is a range picker). A floating WhatsApp button (`components/site/whatsapp-button.tsx`) is on every public page and hides itself when `site.contact.whatsapp` is empty.
- Submit (`app/(site)/contact/actions.ts`): honeypot field (filled = silent fake success, nothing stored), Zod validation on the server, a Postgres-backed rate limit of 5 inquiries per 15 minutes per IP (`lib/rate-limit.ts`, reuses the `rate_limit` table), save with status `new`, then the email runs after the response (`after()`), so a mail failure never loses the inquiry or slows the visitor.
- Email (`lib/email.ts`): Resend HTTP API, HTML-escaped body, `reply_to` set to the visitor. Env vars (see `.env.example`): `RESEND_API_KEY`, `INQUIRY_NOTIFY_EMAIL` (comma-separated allowed), optional `INQUIRY_FROM_EMAIL`. Without a verified sending domain, Resend only delivers to the account owner's own address.
- Admin (`/admin/inquiries`, Inquiry Manager or Super Admin): status tabs, search (name, email, phone, message), highlighted unread rows, and a count badge on the sidebar item. Detail page shows every field, auto-marks a new inquiry as read when opened, lets you set Read, Replied, or Closed, offers Reply by email and Call buttons, and deletes with confirmation.

Verified: client and server validation, honeypot (no row stored), a full submission stored with every field, rate limit (5 sent, 6th refused), inbox listing and unread badge, auto mark as read (badge 5 to 4), status change appearing under the Replied tab, and delete. Test inquiries were removed afterwards.

Notes for later work:

- To finish email: create a Resend account, verify the HRSM domain, then set the three env vars locally and in Vercel (production, preview). Send one real inquiry to confirm.
- The WhatsApp number, phone, address, and map text in `lib/site.ts` are placeholders until HRSM supplies them.
- Behind a proxy the visitor IP comes from `x-forwarded-for`; on Vercel this is set automatically.
