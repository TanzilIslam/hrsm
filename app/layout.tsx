import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@next/third-parties/google"

import { site } from "@/lib/site"
import { siteUrl } from "@/lib/site-url"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.fullName,
  title: {
    default: `${site.fullName} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_BD",
    title: `${site.fullName} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  // Set NEXT_PUBLIC_GSC_VERIFICATION to the Google Search Console token.
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: "#142b45",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
      </body>
    </html>
  )
}
