// Creates (or updates the role of) the first Super Admin from env variables.
// Usage: set ADMIN_EMAIL, ADMIN_PASSWORD (min 10 chars), optional ADMIN_NAME
// in .env.local, then run `pnpm db:seed-admin`. Safe to re-run; add
// `--reset-password` to set a new password for an existing admin.
import { config } from "dotenv"

config({ path: ".env.local" })

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME?.trim() || "Super Admin"

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local")
  }
  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must be at least 10 characters")
  }

  const { auth } = await import("../lib/auth")
  const ctx = await auth.$context

  const existing = await ctx.internalAdapter.findUserByEmail(email)
  if (existing) {
    await ctx.internalAdapter.updateUser(existing.user.id, {
      role: "super_admin",
    })
    // --reset-password also sets the password from ADMIN_PASSWORD.
    if (process.argv.includes("--reset-password")) {
      await ctx.internalAdapter.updatePassword(
        existing.user.id,
        await ctx.password.hash(password)
      )
      // End every existing session so the old password stops working at once.
      const sessions = await ctx.internalAdapter.listSessions(existing.user.id)
      await ctx.internalAdapter.deleteSessions(sessions.map((x) => x.token))
      console.log(`Password reset for ${email} (all sessions signed out)`)
      return
    }
    console.log(`Admin already exists: ${email} (role ensured: super_admin)`)
    return
  }

  const user = await ctx.internalAdapter.createUser(
    {
      email,
      name,
      emailVerified: true,
      role: "super_admin",
    },
    { method: "admin" }
  )
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: await ctx.password.hash(password),
  })
  console.log(`Created Super Admin: ${email}`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
