
import { getJobById } from "@/lib/actions/jobs";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle2,
  Globe,
  Layers,
  Clock,
} from "lucide-react";

interface JobDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Backend থেকে নির্দিষ্ট Job-এর Full Data Fetch
  const job = await getJobById(id);

  if (!job || !job._id) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center text-center text-white">
        <h2 className="text-xl font-semibold text-red-400">
          Job Not Found
        </h2>

        <p className="mt-1 text-xs text-zinc-400">
          The job you are looking for does not exist or has been removed.
        </p>

        <Link
          href="/dashboard/recruiter/jobs"
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-indigo-700"
        >
          Back to Manage Jobs
        </Link>
      </div>
    );
  }

  // Status Logic
  const deadlineDate = job.deadline
    ? new Date(job.deadline)
    : null;

  if (deadlineDate && !isNaN(deadlineDate.getTime())) {
    deadlineDate.setHours(23, 59, 59, 999);
  }

  const isExpired = deadlineDate
    ? deadlineDate.getTime() < Date.now()
    : false;

  const currentStatus =
    job.status?.toLowerCase() === "closed"
      ? "Closed"
      : isExpired
        ? "Expired"
        : "Active";

  // Deadline Formatting
  const formattedDeadline =
    job.deadline && !isNaN(new Date(job.deadline).getTime())
      ? new Date(job.deadline).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "No deadline specified";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 text-white">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Manage Jobs
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Job ID: HL-{job._id.slice(-6).toUpperCase()}
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {job.title}
            </h1>

            <p className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Building2 className="size-3.5 text-zinc-500" />
              <strong className="text-zinc-200">
                {job.companyName}
              </strong>
            </p>
          </div>

          {/* Status Badge */}
          <div>
            {currentStatus === "Closed" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400">
                <span className="size-2 rounded-full bg-zinc-500" />
                Closed
              </span>
            ) : currentStatus === "Expired" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-800/50 bg-red-950/40 px-3.5 py-1.5 text-xs font-medium text-red-400">
                <span className="size-2 rounded-full bg-red-500" />
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/50 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                Active
              </span>
            )}
          </div>
        </div>

        {/* Comprehensive Info Grid */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Category */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
              <Layers className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Category
              </p>

              <p className="text-xs font-semibold text-zinc-200">
                {job.category || "General"}
              </p>
            </div>
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
              <Briefcase className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Job Type
              </p>

              <p className="text-xs font-semibold text-zinc-200">
                {job.jobType || "Full-time"}
              </p>
            </div>
          </div>

          {/* Remote Status */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
              <Globe className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Workplace Type
              </p>

              <p className="text-xs font-semibold text-zinc-200">
                {job.isRemote ? "Fully Remote" : "On-site / Office"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
              <MapPin className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Location
              </p>

              <p className="text-xs font-semibold text-zinc-200">
                {job.location || "Not specified"}
              </p>
            </div>
          </div>

          {/* Salary Range */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/60 p-2.5 text-emerald-400">
              <DollarSign className="size-4" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Salary Range
              </p>

              <p className="text-xs font-bold text-emerald-400">
                {job.minSalary && job.maxSalary
                  ? `৳${job.minSalary} - ৳${job.maxSalary}`
                  : job.minSalary
                    ? `৳${job.minSalary}`
                    : job.maxSalary
                      ? `৳${job.maxSalary}`
                      : "Negotiable"}
              </p>
            </div>
          </div>

          {/* Salary Frequency */}
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2.5 text-zinc-300">
              <Clock className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-[11px] text-zinc-500">
                Salary Frequency
              </p>

              <p className="text-xs font-semibold text-zinc-200">
                {job.salaryFrequency || "Monthly"}
              </p>
            </div>
          </div>
        </div>

        {/* Deadline Box */}
        <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/20 px-4 py-3 text-xs text-zinc-300">
          <Calendar className="size-4 text-indigo-400" />

          <span>
            Application Deadline:{" "}
            <strong className="text-white">
              {formattedDeadline}
            </strong>
          </span>
        </div>
      </div>

      {/* Responsibilities & Qualifications Sections */}
      <div className="space-y-6">
        {/* Responsibilities */}
        {job.responsibilities && (
          <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
              <FileText className="size-4" />
              Responsibilities
            </h3>

            <div className="whitespace-pre-line rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 text-xs leading-relaxed text-zinc-300">
              {job.responsibilities}
            </div>
          </div>
        )}

        {/* Qualifications */}
        {job.qualifications && (
          <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
              <CheckCircle2 className="size-4" />
              Qualifications & Requirements
            </h3>

            <div className="whitespace-pre-line rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 text-xs leading-relaxed text-zinc-300">
              {job.qualifications}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 