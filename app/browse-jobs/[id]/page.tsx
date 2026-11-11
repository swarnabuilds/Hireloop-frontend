import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Bookmark, 
  CheckCircle2, 
  Building2, 
  Calendar
} from "lucide-react";
import { getJobById } from "@/lib/actions/jobs";
import ApplyButton from "@/app/components/ApplyButton";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // নির্দিষ্ট আইডি দিয়ে জব ডাটা ফেচ করা
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Job Not Found</h2>
        <Link href="/browse-jobs" className="text-blue-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white bg-[#1e293b]/60 hover:bg-[#1e293b] border border-slate-800 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="bg-[#1e293b] border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-400 shadow-inner uppercase shrink-0">
              {job.companyName ? job.companyName.charAt(0) : "H"}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
                <span className="font-medium text-slate-300">{job.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> {job.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="p-3 bg-[#0f172a] border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-xl transition cursor-pointer">
              <Bookmark className="w-5 h-5" />
            </button>
            
            {/* 👈 এখানে ApplyButton কম্পোনেন্টটি পাস করে দেওয়া হলো, যা নিজেই useSession দিয়ে লগইন চেক করবে */}
            <ApplyButton 
  jobId={job._id} 
  jobTitle={job.title} 
  companyName={job.companyName} 
/>
          </div>
        </div>

        {/* Quick Info Grid Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1e293b] border border-slate-800 p-5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-blue-400" /> Salary
            </div>
            <div className="text-lg font-bold text-slate-100 truncate">
              {job.minSalary && job.maxSalary 
                ? `$${job.minSalary}k - $${job.maxSalary}k ${job.salaryFrequency ? `/${job.salaryFrequency}` : ""}` 
                : "Negotiable"}
            </div>
          </div>

          <div className="bg-[#1e293b] border border-slate-800 p-5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-400" /> Location
            </div>
            <div className="text-lg font-bold text-slate-100 truncate">
              {job.location} {job.isRemote && "(Remote)"}
            </div>
          </div>

          <div className="bg-[#1e293b] border border-slate-800 p-5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-blue-400" /> Job Type
            </div>
            <div className="text-lg font-bold text-slate-100">
              {job.jobType || "Full-time"}
            </div>
          </div>

          <div className="bg-[#1e293b] border border-slate-800 p-5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-blue-400" /> Deadline
            </div>
            <div className="text-lg font-bold text-slate-100 truncate">
              {job.deadline || "Open"}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Responsibilities & Qualifications */}
          <div className="lg:col-span-2 space-y-8 bg-[#1e293b] border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
            
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
                Key Responsibilities
              </h2>
              <div className="text-slate-300 leading-relaxed text-sm md:text-base">
                {Array.isArray(job.responsibilities) ? (
                  <ul className="list-disc list-inside space-y-2">
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{job.responsibilities || "No responsibilities listed."}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
                Qualifications & Requirements
              </h2>
              <div className="text-slate-300 leading-relaxed text-sm md:text-base">
                {Array.isArray(job.qualifications) ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.qualifications.map((item: string, index: number) => (
                      <span key={index} className="bg-[#0f172a] border border-slate-700 text-slate-300 px-3.5 py-1.5 rounded-lg text-xs font-medium">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>{job.qualifications || "No qualifications listed."}</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Side: Company Overview */}
          <div className="lg:col-span-1 bg-[#1e293b] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" /> Company Overview
            </h3>

            <div className="w-full h-36 bg-gradient-to-br from-blue-950/60 to-[#0f172a] border border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-300 gap-2 p-4 text-center shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xl font-bold text-blue-400 uppercase">
                {job.companyName ? job.companyName.charAt(0) : "C"}
              </div>
              <span className="text-base font-bold text-slate-100 tracking-wide">{job.companyName}</span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400">Category</span>
                <span className="font-semibold text-slate-200">{job.category}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400">Location</span>
                <span className="font-semibold text-slate-200">{job.location}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400">Application Deadline</span>
                <span className="font-semibold text-slate-200">{job.deadline || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-slate-400">Workplace</span>
                <span className="font-semibold text-slate-200">{job.isRemote ? "Remote" : "On-site"}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}