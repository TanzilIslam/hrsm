import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { LoginForm } from "@/components/admin/login-form"
import { LoginShowcase } from "@/components/admin/login-showcase"
import { Logo } from "@/components/site/logo"
import { getSession } from "@/lib/session"

export const metadata: Metadata = { title: "Sign in" }

export default async function LoginPage() {
  if (await getSession()) redirect("/admin")

  return (
    <main className="grid min-h-svh bg-white lg:grid-cols-2">
      <LoginShowcase />

      <section className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm space-y-8">
          <Logo className="lg:hidden" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-navy">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage the HRSM website.
            </p>
          </div>
          <LoginForm />
          <p className="text-center text-xs text-muted-foreground">
            Having trouble signing in? Contact the site administrator.
          </p>
        </div>
      </section>
    </main>
  )
}
