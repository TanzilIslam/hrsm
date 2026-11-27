import { ImageResponse } from "next/og"

import { site } from "@/lib/site"

export const alt = `${site.fullName}: ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Default social sharing card: brand colors with the company name and tagline.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#142b45",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            background: "#f28c28",
            color: "#142b45",
            fontSize: 48,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          H
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>
          {site.name}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 30, color: "#f28c28" }}>
          Construction and engineering in Bangladesh
        </div>
      </div>
    </div>,
    size
  )
}
