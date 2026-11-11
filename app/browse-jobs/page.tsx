import { getJobs } from "@/lib/api/jobs";
import { DollarSign, Briefcase, Bookmark } from "lucide-react";
import JobFilters from "../components/JobFilters";
import Link from "next/link";

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();

  //call api 
  const jobs = await getJobs(query);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* JobFilters-এর ভেতরে চিলড্রেন হিসেবে জব কাউন্ট ও কার্ডের অংশটুকু দেওয়া হলো */}
        <JobFilters>
          <div className="space-y-4">
            
            {/* Header info */}
            <div className="flex justify-between items-center pb-2">
              <h1 className="text-xl font-bold text-slate-100">
                Found <span className="text-blue-400">{jobs?.length || 0}</span> Jobs
              </h1>
            </div>

            {/* Job Cards */}
            {jobs && jobs.length > 0 ? (
              jobs.map((job: any) => (
                <div
                  key={job._id}
                  className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition flex justify-between items-start"
                >
                  <div className="space-y-3">
                    <Link href={`/browse-jobs/${job._id}`} className="block">
  <h3 className="text-lg font-semibold text-slate-100 hover:text-blue-400 transition cursor-pointer">
    {job.title}
  </h3>
</Link>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {job.minSalary && job.maxSalary && (
                        <span className="bg-[#0f172a] border border-slate-700 text-slate-300 px-3 py-1 rounded-md flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-slate-400" />
                          ${job.minSalary}k - ${job.maxSalary}k
                        </span>
                      )}

                      {job.jobType && (
                        <span className="bg-[#0f172a] border border-slate-700 text-slate-300 px-3 py-1 rounded-md flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          {job.jobType}
                        </span>
                      )}

                      {job.category && (
                        <span className="bg-blue-950/40 border border-blue-800/50 text-blue-300 px-3 py-1 rounded-md font-medium">
                          {job.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-100 p-2 rounded-lg hover:bg-[#0f172a] transition cursor-pointer">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-[#1e293b] p-10 rounded-xl border border-slate-800 text-center text-slate-400">
                No jobs found matching your criteria.
              </div>
            )}

          </div>
        </JobFilters>

      </div>
    </div>
  );
}