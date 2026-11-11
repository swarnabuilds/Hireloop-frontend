const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function applyToJob(applicationData: {
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  userEmail: string;
  userName: string;
}) {
  try {
    const response = await fetch(`${BASE_URI}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
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