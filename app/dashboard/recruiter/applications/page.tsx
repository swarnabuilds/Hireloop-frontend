import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  User,
  Mail,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  UserCheck,
} from "lucide-react";
import StatusSelect from "@/components/StatusSelect";
import { getApplications, Application } from "@/lib/actions/application";  

// (লোকাল getApplications ফাংশনটি এখান থেকে মুছে ফেলা হয়েছে)

// স্ট্যাটাস অনুযায়ী আলাদা রঙ এবং আইকন রিটার্ন করার হেল্পার ফাংশন
function getStatusBadge(rawStatus?: string) {
  const status = !rawStatus || rawStatus.toLowerCase() === "pending" ? "Applied" : rawStatus;

  switch (status.toLowerCase()) {
    case "in review":
      return {
        label: "In Review",
        style: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: <Clock className="size-3.5" />,
      };
    case "shortlisted":
      return {
        label: "Shortlisted",
        style: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        icon: <Sparkles className="size-3.5" />,
      };
    case "interview":
      return {
        label: "Interview",
        style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        icon: <UserCheck className="size-3.5" />,
      };
    case "hired":
    case "accepted":
      return {
        label: "Hired",
        style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: <CheckCircle2 className="size-3.5" />,
      };
    case "rejected":
      return {
        label: "Rejected",
        style: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        icon: <XCircle className="size-3.5" />,
      };
    default:
      return {
        label: "Applied",
        style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        icon: <CheckCircle2 className="size-3.5" />,
      };
  }
}

export default async function ApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const recruiterId = session?.user?.id;
  
  // এখন এটি lib/actions/application.ts এর authFetch যুক্ত গেট অ্যাপ্লিকেশন কল করবে
  const applications: Application[] = await getApplications(
    recruiterId ? `recruiterId=${recruiterId}` : ""
  );

  return (
    <div className="min-h-screen w-full space-y-8 bg-[#09090b] px-6 py-8 text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/70 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-indigo-400 font-medium">Applications Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Job Applications
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review candidates, track hiring stages, and update application statuses.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-xs text-zinc-300">
          <span>Total Applications:</span>
          <span className="font-bold text-indigo-400 text-sm">{applications.length}</span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/90 text-zinc-400 text-[11px] font-semibold uppercase tracking-wider border-b border-zinc-800/80">
              <tr>
                <th className="py-4 px-5">Candidate Info</th>
                <th className="py-4 px-5">Applied Role</th>
                <th className="py-4 px-5">Applied Date</th>
                <th className="py-4 px-5">Current Status</th>
                <th className="py-4 px-5">Update Status</th>
                <th className="py-4 px-5 text-right">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 rounded-full bg-zinc-800/60 text-zinc-400">
                        <Briefcase className="size-6" />
                      </div>
                      <p className="text-zinc-300 font-medium">No applications received yet</p>
                      <p className="text-xs text-zinc-500 max-w-sm">
                        Once candidates start applying to your job listings, their details will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const badge = getStatusBadge(app.status);

                  return (
                    <tr
                      key={app._id}
                      className="hover:bg-zinc-900/70 transition-colors group"
                    >
                      {/* ১. Candidate Info */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                            <User className="size-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-100">
                              {app.userName || "Anonymous Candidate"}
                            </div>
                            <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                              <Mail className="size-3 text-zinc-500" />
                              <span>{app.userEmail || "No email provided"}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ২. Applied Job */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="font-medium text-zinc-200 group-hover:text-indigo-400 transition-colors">
                          {app.jobTitle}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          {app.companyName}
                        </div>
                      </td>

                      {/* ৩. Applied Date */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-zinc-300 text-xs">
                          <Calendar className="size-3.5 text-zinc-500" />
                          <span>
                            {app.createdAt
                              ? new Date(app.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* ৪. Current Status Badge */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.style}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* ৫. Update Status Dropdown */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <StatusSelect
                          applicationId={app._id}
                          currentStatus={badge.label}
                        />
                      </td>

                      {/* ৬. View Job Link */}
                      <td className="py-4 px-5 whitespace-nowrap text-right">
                        <Link
                          href={`/browse-jobs/${app.jobId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-indigo-600 text-zinc-300 hover:text-white border border-zinc-700/60 text-xs font-medium transition"
                        >
                          <span>Job</span>
                          <ExternalLink className="size-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}