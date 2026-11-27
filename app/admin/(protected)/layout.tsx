import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserMenu } from "@/components/admin/user-menu"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { requireUser } from "@/lib/session"

// Sidebar colors are scoped to the admin area: navy surface, orange accents.
const sidebarTheme = {
  "--sidebar": "transparent",
  "--sidebar-foreground": "#ffffff",
  "--sidebar-accent": "rgb(255 255 255 / 0.1)",
  "--sidebar-accent-foreground": "#ffffff",
  "--sidebar-primary": "#f28c28",
  "--sidebar-primary-foreground": "#142b45",
  "--sidebar-border": "rgb(255 255 255 / 0.1)",
  "--sidebar-ring": "#f28c28",
} as React.CSSProperties

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <TooltipProvider>
      <SidebarProvider style={sidebarTheme}>
        <AdminSidebar />
        <SidebarInset className="bg-secondary">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-white/90 px-4 backdrop-blur">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div className="ml-auto">
              <UserMenu user={{ name: user.name, email: user.email }} />
            </div>
          </header>
          <main className="w-full flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
