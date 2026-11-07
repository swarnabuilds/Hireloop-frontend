"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)

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
            <div className="flex items-center space-x-6 text-sm text-zinc-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider & Action Buttons */}
            <div className="flex items-center space-x-4 border-l border-zinc-700/60 pl-4">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Sign In
              </Link>
              <Button
                render={<Link href="/get-started" />}
                className="rounded-xl bg-indigo-600 p-5 font-medium text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
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
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-base text-zinc-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-3 border-t border-zinc-800 pt-6">
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="py-2 text-center font-medium text-indigo-400"
                    >
                      Sign In
                    </Link>
                    <Button
                      render={<Link href="/get-started" />}
                      onClick={() => setOpen(false)}
                      className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
                    >
                      Get Started
                    </Button>
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
