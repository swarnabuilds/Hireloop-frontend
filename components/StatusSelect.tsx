"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateApplicationStatus } from "@/lib/actions/application";  

interface StatusSelectProps {
  applicationId: string;
  currentStatus: string;
}

const STATUS_OPTIONS = [
  "Applied",
  "In Review",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
];

export default function StatusSelect({ applicationId, currentStatus }: StatusSelectProps) {
  const [status, setStatus] = useState(currentStatus || "Applied");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setIsUpdating(true);

    // ২. এখানে ফাংশনটি কল করো (অবজেক্ট আকারে { status: newStatus } পাস করতে হবে)
    const result = await updateApplicationStatus(applicationId, { status: newStatus });

    if (result) {
      toast.success(`Status updated to ${newStatus}`);
      router.refresh();
    } else {
      toast.error("Could not update status");
      setStatus(currentStatus); // এরর হলে আগের স্ট্যাটাসে ফিরে যাবে
    }

    setIsUpdating(false);
  };

  return (
    <select
      value={status}
      disabled={isUpdating}
      onChange={(e) => handleStatusChange(e.target.value)}
      className="bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition cursor-pointer disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option} className="bg-zinc-900 text-zinc-200">
          {option}
        </option>
      ))}
    </select>
  );
}