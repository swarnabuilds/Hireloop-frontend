"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client"; 
import { getUserApplications } from "@/lib/actions/application"; 

export default function SeekerApplicationsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadApplications() {
      if (!session?.user?.id) return;

      setLoading(true);
      const result = await getUserApplications(session.user.id);
      
      if (result.success) {
        setApplications(result.data);
      }
      setLoading(false);
    }

    if (session?.user?.id) {
      loadApplications();
    }
  }, [session]);

  // সার্চ ফিল্টার লজিক
  const filteredApplications = applications.filter((app) =>
    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ডাইনামিক সাকসেস রেট ক্যালকুলেশন
  const totalApplied = applications.length;
  const successfulCount = applications.filter(
    (app) => app.status?.toLowerCase() === "shortlisted" || app.status?.toLowerCase() === "interview" || app.status?.toLowerCase() === "offered"
  ).length;
  
  const successRate = totalApplied > 0 ? Math.round((successfulCount / totalApplied) * 100) : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#0b0f19] min-h-screen text-slate-100">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-4 py-2 rounded-xl text-xs hover:bg-slate-200 transition">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Applied</p>
          <h3 className="text-3xl font-bold mt-2 text-white">{totalApplied}</h3>
        </div>
        <div className="bg-[#111827] border border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Shortlisted</p>
          <h3 className="text-3xl font-bold mt-2 text-white">
            {applications.filter(app => app.status?.toLowerCase() === "shortlisted").length}
          </h3>
        </div>
        <div className="bg-[#111827] border border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Interviews</p>
          <h3 className="text-3xl font-bold mt-2 text-white">
            {applications.filter(app => app.status?.toLowerCase() === "interview" || app.status?.toLowerCase() === "interviews").length}
          </h3>
        </div>
        <div className="bg-[#111827] border border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Success Rate</p>
          <h3 className="text-3xl font-bold mt-2 text-emerald-400">{successRate}%</h3>
        </div>
      </div>

      {/* Applications Table Section */}
      <div className="bg-[#111827] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-slate-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              <span>Loading applications...</span>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-xs">
              No job applications found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Job Title</th>
                  <th className="py-3 px-6">Company</th>
                  <th className="py-3 px-6">Applied Date</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredApplications.map((app) => {
                  const rawDate = app.createdAt || app.appliedAt || app.date;
                  const currentStatus = app.status || "Pending";
                  const statusLower = currentStatus.toLowerCase();

                  return (
                    <tr key={app._id} className="hover:bg-slate-900/40 transition">
                      <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
                          {app.jobTitle ? app.jobTitle.slice(0, 2).toUpperCase() : "JOB"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{app.jobTitle || "N/A"}</p>
                          <p className="text-[11px] text-slate-400">Full-time</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{app.companyName || "N/A"}</td>
                      
                      {/* ডেট ফরম্যাটিং */}
                      <td className="py-4 px-6 text-slate-400">
                        {rawDate ? (
                          new Date(rawDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        ) : (
                          <span>Just Now</span>
                        )}
                      </td>

                      {/* স্ট্যাটাস অনুযায়ী আকর্ষণীয় কালার ব্যাজ */}
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border shadow-sm ${
                          statusLower === "shortlisted" 
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                            : statusLower === "rejected"
                            ? "bg-red-500/15 text-red-400 border-red-500/30"
                            : statusLower === "review"
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            : statusLower === "interview" || statusLower === "interviews"
                            ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                            : statusLower === "offered"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : statusLower === "applied"
                            ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                            : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 animate-pulse" // Pending স্ট্যাটাসের জন্য একটু ইউনিক ও আই ক্যাচি কালার
                        }`}>
                          {currentStatus}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => router.push(`/dashboard/seeker/applications/${app._id}`)}
                          className="text-slate-400 hover:text-white font-medium text-xs transition cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}