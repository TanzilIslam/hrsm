"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// Global toast host, mounted once in the root layout. The site is light-only.
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="top-right"
      richColors
      closeButton
      className="toaster group"
      {...props}
    />
  )
}

export { Toaster }
