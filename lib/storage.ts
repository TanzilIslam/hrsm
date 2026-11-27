import "server-only"

import { del, put } from "@vercel/blob"

// Vercel serverless request bodies are capped at 4.5 MB, so stay below it.
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

const TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const

export type AllowedImageType = keyof typeof TYPES

// Detect the real type from the file's first bytes. The browser-supplied MIME
// type and file name are never trusted.
export function sniffImageType(bytes: Uint8Array): AllowedImageType | null {
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {
    return "image/jpeg"
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png"
  }
  if (
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  ) {
    return "image/webp"
  }
  return null
}

export class UploadError extends Error {}

export async function storeImage(file: File) {
  if (file.size === 0) throw new UploadError("The file is empty.")
  if (file.size > MAX_IMAGE_BYTES) {
    throw new UploadError("The image is larger than 4 MB.")
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  const type = sniffImageType(buffer)
  if (!type) {
    throw new UploadError("Only JPEG, PNG, and WebP images are allowed.")
  }

  const now = new Date()
  const key = `media/${now.getUTCFullYear()}/${crypto.randomUUID()}.${TYPES[type]}`
  const blob = await put(key, file, {
    access: "public",
    contentType: type,
    addRandomSuffix: false,
  })

  return { url: blob.url, storageKey: key, contentType: type, size: file.size }
}

export async function deleteStoredFile(url: string) {
  await del(url)
}
