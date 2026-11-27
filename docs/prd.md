# HRSM Construction Company Website — PRD

Version 1.1 (draft). Updated with the client's answers (2026-11-27). All questions are resolved; items HRSM will supply later are listed in [questions.md](./questions.md).

The build order is in [modules/README.md](./modules/README.md).

## Decisions so far

| Area | Decision |
| ---- | -------- |
| Company type | All types of construction and engineering (residential, commercial, industrial, roads) |
| Services | All eight proposed services |
| Language | English only (Bangla is future work) |
| Style | Premium corporate |
| Colors / logo | From HRSM's logo; HRSM will provide it later. Draft navy/orange palette and a text logo are used until then |
| Hero | Background video (HRSM to supply the video file) |
| Admin dashboard | Smaller dashboard: projects, services, inquiries, blog, users. Team, clients, testimonials, page text, SEO and settings are updated by us on request |
| Roles | Start with Super Admin only; Editor, Project Manager, and Inquiry Manager roles are added later |
| Inquiries | One contact form; saved in the dashboard and emailed to admin (no WhatsApp message alerts) |
| Contact form | All 8 fields |
| Blog | Yes, posted regularly |
| Projects | Full detail pages; upcoming projects shown publicly |
| WhatsApp on site | Floating WhatsApp chat button on all pages (number to be supplied) |
| Content | All content, photos, and testimonials supplied before design starts; statistics use placeholders until real numbers arrive |
| Offices | One head office |
| Domain and accounts | HRSM owns the domain and creates and shares the accounts |
| Analytics | Google Analytics and Search Console under an HRSM account |
| Legal | We draft a basic privacy policy and terms |
| Support | Handover and user guide only |
| Approvals | Feedback turnaround varies |

**Static for now:** statistics, certifications, SEO keywords, and social links use placeholder content until HRSM supplies real details.

## 1. Overview

HRSM is a construction company in Bangladesh. It needs a modern, professional corporate website that builds trust, showcases completed and ongoing work, and turns visitors into project inquiries. HRSM staff manage projects, services, and inquiries through a secure admin dashboard; other content is updated by the developer on request.

|          |                                                      |
| -------- | ---------------------------------------------------- |
| Type     | Corporate website + admin dashboard (CMS)            |
| Industry | Construction, engineering, real estate development   |
| Market   | Bangladesh                                           |
| Platform | Responsive web (desktop, tablet, mobile)             |

## 2. Goals

1. Establish a strong online brand for HRSM.
2. Present services, experience, and achievements.
3. Showcase completed, ongoing, and upcoming projects.
4. Collect project inquiries from prospective clients and partners.
5. Let HRSM staff update all content without a developer.
6. Leave room to add services, features, and languages later.

**Success criteria:** the site is live on a production server; every page works on mobile and desktop; staff can add projects, services, and posts from the dashboard; inquiries are saved and notified; basic SEO and security requirements are met.

## 3. Target audience

Residential and real estate developers, commercial and industrial property owners, government and private organizations, architects and engineers, individual property owners, corporate clients.

## 4. Public website

**Sitemap:** Home · About Us · Services (+ detail pages) · Projects (+ detail pages) · Our Team · Clients & Partners · News & Blog (+ post pages) · Contact Us

### 4.1 Home

Sections, in order:

1. **Header** — logo, navigation, "Get a Quote" button.
2. **Hero** — full-width background video (supplied by HRSM; poster image as fallback), headline (draft: "Building The Future With Excellence"), short intro, buttons: Explore Projects, Get a Quote.
3. **About HRSM** — short overview, experience, Learn More.
4. **Services** — cards with icon, image, short description; View All Services.
5. **Featured projects** — completed, ongoing, upcoming.
6. **Why choose HRSM** — quality, experienced team, modern technology, on-time delivery, safety and reliability.
7. **Statistics** — years of experience, completed projects, ongoing projects, happy clients.
8. **Testimonials**
9. **Call to action** — "Let's Build Something Great Together" → Contact Us.
10. **Footer** — company info, quick links, services, contact details, social links, copyright.

### 4.2 About Us

Introduction, history, mission and vision, core values, leadership, strengths, certifications and achievements.

### 4.3 Services

Proposed services (each has its own detail page):

| Service                | Scope                                  |
| ---------------------- | -------------------------------------- |
| Building Construction  | Residential and commercial buildings   |
| Civil Engineering      | Civil construction and engineering     |
| Industrial Construction| Factories and industrial buildings     |
| Road Construction      | Roads and infrastructure               |
| Interior & Exterior    | Interior and exterior solutions        |
| Structural Engineering | Structural design and engineering      |
| Project Management     | Construction project management        |
| Renovation             | Building renovation and remodeling     |

