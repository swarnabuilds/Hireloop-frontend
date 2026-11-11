const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// ১. জবে আবেদন করার অ্যাকশন
export async function applyToJob(applicationData: {
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  userEmail: string;
  userName: string;
}) {
  try {
    // এখানে অতিরিক্ত হিসেবে status এবং createdAt যুক্ত করে সার্ভারে পাঠানো হচ্ছে
    const payload = {
      ...applicationData,
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
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return { success: false, message: error.message || "Something went wrong." };
  }
}

// ২. নির্দিষ্ট ইউজারের অ্যাপ্লিকেশনগুলো ফেচ করার ফাংশন
export async function getUserApplications(userId: string) {
  try {
    const response = await fetch(`${BASE_URI}/applications?userId=${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch applications.");
    }

    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return { success: false, data: [], message: error.message };
  }
}