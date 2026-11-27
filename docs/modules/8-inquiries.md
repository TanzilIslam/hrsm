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

- [ ] Contact page layout with map and details
- [ ] Floating WhatsApp button in the site layout
- [ ] Form with client and server validation
- [ ] Save action, honeypot, rate limit
- [ ] Email notification and env variables
- [ ] Admin inbox list and detail pages

## Done when

- A submitted inquiry is stored, emailed to admin, and visible in the inbox with status `new`.
- Invalid or spam submissions are rejected and nothing is emailed.
- `pnpm validate` passes.
