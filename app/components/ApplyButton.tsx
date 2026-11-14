"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 
import { toast } from "sonner";
import { applyToJob, getApplicationsCount } from "@/lib/actions/application";

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

// সেশন ইউজারের জন্য সঠিক টাইপ ইন্টারফেস
interface CustomUser {
  id: string;
  email: string;
  name: string;
  role?: "seeker" | "recruiter" | "admin";
}

export default function ApplyButton({ jobId, jobTitle, companyName }: ApplyButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [applicantCount, setApplicantCount] = useState<number>(0);

  // সেশন থেকে ইউজার বের করা উইদাউট 'any'
  const user = session?.user as CustomUser | undefined;

  // ইউজারের মোট আবেদন সংখ্যা চেক করা
  useEffect(() => {
    if (!user?.id) return;
    getApplicationsCount(`userId=${user.id}`).then((res) => {
      if (res && typeof res.count === "number") setApplicantCount(res.count);
    });
  }, [user?.id]);

  const handleApplyClick = async () => {
    if (isPending) return;

    if (!session || !user) {
      toast.error("Please sign in first.");
      router.push(`/sign-in?callbackUrl=/browse-jobs/${jobId}`);
      return;
    }

    // ১. আবেদন 6 বা তার বেশি হলে পেমেন্ট পেজে রিডাইরেক্ট করবে
    if (applicantCount >= 6) {
      toast.info("Free limit reached. Please complete payment.");
      router.push("/payment"); 
      return;
    }

    // ২. না হলে সরাসরি আবেদন সাবমিট হবে
    const result = await applyToJob({
      jobId,
      jobTitle,
      companyName,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    });

    if (!result.success) {
      toast.error(result.message || "Failed to apply");
      return;
    }

    setApplicantCount((prev) => prev + 1);
    toast.success("Application successful!");
    router.refresh();
  };

  return (
    <button 
      onClick={handleApplyClick}
      disabled={isPending}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:opacity-50"
    >
      {applicantCount >= 10 ? "Pay & Apply" : "Apply Now"}
    </button>
  );
}