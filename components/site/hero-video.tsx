"use client"

import { useEffect, useRef } from "react"

// Background video with a poster fallback. The video is skipped (poster only)
// for visitors who prefer reduced motion or have data saver / a slow
// connection on, so it never costs them bandwidth.
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection
    const constrained =
      !!conn?.saveData || ["slow-2g", "2g"].includes(conn?.effectiveType ?? "")

    if (reduced.matches || constrained) {
      video.removeAttribute("src")
      video.load()
      return
    }
    video.play().catch(() => {
      // Autoplay blocked: the poster stays visible.
    })
  }, [])

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  )
}
