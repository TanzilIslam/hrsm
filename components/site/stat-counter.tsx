"use client"

import { useEffect, useRef } from "react"

// Shows the final number in the server HTML (so it is right without
// JavaScript), then counts up once when scrolled into view.
export function StatCounter({
  value,
  suffix = "",
}: {
  value: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    el.textContent = `0${suffix}`
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          el.textContent = `${Math.round(value * eased)}${suffix}`
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = `${value}${suffix}`
    }
  }, [value, suffix])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
