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

      <SidebarHeader className="h-16 justify-center px-4">
        <Logo
          light
          className="[&>span:last-child]:group-data-[collapsible=icon]:hidden"
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
                        className="opacity-50"
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
