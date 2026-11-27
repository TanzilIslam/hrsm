// Shape of a media record as sent to the browser (dates are ISO strings).
export type MediaItem = {
  id: number
  url: string
  alt: string
  fileName: string
  size: number
  contentType: string
  createdAt: string
}

// Value stored by image fields: a URL plus its alt text.
export type ImageValue = { url: string; alt: string }

export const MAX_IMAGE_MB = 4
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
