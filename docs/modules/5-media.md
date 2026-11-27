# 5. Media

Image upload and storage used by services, projects, and blog posts.

**Depends on:** 4. **Estimate:** 1 day.

## Scope

- Storage provider (default Vercel Blob; confirm in the modules README).
- Upload endpoint/action restricted to logged-in admins.
- Validation: allowed types (JPEG, PNG, WebP), max size, generated file names; never trust the client file name or MIME type alone.
- `media` table records each upload; alt text is required for accessibility and SEO.
- Reusable `ImageUploader` (single and multiple, with preview and reorder) and a media picker.
- Delete removes both the record and the stored file.
- Images served through `next/image` with sensible sizes; remote host allowed in `next.config.ts`.

## Tasks

- [ ] Set up the storage provider and env variables
- [ ] Secure upload action with Zod and type/size checks
- [ ] `ImageUploader` component with alt text
- [ ] Delete flow
- [ ] Configure `next/image` remote patterns

## Done when

- An admin can upload, preview, reorder, and delete images.
- Non-images, oversized files, and unauthenticated uploads are rejected.
- `pnpm validate` passes.
