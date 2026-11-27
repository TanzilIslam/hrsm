import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | HRSM Admin" },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-svh bg-secondary">{children}</div>
}
