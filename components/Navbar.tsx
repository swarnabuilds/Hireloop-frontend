
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useSession, signOut } from "@/lib/auth-client"

// Navigation Links
const navLinks = [
  { id: 1, label: "Browse Jobs", href: "/browse-jobs" },
  { id: 2, label: "Company", href: "/company" },
  { id: 3, label: "Pricing", href: "#pricing" },
]

// Reusable MenuLinks Component
interface MenuLinksProps {
  mobile?: boolean
  onLinkClick?: () => void
}

interface User {
  id: string
  name?: string | null
  email: string
  role?: string
}

function MenuLinks({ mobile = false, onLinkClick }: MenuLinksProps) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          onClick={onLinkClick}
          className={
            mobile
              ? "text-base text-zinc-300 transition-colors hover:text-white"
              : "transition-colors duration-200 hover:text-white"
          }
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  // Get Session
  const { data: session, isPending } = useSession()
  const user = session?.user

  // User Role
 const userRole = (user as User | undefined)?.role || "seeker"

  // Dashboard URL
  const dashboardUrl = `/dashboard/${userRole}`

  // User Avatar Initial
  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"

  // Sign Out Function
  const handleSignOut = async () => {
    try {
      await signOut()

      setOpen(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between rounded-2xl bg-zinc-900/90 px-6 py-3 shadow-lg backdrop-blur-md">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Hireloop"
              width={130}
              height={36}
              priority
              className="h-auto w-28 sm:w-32"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">

            {/* Reusable Menu Links */}
            <div className="flex items-center space-x-6 text-sm text-zinc-300">
              <MenuLinks />
            </div>

            {/* Divider & Action Buttons */}
            <div className="flex items-center space-x-4 border-l border-zinc-700/60 pl-4">

              {isPending ? null : user ? (
                <>
                  {/* Dashboard Link */}
                  <Link
                    href={dashboardUrl}
                    className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>

                  {/* User Avatar & Information */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/20 text-sm font-bold text-indigo-400">
                      {userInitial}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        {user.name || "User"}
                      </span>

                      <span className="text-xs text-zinc-400">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <Button
                    onClick={handleSignOut}
                    className="rounded-xl bg-indigo-600 p-5 font-medium text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  {/* Sign In */}
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Sign In
                  </Link>

                  {/* Get Started */}
                  <Button
                    render={<Link href="/get-started" />}
                    className="rounded-xl bg-indigo-600 p-5 font-medium text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
                  >
                    Get Started
                  </Button>
                </>
              )}

            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle Menu"
                    className="text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  />
                }
              >
                <Menu className="size-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-zinc-100">
                    <Image
                      src="/images/logo.png"
                      alt="Hireloop"
                      width={110}
                      height={30}
                      className="h-auto w-28"
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col space-y-6 px-4">

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    <MenuLinks
                      mobile
                      onLinkClick={() => setOpen(false)}
                    />
                  </div>

                  {/* Mobile Authentication */}
                  <div className="flex flex-col space-y-3 border-t border-zinc-800 pt-6">

                    {isPending ? null : user ? (
                      <>
                        {/* Mobile Dashboard Link */}
                        <Link
                          href={dashboardUrl}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
                        >
                          <LayoutDashboard className="size-5" />
                          Dashboard
                        </Link>

                        {/* Mobile User Information */}
                        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/20 text-sm font-bold text-indigo-400">
                            {userInitial}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">
                              {user.name || "User"}
                            </p>

                            <p className="truncate text-xs text-zinc-400">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* Mobile Sign Out */}
                        <Button
                          onClick={handleSignOut}
                          className="w-full rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
                        >
                          <LogOut className="mr-2 size-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Mobile Sign In */}
                        <Link
                          href="/signin"
                          onClick={() => setOpen(false)}
                          className="py-2 text-center font-medium text-indigo-400"
                        >
                          Sign In
                        </Link>

                        {/* Mobile Get Started */}
                        <Button
                          render={<Link href="/get-started" />}
                          onClick={() => setOpen(false)}
                          className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
                        >
                          Get Started
                        </Button>
                      </>
                    )}

                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </div>
    </header>
  )
}
