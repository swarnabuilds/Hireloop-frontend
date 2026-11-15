import { getUsers } from "@/lib/api/users";
import { Shield, Briefcase, User as UserIcon } from "lucide-react";
import RoleToggleButtons from "@/components/RoleToggleButtons";

// ইউজারের জন্য টাইপ ইন্টারফেস
interface UserItem {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  banned?: boolean | null;
  createdAt: string | Date;
}

const AdminUsersPage = async () => {
  // ১. সার্ভার থেকে ইউজার লিস্ট ফেচ করা
  const response = await getUsers();
  const users: UserItem[] = Array.isArray(response) ? response : response?.users || [];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 p-6 md:p-8 space-y-6">
      {/* পেজ হেডার */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Review, filter, and manage platform access for all users.
        </p>
      </div>

      {/* ইউজার টেবিল কন্টেইনার */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-900/60 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">User Name</th>
                <th className="py-3.5 px-5">Email Address</th>
                <th className="py-3.5 px-5">Current Role</th>
                <th className="py-3.5 px-5">Join Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Switch Role (Toggle)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const currentRole = user.role?.toLowerCase() || "seeker";
                  const isBanned = Boolean(user.banned);

                  return (
                    <tr key={user.id} className="hover:bg-zinc-900/60 transition-colors">
                      {/* ইউজারের নাম */}
                      <td className="py-4 px-5 font-medium text-zinc-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 uppercase">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>

                      {/* ইমেইল */}
                      <td className="py-4 px-5 text-zinc-400">{user.email}</td>

                      {/* বর্তমান রোল ব্যাজ */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            currentRole === "admin"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : currentRole === "recruiter"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-zinc-800/80 text-zinc-300 border-zinc-700"
                          }`}
                        >
                          {currentRole === "admin" && <Shield className="w-3 h-3" />}
                          {currentRole === "recruiter" && <Briefcase className="w-3 h-3" />}
                          {currentRole === "seeker" && <UserIcon className="w-3 h-3" />}
                          <span className="capitalize">{currentRole}</span>
                        </span>
                      </td>

                      {/* জয়েন ডেট */}
                      <td className="py-4 px-5 text-zinc-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      {/* স্ট্যাটাস */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            !isBanned
                              ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                              : "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${!isBanned ? "bg-emerald-400" : "bg-rose-400"}`} />
                          {!isBanned ? "Active" : "Suspended"}
                        </span>
                      </td>

                      {/* রোল টগল বাটন কম্পোনেন্ট */}
                      <td className="py-4 px-5 text-right">
                        <RoleToggleButtons userId={user.id} currentRole={currentRole} />
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
};

export default AdminUsersPage;