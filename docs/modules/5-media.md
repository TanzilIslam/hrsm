# 5. Media

Image upload and storage used by services, projects, and blog posts.

**Depends on:** 4. **Estimate:** 1 day.

## Scope

- Storage provider: Vercel Blob (decided).
- Upload endpoint/action restricted to logged-in admins.
- Validation: allowed types (JPEG, PNG, WebP), max size, generated file names; never trust the client file name or MIME type alone.
- `media` table records each upload; alt text is required for accessibility and SEO.
- Reusable `ImageUploader` (single and multiple, with preview and reorder) and a media picker.
- Delete removes both the record and the stored file.
- Images served through `next/image` with sensible sizes; remote host allowed in `next.config.ts`.

## Tasks

- [x] Set up the storage provider and env variables
- [x] Secure upload action with Zod and type/size checks
- [x] `ImageUploader` component with alt text
- [x] Delete flow
- [x] Configure `next/image` remote patterns

## Done when

- An admin can upload, preview, reorder, and delete images.
- Non-images, oversized files, and unauthenticated uploads are rejected.
- `pnpm validate` passes.

## Status: done

Built and checked in the browser against a real Vercel Blob store; `pnpm validate` passes.

What exists:

- Storage: Vercel Blob store `hrsm-media` (public, region bom1), connected to the Vercel project `hrsm` for production, preview, and development with a read-write token (`BLOB_READ_WRITE_TOKEN`, also in `.env.local`). The project is linked locally (`.vercel/`, gitignored). Deleting the store must be done interactively by a person.
- `lib/storage.ts` (`storeImage`, `deleteStoredFile`): checks size (4 MB, under Vercel's 4.5 MB request cap) and the real file type from the first bytes (JPEG, PNG, WebP only; SVG and fake extensions are rejected), and stores under a random `media/<year>/<uuid>.<ext>` key. The client's file name and MIME type are never trusted.
- API (admin only, 401 when signed out): `GET /api/admin/media` (list), `POST /api/admin/media` (upload with a required 3 to 200 character alt text; the stored file is removed if saving the record fails), `DELETE /api/admin/media/[id]`. Delete is blocked with a 409 while a service, project, project image, or post still uses the URL (`lib/media.ts`).
- UI: `/admin/media` library (toolbar with image count and an Upload button that opens a dialog with the preview form, a full-width responsive image grid with an eye link that opens the image in a new tab and a delete button, and the confirm-delete dialog), `ImageUploader` (single or multiple, reorder, remove, first image is the cover) and `MediaPicker` (choose from the library or upload and pick). Both live in `components/admin/media/`. Use them in the service, project, and post forms:

```tsx
<ImageUploader multiple value={images} onChange={setImages} />
```

- `ConfirmDialog` (`components/ui/confirm-dialog.tsx`) is the shared confirm-delete dialog for later modules. `next.config.ts` allows `*.public.blob.vercel-storage.com` for `next/image`.
- Admin nav has a Media entry (ready).

Verified: unsigned upload 401; missing or short alt 400; fake PNG, SVG, and 5 MB files rejected; two real uploads stored; UI upload with preview; delete removes both the record and the stored file; an image used by a service cannot be deleted; picker, single and multiple selection, reorder, and remove work.

Notes for later modules:

- Image fields store the plain URL (and alt) in their own columns. When a form saves an image, store both the URL and the alt text.
- Removing an image from a field only detaches it. Deleting from the library is what frees storage.
- Uploads go through the server (4 MB limit). If larger images are ever needed, switch to Vercel Blob client uploads.
- The sample media rows created while testing (two gradient images) can be deleted from `/admin/media`.
