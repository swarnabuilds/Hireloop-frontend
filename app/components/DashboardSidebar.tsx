
"use client"

import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client"

import {
  Briefcase,
  FileText,
  User,
  PlusCircle,
  Building,
  Users,
  LayoutDashboard,
  ShieldAlert,
  Loader2,
  Bookmark,
  Bell,
  Settings,
  ChartNoAxesCombined,
  Tags,
  Home,
  type LucideIcon,
} from "lucide-react"

// Menu Item Interface
interface MenuItem {
  id: number
  name: string
  url: string
  icon: LucideIcon
}

type UserRole = "seeker" | "recruiter" | "admin"

// Role Based Navigation
const menuItemByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { id: 1, name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: 2, name: "Browse Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { id: 3, name: "Applied Jobs", url: "/dashboard/seeker/applied-jobs", icon: FileText },
    { id: 4, name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: 5, name: "My Resume", url: "/dashboard/seeker/resume", icon: FileText },
    { id: 6, name: "My Profile", url: "/dashboard/seeker/profile", icon: User },
    { id: 7, name: "Notifications", url: "/dashboard/seeker/notifications", icon: Bell },
    { id: 8, name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],

  recruiter: [
    { id: 1, name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: 2, name: "Post a Job", url: "/dashboard/recruiter/post-job", icon: PlusCircle },
    { id: 3, name: "My Job Listings", url: "/dashboard/recruiter/my-jobs", icon: Briefcase },
    { id: 4, name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: 5, name: "Manage Candidates", url: "/dashboard/recruiter/candidates", icon: Users },
    { id: 6, name: "Company Profile", url: "/dashboard/recruiter/company", icon: Building },
    { id: 7, name: "Analytics", url: "/dashboard/recruiter/analytics", icon: ChartNoAxesCombined },
    { id: 8, name: "Notifications", url: "/dashboard/recruiter/notifications", icon: Bell },
    { id: 9, name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],

  admin: [
    { id: 1, name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: 2, name: "Manage Users", url: "/dashboard/admin/users", icon: Users },
    { id: 3, name: "Manage Jobs", url: "/dashboard/admin/manage-jobs", icon: Briefcase },
    { id: 4, name: "Manage Companies", url: "/dashboard/admin/companies", icon: Building },
    { id: 5, name: "Manage Applications", url: "/dashboard/admin/applications", icon: FileText },
    { id: 6, name: "Categories", url: "/dashboard/admin/categories", icon: Tags },
    { id: 7, name: "Reports & Analytics", url: "/dashboard/admin/analytics", icon: ChartNoAxesCombined },
    { id: 8, name: "System Logs", url: "/dashboard/admin/logs", icon: ShieldAlert },
    { id: 9, name: "Notifications", url: "/dashboard/admin/notifications", icon: Bell },
    { id: 10, name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession()

  const user = session?.user

  const userRole = ((user as any)?.role as UserRole) || "seeker"

  const menuItems = menuItemByRole[userRole] || menuItemByRole.seeker

  const avatarName = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"

  const menuColor =
    "text-zinc-400 hover:bg-blue-500/10 hover:text-blue-400 data-[active=true]:bg-blue-500/15 data-[active=true]:text-blue-400"

  return (
    <Sidebar className="[&_[data-sidebar=sidebar]]:bg-zinc-950 [&_[data-sidebar=sidebar]]:text-zinc-100">

      {/* Logo */}
      <SidebarHeader className="p-5 border-b border-zinc-800">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="HireLoop Logo"
            width={150}
            height={45}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <Link
          href="/"
          className="mt-3 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-blue-400"
        >
          <Home className="size-4" />
          <span>Back to Home</span>
        </Link>
      </SidebarHeader>

      {/* User Profile */}
      <div className="px-4 pt-5 pb-3">
        <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">

          <div className="absolute top-0 left-0 h-full w-1 bg-blue-500" />

          <div className="flex items-center gap-3 pl-1">

            {/* Avatar */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-lg font-bold text-white shadow-lg">
              {avatarName}
            </div>

            {/* User Information */}
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold text-white">
                {isPending ? "Loading..." : user?.name || "User"}
              </span>

              <span className="truncate text-xs text-zinc-400">
                {user?.email || "No email available"}
              </span>

              <span className="mt-1 w-fit rounded-md bg-blue-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-400">
                {userRole}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <SidebarContent className="bg-zinc-950">
        <SidebarGroup>

          <SidebarGroupLabel className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400">
            {userRole} Workspace
          </SidebarGroupLabel>

          <SidebarMenu>
            {isPending ? (
              <div className="flex items-center justify-center p-4 text-zinc-400">
                <Loader2 className="size-5 animate-spin" />
              </div>
            ) : (
              menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    className={`mb-1 h-10 rounded-lg transition-all duration-200 ${menuColor}`}
                  >
                    <item.icon className="size-[18px]" />
                    <span className="font-medium">{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>

        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center justify-between text-[10px] text-zinc-600">
          <span>© 2026 HireLoop</span>

          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-blue-500" />
            Workspace
          </span>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}
