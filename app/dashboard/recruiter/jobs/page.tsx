
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getJobs } from "@/lib/api/jobs";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  TrendingUp,
  Clock,
  Mail,
  Bell,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

export interface Job {
  _id: string;
  title: string;
  department?: string;
  category?: string;
  companyName: string;
  location?: string;
  jobType: string;
  minSalary?: string | number;
  maxSalary?: string | number;
  salaryFrequency?: string;
  deadline?: string;
  status?: string;
  createdAt?: string;
}

export default async function ManageJobsPage() {
  // Fetch jobs from backend API
  const jobs: Job[] = await getJobs();

  return (
    <div className="min-h-screen w-full space-y-8 bg-black px-6 py-6 text-white">
      {/* Top Navbar Section */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/60 pb-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search transactions, users, or IDs..."
            className="h-11 rounded-xl border-zinc-800 bg-zinc-950 pl-10 text-xs text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <button className="rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 transition-all hover:text-white">
            <Bell className="size-4" />
          </button>

          <button className="rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 transition-all hover:text-white">
            <HelpCircle className="size-4" />
          </button>

          <div className="flex items-center gap-2 border-l border-zinc-800 pl-2">
            <span className="text-xs font-medium text-zinc-200">
              Admin View
            </span>
            <ChevronDown className="size-3.5 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* Page Title & Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage Jobs
          </h1>
          <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
            Oversee all active listings and historical job posts across the
            platform.
          </p>
        </div>

        <Link href="/dashboard/recruiter/add-job">
          <Button className="flex h-11 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-black shadow-lg transition-all hover:bg-zinc-200">
            <Plus className="size-4" />
            <span>Create Job</span>
          </Button>
        </Link>
      </div>

      {/* Filters & Control Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              Status
            </label>

            <select className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-300 outline-none focus:ring-1 focus:ring-indigo-500 sm:w-44">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              Category
            </label>

            <select className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-300 outline-none focus:ring-1 focus:ring-indigo-500 sm:w-44">
              <option value="all">All Categories</option>
              <option value="Engineering & Tech">Engineering & Tech</option>
              <option value="Product & Design">Product & Design</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
            </select>
          </div>
        </div>

        {/* Dynamic Tab Counters */}
        <div className="flex items-center gap-1 self-start rounded-xl border border-zinc-800 bg-zinc-900 p-1 lg:self-auto">
          <button className="rounded-lg bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-white shadow">
            Active ({jobs.filter((j) => j.status !== "Closed").length})
          </button>

          <button className="rounded-lg px-4 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:text-white">
            Closed ({jobs.filter((j) => j.status === "Closed").length})
          </button>
        </div>
      </div>

      {/* Jobs Table Section */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <div className="w-full">
  <table className="w-full table-fixed border-collapse text-left">
    <thead>
      <tr className="border-b border-zinc-800/80 bg-zinc-900/40 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
        <th className="w-[20%] px-4 py-4 whitespace-nowrap">Job Title & Dept</th>
        <th className="w-[20%] px-4 py-4 whitespace-nowrap">Company & Location</th>
        <th className="w-[12%] px-4 py-4 whitespace-nowrap">Job Type</th>
        <th className="w-[16%] px-4 py-4 whitespace-nowrap">Salary Range</th>
        <th className="w-[12%] px-4 py-4 whitespace-nowrap">Deadline</th>
        <th className="w-[12%] px-4 py-4 whitespace-nowrap">Status</th>
        <th className="w-[14%] px-4 py-4 whitespace-nowrap text-right">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-zinc-800/50 text-sm">
      {jobs.length === 0 ? (
        <tr>
          <td
            colSpan={7}
            className="py-16 text-center text-xs text-zinc-500"
          >
            No jobs found in the database. Click "Create Job" to
            publish a new job.
          </td>
        </tr>
      ) : (
        jobs.map((job) => {
          // ডেডলাইনের উপর ভিত্তি করে স্ট্যাটাস নির্ধারণ (Active বা Expired)
          const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false;
          const currentStatus = job.status === "Closed" ? "Closed" : isExpired ? "Expired" : "Active";

          return (
            <tr
              key={job._id}
              className="transition-colors hover:bg-zinc-900/40"
            >
              {/* Job Title & Department */}
              <td className="px-4 py-4 truncate">
                <p className="font-semibold text-white truncate">
                  {job.title}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 truncate">
                  {job.department || job.category || "General"}
                </p>
                <p className="mt-1 text-[11px] text-zinc-600 truncate">
                  Ref: HL-{job._id.slice(-5).toUpperCase()}
                </p>
              </td>

              {/* Company & Location */}
              <td className="px-4 py-4 truncate">
                <p className="text-xs font-medium text-zinc-300 truncate">
                  {job.companyName}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 truncate">
                  {job.location || "Not specified"}
                </p>
              </td>

              {/* Job Type */}
              <td className="px-4 py-4 truncate">
                <span className="inline-block max-w-full truncate rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400">
                  {job.jobType}
                </span>
              </td>

              {/* Salary Range */}
              <td className="px-4 py-4 truncate">
                <span className="text-xs font-semibold text-emerald-400 truncate block">
                  {job.minSalary && job.maxSalary
                    ? `$${job.minSalary} - $${job.maxSalary}`
                    : job.minSalary
                    ? `$${job.minSalary}`
                    : "Negotiable"}
                </span>
                <p className="mt-1 text-[11px] text-zinc-500 truncate">
                  {job.salaryFrequency || "Monthly"}
                </p>
              </td>

              {/* Deadline */}
              <td className="px-4 py-4 text-xs text-zinc-400 truncate">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "Not set"}
              </td>

              {/* Status Badge (Deadline এর উপর ভিত্তি করে Active / Expired / Closed) */}
              <td className="px-4 py-4 whitespace-nowrap">
                {currentStatus === "Closed" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                    <span className="size-1.5 rounded-full bg-zinc-500" />
                    Closed
                  </span>
                ) : currentStatus === "Expired" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-800/50 bg-red-950/40 px-3 py-1 text-xs font-medium text-red-400">
                    <span className="size-1.5 rounded-full bg-red-500" />
                    Expired
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/50 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Active
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-2.5">
                  {/* View Details */}
                  <button
                    className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                    title="View Details"
                  >
                    <Eye className="size-4" />
                  </button>

                  {/* Update Job */}
                  <Link
                    href={`/dashboard/recruiter/edit-job/${job._id}`}
                  >
                    <button
                      className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-indigo-400 transition-all hover:bg-zinc-800 hover:text-indigo-300"
                      title="Update Job"
                    >
                      <Pencil className="size-4" />
                    </button>
                  </Link>

                  {/* Delete Job */}
                  <DeleteJobDialog job={job} />
                </div>
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</div>
      </div>

      {/* Bottom Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold tracking-wider uppercase">
              Engagement Rate
            </span>
            <TrendingUp className="size-4 text-zinc-500" />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">82.4%</h3>
            <p className="mt-1 text-xs font-medium text-emerald-400">
              +5.2% from last month
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold tracking-wider uppercase">
              Avg. Time to Fill
            </span>
            <Clock className="size-4 text-zinc-500" />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">14 Days</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Stable performance
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold tracking-wider uppercase">
              Total Applications
            </span>
            <Mail className="size-4 text-zinc-500" />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">12,840</h3>
            <p className="mt-1 text-xs font-medium text-amber-400/90">
              -2.1% across tech sectors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
