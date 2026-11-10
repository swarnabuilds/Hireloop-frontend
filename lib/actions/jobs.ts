import { JobFormData } from "@/app/dashboard/recruiter/add-job/page";

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createJob = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URI}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URI}/jobs/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


export const updateJob = async (id: string, data:  JobFormData) => {
  const res = await fetch(`${BASE_URI}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


//deatils
export const getJobById = async (id: string) => {
  const res = await fetch(`${BASE_URI}/jobs/${id}`, {
    cache: "no-store",
  });

  return res.json();
};