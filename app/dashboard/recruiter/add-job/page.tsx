"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"
import { createJob } from "@/lib/actions/jobs"
import { useSession } from "@/lib/auth-client"

// Job Data type interface
export interface JobFormData {
  title: string
  companyName: string
  companyId?: string
  recruiterId: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
}

export default function AddJobPage() {

  const {data: session} = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [jobType, setJobType] = useState("Full-time")
  const [isRemote, setIsRemote] = useState(false)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(e.currentTarget);

    const jobData: JobFormData = {
      title: formData.get("title")?.toString() || "",
      companyName: formData.get("companyName")?.toString() || "",
     recruiterId: session?.user?.id || "",
      category: formData.get("category")?.toString() || "",
      jobType,
      isRemote,
      location: formData.get("location")?.toString() || "",
      deadline: formData.get("deadline")?.toString() || "",
      minSalary: formData.get("minSalary")?.toString() || "",
      maxSalary: formData.get("maxSalary")?.toString() || "",
      salaryFrequency: formData.get("salaryFrequency")?.toString() || "",
      responsibilities: formData.get("responsibilities")?.toString() || "",
      qualifications: formData.get("qualifications")?.toString() || "",
    };

    //api call
    const result = await createJob(jobData);

    if (!result.success) {
      throw new Error(result.message || "Job insertion failed!");
    }

    toast.success("Job posted successfully!", {
      description: "Your job has been posted successfully.",
    });

    router.push("/dashboard/recruiter/jobs");

  } catch (error) {
    console.error("Create Job Error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to post job. Please try again."
    );

  } finally {
    setLoading(false);
  }
};
  // Common styling for inputs/selects to match dark UI
  const inputStyle =
    "h-11 rounded-xl border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"

  return (
    // বাইরের র‍্যাপার ডিভে bg-black এবং text-white যুক্ত করা হয়েছে যাতে পুরো পেজ ডার্ক দেখায়
    <div className="min-h-screen w-full bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header section */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold text-zinc-400">
              Manage Jobs &gt; <span className="text-indigo-400">Create New Listing</span>
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
              Post a New Job
            </h1>
            <p className="text-sm text-zinc-400">
              Fill in the position specifications to attract qualified talent across our network.
            </p>
          </div>

        
        </div>

        {/* Main Job Form */}
        <form id="job-form" onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <span>1. Basic Information</span>
            </h2>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-zinc-300">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Frontend Developer"
                required
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-zinc-300">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="e.g. HirePulse Network"
                  required
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-zinc-300">
                  Job Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  name="category"
                  required
                  className={`w-full ${inputStyle} px-3 border border-zinc-800 outline-none`}
                >
                  <option value="" disabled selected className="bg-zinc-900">
                    Select category
                  </option>
                  <option value="Engineering & Tech" className="bg-zinc-900">Engineering & Tech</option>
                  <option value="Product & Design" className="bg-zinc-900">Product & Design</option>
                  <option value="Marketing & Sales" className="bg-zinc-900">Marketing & Sales</option>
                  <option value="Customer Support" className="bg-zinc-900">Customer Support</option>
                  <option value="Customer Support" className="bg-zinc-900">Infastructure</option>
                </select>
              </div>
            </div>

            {/* Job Type Selector Tabs */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Job Type <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`h-11 rounded-xl border text-sm font-semibold transition-all ${
                      jobType === type
                        ? "border-indigo-500 bg-indigo-600/20 text-indigo-300 ring-1 ring-indigo-500"
                        : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Location, Compensation & Timeline */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
              2. Location, Compensation & Timeline
            </h2>

            {/* Remote Switch */}
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-white flex items-center gap-2">
                  <span>Remote Work Allowed (isRemote)</span>
                  {/*  status badge on off */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isRemote ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}`}>
                    {isRemote ? "ON" : "OFF"}
                  </span>
                </Label>
                <p className="text-xs text-zinc-400">
                  Enable worldwide or distributed candidate applications.
                </p>
              </div>
              
              {/* Switch এ স্পষ্ট সাদা/কালো ও বর্ডার কন্ট্রাস্ট দেওয়া হয়েছে */}
              <Switch
                checked={isRemote}
                onCheckedChange={setIsRemote}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-800 border border-zinc-700"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-zinc-300">
                  Job Location (location)
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. New York, USA / Remote"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-zinc-300">
                  Application Deadline (deadline)
                </Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Salary Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="minSalary" className="text-sm font-medium text-zinc-300">
                  Min Salary / Rate
                </Label>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  placeholder="e.g. 35"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxSalary" className="text-sm font-medium text-zinc-300">
                  Max Salary / Rate
                </Label>
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  placeholder="e.g. 40"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryFrequency" className="text-sm font-medium text-zinc-300">
                  Frequency
                </Label>
                <select
                  id="salaryFrequency"
                  name="salaryFrequency"
                  className={`w-full ${inputStyle} px-3 border border-zinc-800 outline-none`}
                >
                  <option value="per hour" className="bg-zinc-900">per hour</option>
                  <option value="per month" className="bg-zinc-900">per month</option>
                  <option value="per year" className="bg-zinc-900">per year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Responsibilities & Requirements */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
              3. Responsibilities & Requirements
            </h2>

            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-sm font-medium text-zinc-300">
                Key Responsibilities <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
                required
                className="rounded-xl border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications" className="text-sm font-medium text-zinc-300">
                Qualifications & Requirements <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                rows={4}
                placeholder="• 3+ years of experience with React, TypeScript..."
                required
                className="rounded-xl border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

        </form>
          <Button
            type="submit"
            form="job-form"
            disabled={loading}
            className="h-11 rounded-xl bg-indigo-600 px-6 font-medium text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Publish Job
              </>
            )}
          </Button>
      </div>
    </div>
  )
}