"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "A"
  )
}

export function UserMenu({ user }: { user: { name: string; email: string } }) {
  const router = useRouter()

  async function signOut() {
    const { error } = await authClient.signOut()
    if (error) {
      toast.error(error.message || "Could not sign out.")
      return
    }
    toast.success("Signed out")
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${initials(user.name)}, open user menu`}
        className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors outline-none hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-secondary"
      >
        <span
          aria-hidden
          className="grid size-8 place-items-center rounded-full bg-brand-orange text-xs font-bold text-navy"
        >
          {initials(user.name)}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/admin/account" />}>
          <UserIcon />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
