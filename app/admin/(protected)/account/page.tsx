import type { Metadata } from "next"

import { ChangePasswordForm } from "@/components/admin/change-password-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { requireUser } from "@/lib/session"

export const metadata: Metadata = { title: "Account" }

export default async function AccountPage() {
  const user = await requireUser()

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Account</h1>
        <p className="text-sm text-muted-foreground">
          Signed in as {user.email}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>
            Other devices are signed out when you change it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
