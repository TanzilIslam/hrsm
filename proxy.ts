import { getSessionCookie } from "better-auth/cookies"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Optimistic redirect only: it checks that a session cookie exists. Real
// authorization happens on the server in requireUser()/requireRole().
// The login page is left alone; it redirects signed-in users itself, which
// avoids a loop when a cookie is present but no longer valid.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next()
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
