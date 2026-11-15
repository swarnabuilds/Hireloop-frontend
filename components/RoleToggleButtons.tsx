"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/actions/users";

interface RoleToggleButtonsProps {
  userId: string;
  currentRole: string;
}

export default function RoleToggleButtons({ userId, currentRole }: RoleToggleButtonsProps) {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  // রোল পরিবর্তনের হ্যান্ডেলার ফাংশন
  const handleRoleChange = async (targetRole: "seeker" | "recruiter" | "admin") => {
    // যদি বর্তমান রোল এবং সিলেক্ট করা রোল একই হয়, তবে কিছু করার দরকার নেই
    if (currentRole === targetRole || loadingRole) return;

    setLoadingRole(targetRole);

    try {
      // ১. ব্যাকএন্ড API কল করে রোল আপডেট করা হচ্ছে
      const result = await updateUserRole(userId, targetRole);

      // ২. সফলভাবে আপডেট হলে টোস্ট দেখানো এবং পেজের ডেটা রিফ্রেশ করা
      if (result && result.modifiedCount > 0) {
        toast.success(`User role updated to ${targetRole.toUpperCase()}!`);
        router.refresh(); // সার্ভার কম্পোনেন্টের ডেটা রি-ফেচ করবে
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating role.");
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="inline-flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 gap-1">
      {(["seeker", "recruiter", "admin"] as const).map((roleOption) => {
        const isSelected = currentRole === roleOption;
        const isUpdating = loadingRole === roleOption;

        return (
          <button
            key={roleOption}
            type="button"
            disabled={isUpdating || isSelected}
            onClick={() => handleRoleChange(roleOption)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all cursor-pointer disabled:cursor-not-allowed ${
              isSelected
                ? roleOption === "admin"
                  ? "bg-purple-600 text-white shadow-sm"
                  : roleOption === "recruiter"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-zinc-700 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            {isUpdating ? "..." : roleOption}
          </button>
        );
      })}
    </div>
  );
}