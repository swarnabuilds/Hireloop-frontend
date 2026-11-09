import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getJobs } from "@/lib/api/jobs"

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
  ChevronDown
} from "lucide-react"

type Job = {
  _id: string;
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  status: string;
  createdAt?: string | Date;
};

export default async function ManageJobsPage() {
  // ব্যাকএন্ড API থেকে ডাটা ফেচ করা হচ্ছে
  const jobs: Job[] = await getJobs();

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-6 space-y-8">
      
      {/* Top Navbar Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            placeholder="Search transactions, users, or IDs..."
            className="pl-10 h-11 rounded-xl border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-500 text-xs focus-visible:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <button className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
            <Bell className="size-4" />
          </button>
          <button className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
            <HelpCircle className="size-4" />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <span className="text-xs font-medium text-zinc-200">Admin View</span>
            <ChevronDown className="size-3.5 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Manage Jobs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Oversee all active listings and historical job posts across the platform.
          </p>
        </div>

        <Link href="/dashboard/recruiter/add-job">
          <Button className="h-11 rounded-xl bg-white px-5 font-semibold text-black hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg">
            <Plus className="size-4" />
            <span>Create Job</span>
          </Button>
        </Link>
      </div>

      {/* Filters & Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Status</label>
            <select className="w-full sm:w-44 h-10 px-3 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Category</label>
            <select className="w-full sm:w-44 h-10 px-3 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="all">All Categories</option>
              <option value="Engineering & Tech">Engineering & Tech</option>
              <option value="Product & Design">Product & Design</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
            </select>
          </div>
        </div>

        {/* Dynamic Tab Counters */}
        <div className="flex items-center gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800 self-start lg:self-auto">
          <button className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 text-white shadow">
            Active ({jobs.filter((j) => j.status !== "Closed").length})
          </button>
          <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-all">
            Closed ({jobs.filter((j) => j.status === "Closed").length})
          </button>
        </div>
      </div>

      {/* Jobs Table Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-900/40">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Company</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Date Posted</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-sm">
              {jobs.length === 0 ? (
                /* ডাটা না থাকলে খালি স্টেট */
                <tr>
                  <td colSpan={7} className="py-16 text-center text-zinc-500 text-xs">
                    No jobs found in the database. Click "Create Job" to publish a new job.
                  </td>
                </tr>
              ) : (
                /* API থেকে আসা ডাটা সুন্দরভাবে MAP করা হয়েছে */
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-zinc-900/40 transition-colors">
                    
                    {/* Title & Ref/ID */}
                    <td className="py-4 px-6">
                      <p className="font-semibold text-white">{job.title}</p>
                      <p className="text-[11px] text-zinc-500">
                        Ref: {job._id ? `HL-${job._id.slice(-5).toUpperCase()}` : "HL-00000"}
                      </p>
                    </td>

                    {/* Company Initial & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300 border border-zinc-700">
                          {job.companyName ? job.companyName.charAt(0).toUpperCase() : "C"}
                        </div>
                        <span className="text-xs font-medium text-zinc-300">{job.companyName}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {job.category}
                      </span>
                    </td>

                    {/* Job Type */}
                    <td className="py-4 px-6 text-xs text-zinc-400">
                      {job.jobType}
                    </td>

                    {/* Date Posted */}
                    <td className="py-4 px-6 text-xs text-zinc-400">
                      {job.createdAt 
                        ? new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
                        : "Recently"}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {job.status === "Closed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium">
                          <span className="size-1.5 rounded-full bg-zinc-500"></span>
                          Closed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-medium">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                   <td className="py-4 px-6 text-right">
  <div className="flex items-center justify-end gap-2">
    {/* View Details Button */}
    <button 
      className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-800"
      title="View Details"
    >
      <Eye className="size-4" />
    </button>
    
    {/* Update / Edit Job Button */}
    <Link href={`/dashboard/recruiter/edit-job/${job._id}`}>
      <button 
        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-indigo-400 hover:text-indigo-300 transition-all border border-zinc-800"
        title="Update Job"
      >
        <Pencil className="size-4" />
      </button>
    </Link>
  </div>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Engagement Rate</span>
            <TrendingUp className="size-4 text-zinc-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">82.4%</h3>
            <p className="text-xs text-emerald-400 mt-1 font-medium">+5.2% from last month</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg. Time to Fill</span>
            <Clock className="size-4 text-zinc-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">14 Days</h3>
            <p className="text-xs text-zinc-400 mt-1">Stable performance</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 shadow-xl sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Applications</span>
            <Mail className="size-4 text-zinc-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">12,840</h3>
            <p className="text-xs text-amber-400/90 mt-1 font-medium">-2.1% across tech sectors</p>
          </div>
        </div>
      </div>

    </div>
  )
}