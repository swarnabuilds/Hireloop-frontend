import Image from "next/image"
import Link from "next/link"
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const trending = [
  { label: "Product Designer", href: "/jobs?design=product" },
  { label: "AI Engineering", href: "/jobs?field=ai" },
  { label: "DevOps Engineer", href: "/jobs?field=devops" },
]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Heading block */}
      <div className="mx-auto max-w-7xl px-4 pt-12 text-center sm:px-6 sm:pt-20">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/80 py-1.5 pr-4 pl-2 shadow-inner backdrop-blur-md">
          <span className="flex size-6 items-center justify-center rounded-full bg-orange-600/20">
            <span aria-hidden="true" className="text-xs">
              🔥
            </span>
          </span>
          <span className="text-xs font-semibold text-white">50,000+</span>
          <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
            New Jobs This Month
          </span>
        </div>

        <h1 className="font-heading mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center"
        >
          <label className="flex h-12 flex-1 cursor-pointer items-center gap-3 rounded-xl border border-zinc-800/50 bg-zinc-950/70 px-4">
            <Search className="size-4 shrink-0 text-zinc-400" />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>
          <span
            aria-hidden="true"
            className="mx-1 hidden h-7 w-px bg-zinc-800 sm:block"
          />
          <label className="flex h-12 flex-1 cursor-pointer items-center gap-3 rounded-xl border border-zinc-800/50 bg-zinc-950/70 px-4">
            <MapPin className="size-4 shrink-0 text-zinc-400" />
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>
          <Button
            type="submit"
            aria-label="Search jobs"
            className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/40 hover:bg-indigo-500 sm:w-12 sm:px-0"
          >
            <Search className="size-5" />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs text-zinc-500">Trending Position</span>
          {trending.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Caption + Globe */}
      <div className="relative mx-auto mt-10 max-w-5xl px-4 text-center sm:mt-14">
        <p className="relative z-20 mb-12 text-lg leading-snug font-medium text-zinc-100 sm:text-2xl lg:text-3xl">
          Assisting over{" "}
          <span className="font-semibold text-white">
            15,000 job seekers
          </span>
          <br />
          find their dream positions.
        </p>

        <div className="relative flex w-full justify-center">
          {/* Star field + purple glow behind the globe */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-2/3 [background-image:radial-gradient(1.5px_1.5px_at_10%_20%,rgba(255,255,255,.6),transparent_100%),radial-gradient(1px_1px_at_30%_70%,rgba(255,255,255,.4),transparent_100%),radial-gradient(2px_2px_at_55%_15%,rgba(255,255,255,.5),transparent_100%),radial-gradient(1px_1px_at_75%_45%,rgba(255,255,255,.5),transparent_100%),radial-gradient(1.5px_1.5px_at_90%_25%,rgba(255,255,255,.45),transparent_100%),radial-gradient(1px_1px_at_45%_55%,rgba(255,255,255,.35),transparent_100%),radial-gradient(1px_1px_at_65%_80%,rgba(255,255,255,.3),transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-10 h-1/2 w-[120%] max-w-none -translate-x-1/2 rounded-[100%] bg-indigo-600/25 blur-[100px]"
          />
          <Image
            src="/images/hero-globe.png"
            alt="Globe showing Hireloop's worldwide reach"
            width={1440}
            height={1262}
            priority
            sizes="100vw"
            className="relative z-10 w-full max-w-4xl select-none object-contain opacity-90 pointer-events-none"
          />
        </div>
      </div>

      {/* Stats Cards (গ্লোব ইমেজের ওপর পজিশন করার জন্য নেগেটিভ মার্জিন দেওয়া হয়েছে) */}
      <div className="relative z-30 mx-auto -mt-16 sm:-mt-24 grid max-w-7xl grid-cols-1 gap-3 px-4 pb-16 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex h-36 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-5 shadow-2xl backdrop-blur-md sm:h-40"
          >
            <div className="flex size-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300">
              <stat.icon className="size-4" />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}