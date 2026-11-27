"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Background video that fades in over the poster image once it plays.
// The poster (a normal optimized image rendered by the page) paints first, and
// the video only starts after the page is idle, so it never delays the first
// paint. It is skipped for visitors who prefer reduced motion or have Data
// Saver or a slow connection on.
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

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
    if (reduced.matches || constrained) return

    const start = () => {
      video.src = src
      video.play().catch(() => {
        // Autoplay blocked: the poster image stays visible.
      })
    }
    // Safari has no requestIdleCallback, so fall back to a short timeout.
    const hasIdle = typeof window.requestIdleCallback === "function"
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1500)
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [src])

  return (
    <video
      ref={ref}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-700",
        playing ? "opacity-100" : "opacity-0"
      )}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    />
  )
}
