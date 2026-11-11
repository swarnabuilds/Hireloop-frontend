"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client"; 
import { toast } from "sonner";
import { applyToJob } from "@/lib/actions/application";

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function ApplyButton({ jobId, jobTitle, companyName }: ApplyButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleApplyClick = async () => {
    if (isPending) return;

    // ১. ইউজার লগইন করা না থাকলে সাইন-ইন পেজে রিডাইরেক্ট করা
    if (!session || !session.user) {
      toast.error("Authentication Required", {
        description: "Please sign in first to apply for this job.",
      });
      router.push(`/sign-in?callbackUrl=/browse-jobs/${jobId}`);
      return;
    }

    // ২. ইউজার রোল seeker না হলে ব্লক করা
    const userRole = (session.user as any)?.role;
    if (userRole && userRole !== "seeker") {
      toast.error("Access Denied", {
        description: "Only job seekers are allowed to apply for jobs.",
      });
      return;
    }

    // ৩. backend-এ applyToJob ফাংশন কল করে ডাটা পাঠানো
    const result = await applyToJob({
      jobId,
      jobTitle,
      companyName,
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
    });

    if (!result.success) {
      toast.error("Application Failed", {
        description: result.message,
      });
      return;
    }

    // ৪. সাকসেস টোস্ট দেখানো এবং ব্রাউজ জবস পেজে রিডাইরেক্ট করা
    toast.success("Application Submitted!", {
      description: `Successfully applied for ${jobTitle} at ${companyName}.`,
    });

    router.push("/browse-jobs");
  };

  return (
    <button 
      onClick={handleApplyClick}
      disabled={isPending}
      className="flex-1 md:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50"
    >
      {isPending ? "Checking..." : "Apply Now"}
    </button>
  );
}