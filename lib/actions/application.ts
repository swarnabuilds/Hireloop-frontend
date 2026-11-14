const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// ইনপুট ডেটার টাইপ
export interface ApplyJobInput {
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  applicantId?: string; // আলাদা পাঠাতে চাইলে অপশনাল রাখা হলো, না পাঠালে userId বসবে
  userEmail: string;
  userName: string;
}

// ডাটাবেজ থেকে আসা অ্যাপ্লিকেশন অবজেক্টের টাইপ
export interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  applicantId: string;
  userEmail: string;
  userName: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  createdAt: string;
  appliedAt?: string;
}

// এপিআই রেসপন্সের জেনেরিক টাইপ
export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}


export const getApplications = async (query = ""): Promise<Application[]> => {
  const res = await fetch(`${BASE_URI}/applications?${query}`, {
    cache: "no-store",
  });
  return res.json();
};

//count application
export const getApplicationsCount = async (query = ""): Promise<{ count: number }> => {
  try {
    const response = await fetch(`${BASE_URI}/applications/count${query ? `?${query}` : ""}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return { count: data.count ?? 0 };
  } catch (error) {
    console.error("Failed to fetch applications count:", error);
    return { count: 0 };
  }
};

// ১. জবে আবেদন করার অ্যাকশন
export async function applyToJob(
  applicationData: ApplyJobInput
): Promise<ActionResponse<{ insertedId: string; acknowledged: boolean }>> {
  try {
    const payload = {
      ...applicationData,
      // যদি আলাদা applicantId না পাঠানো হয়, তবে userId-ই applicantId হিসেবে সেভ হবে
      applicantId: applicationData.applicantId || applicationData.userId,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${BASE_URI}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit application.");
    }

    return { success: true, data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
    console.error("Error submitting application:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

// ২. নির্দিষ্ট ইউজারের অ্যাপ্লিকেশনগুলো ফেচ করার ফাংশন
export async function getUserApplications(
  userId: string
): Promise<ActionResponse<Application[]>> {
  try {
    const response = await fetch(`${BASE_URI}/applications?userId=${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications.");
    }

    return {
      success: true,
      data: Array.isArray(data) ? (data as Application[]) : [],
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch applications.";
    console.error("Error fetching applications:", errorMessage);
    return { success: false, data: [], message: errorMessage };
  }
}