This list is a proposal; HRSM must confirm it.

### 4.4 Projects

- Filter by status: All, Completed, Ongoing, Upcoming. Search by name.
- Fields: name, location, type, description, images, status, start date, completion date, details.
- Project detail page with image gallery.

### 4.5 Our Team

Groups: management (Chairman, Managing Director, Project Director), Chief Engineer, architects, civil engineers, project managers, technical team. Each member: photo, name, designation, short bio.

### 4.6 Clients & Partners

Client logos, business and corporate partners, client testimonials.

### 4.7 News & Blog

Company news, industry updates, project updates, articles. Listing page and post detail page.

### 4.8 Contact Us

- Office address, phone, email, Google Maps location, Facebook link (static placeholder for now; LinkedIn later), floating WhatsApp chat button.
- **Inquiry form:** full name, company name, email, phone, service required, project location, estimated budget, project description.
- On submit: validate, store in the database, email an admin notification, show in the dashboard inbox.

## 5. Admin dashboard

Secure and role-based. **Scope (decided): smaller dashboard.** In scope: projects, services, inquiries, blog, and users. The other modules below are edited by the developer on request or added later. Overview cards: total, completed, and ongoing projects; total and new inquiries; services; blog posts.

| Module                 | Capability (in scope: Projects, Services, Inquiries, Blog, Users) |
| ---------------------- | --------------------------------------------------- |
| Projects               | Add, edit, delete, set status, manage images        |
| Services               | Manage services and detail content                  |
| Team                   | Manage members                                      |
| Clients & testimonials | Manage logos and testimonials                       |
| Blog                   | Create, edit, publish posts                         |
| Inquiries              | View, set status, filter                            |
| Website content        | Edit homepage/about text, statistics, contact info  |
| SEO                    | Meta title and description per page                 |
| Users & roles          | Manage admin users                                  |
| Settings               | General site settings                               |

**Roles:** launch with Super Admin only (full access). The data model supports adding Editor (content), Project Manager (projects), and Inquiry Manager (inquiries) later.

## 6. Design

- Style: premium, modern, clean, corporate (to be confirmed).
- Draft palette: Navy `#142B45`, Construction Orange `#F28C28`, White `#FFFFFF`, Light Gray `#F3F5F7`, Dark Gray `#202A35`.
- Professional typography, high-quality construction photography, smooth scrolling, restrained animation, consistent spacing, premium project cards, clear CTAs, fast loading.
- The client shared reference sites; final direction is set once the style questions are answered.

## 7. Non-functional requirements

- **Performance:** fast load, optimized images.
- **SEO:** meta tags, XML sitemap, robots.txt, schema markup, image alt text, canonical URLs, Google Analytics and Search Console.
- **Security:** HTTPS, hashed passwords, role-based access, form validation, spam protection, SQL injection and XSS protection, secure file upload, regular database backups.
- **Accessibility:** follow WCAG guidelines.
- **Compatibility:** responsive; current Chrome, Firefox, Safari, Edge.
- **Scalability:** easy to add features and languages later.

## 8. Technology (our decision)

Next.js, TypeScript, shadcn/ui with Tailwind CSS, Zod, Neon (Postgres) with Drizzle. The client's draft mentioned Prisma and WordPress; we are not using them.

## 9. Timeline (estimate: 28 days)

| Phase | Work                     | Days |
| ----- | ------------------------ | ---- |
| 1     | Requirement analysis     | 2    |
| 2     | UI/UX design             | 4    |
| 3     | Frontend                 | 7    |
| 4     | Backend                  | 7    |
| 5     | Admin dashboard          | 4    |
| 6     | Testing and optimization | 3    |
| 7     | Deployment               | 1    |

Depends on how quickly HRSM supplies content (text, photos, logos, hero video) English-only, the smaller dashboard, and a single launch role should shorten phases 3 and 5; the estimate and deadline are set on our side.

## 10. Deliverables

Responsive corporate website, UI/UX design, admin dashboard, dynamic project and service management, inquiry management, SEO-ready site, database and API, deployment, admin user guide.

## 11. Future enhancements (out of scope)

Online quotation system, client portal, project progress tracking, online payments, tender and job circulars, career applications, cost estimation tool. Bangla/English multi-language is future work (client chose English only).
