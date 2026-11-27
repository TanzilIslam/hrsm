"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { AdminBackdrop } from "@/components/admin/admin-backdrop"
import { Logo } from "@/components/site/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { adminNav } from "@/lib/admin-nav"

// Shared look for nav buttons: roomy targets, orange tint for the active page.
const navButton =
  "h-10 gap-3 rounded-lg px-3 text-white/70 hover:bg-white/8 hover:text-white data-active:bg-brand-orange/15 data-active:font-semibold data-active:text-brand-orange [&>svg]:size-[18px] group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden"

export function AdminSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Sidebar collapsible="icon" className="border-white/10">
      <AdminBackdrop glow={false} />

      <SidebarHeader className="h-16 justify-center border-b border-white/10 px-4 group-data-[collapsible=icon]:px-0">
        <Logo
          light
          className="group-data-[collapsible=icon]:justify-center [&>span:last-child]:group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/50">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.ready ? (
                    <SidebarMenuButton
                      className={navButton}
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                      render={
                        <Link
                          href={item.href}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  ) : (
                    <>
                      <SidebarMenuButton
                        disabled
                        tooltip={`${item.label} (coming soon)`}
                        className={`${navButton} opacity-45`}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge className="text-[10px] tracking-wide text-white/60 uppercase">
                        Soon
                      </SidebarMenuBadge>
                    </>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
