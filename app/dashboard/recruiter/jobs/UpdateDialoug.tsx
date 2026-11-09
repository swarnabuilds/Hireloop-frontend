"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateJob } from "@/lib/actions/jobs"
import { toast } from "sonner"

interface Job {
  _id: string;
  title: string;
  companyName: string;
  category?: string;
  jobType: string;
  isRemote?: boolean;
  location?: string;
  deadline?: string;
  minSalary?: string | number;
  maxSalary?: string | number;
  salaryFrequency?: string;
  responsibilities?: string;
  qualifications?: string;
}

interface UpdateJobDialogProps {
  job: Job;
}

export function UpdateJobDialog({ job }: UpdateJobDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Add Job পেজের সব ফিল্ড মিলিয়ে স্টেট ইনিশিয়ালাইজ করা হলো
  const [formData, setFormData] = useState({
    title: job.title || "",
    companyName: job.companyName || "",
    category: job.category || "",
    jobType: job.jobType || "Full-time",
    isRemote: job.isRemote || false,
    location: job.location || "",
    deadline: job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "",
    minSalary: job.minSalary || "",
    maxSalary: job.maxSalary || "",
    salaryFrequency: job.salaryFrequency || "Monthly",
    responsibilities: job.responsibilities || "",
    qualifications: job.qualifications || "",
  })

  // ইনপুট পরিবর্তনের হ্যান্ডলার (ইনপুট, সিলেক্ট এবং চেক বক্সের জন্য)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // ফর্ম সাবমিট (PATCH API Call)
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await updateJob(job._id, formData as any)

      if (result) {
        setOpen(false) 
        toast.success("Job updated successfully!") 

        router.refresh()  
      } else {
        toast.error("Failed to update job.")
      }
    } catch (error) {
      console.error("Error updating job:", error)
      toast.error("An error occurred while updating the job.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* পেন্সিল আইকন বাটন */}
      <DialogTrigger
        className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-indigo-400 transition-all hover:bg-zinc-800 hover:text-indigo-300"
        title="Update Job"
      >
        <Pencil className="size-4" />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Update Job Listing
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            Modify all the job details below and click save to apply changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Job Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs text-zinc-300">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
              required
            />
          </div>

          {/* Company & Category Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-xs text-zinc-300">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs text-zinc-300">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Job Type & Location Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="jobType" className="text-xs text-zinc-300">Job Type</Label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs text-zinc-300">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Is Remote Checkbox */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="isRemote"
              name="isRemote"
              checked={formData.isRemote}
              onChange={handleChange}
              className="size-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500"
            />
            <Label htmlFor="isRemote" className="text-xs text-zinc-300 cursor-pointer">
              Is this a fully remote position?
            </Label>
          </div>

          {/* Salary Range & Frequency Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="minSalary" className="text-xs text-zinc-300">Min Salary ($)</Label>
              <Input
                id="minSalary"
                name="minSalary"
                type="number"
                value={formData.minSalary}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="maxSalary" className="text-xs text-zinc-300">Max Salary ($)</Label>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="number"
                value={formData.maxSalary}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salaryFrequency" className="text-xs text-zinc-300">Frequency</Label>
              <select
                id="salaryFrequency"
                name="salaryFrequency"
                value={formData.salaryFrequency}
                onChange={handleChange}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <Label htmlFor="deadline" className="text-xs text-zinc-300">Deadline</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              className="border-zinc-800 bg-zinc-900 text-xs text-white focus:border-indigo-500"
            />
          </div>

          {/* Responsibilities */}
          <div className="space-y-1.5">
            <Label htmlFor="responsibilities" className="text-xs text-zinc-300">Responsibilities</Label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              rows={3}
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="List job responsibilities..."
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Qualifications */}
          <div className="space-y-1.5">
            <Label htmlFor="qualifications" className="text-xs text-zinc-300">Qualifications</Label>
            <textarea
              id="qualifications"
              name="qualifications"
              rows={3}
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="List required qualifications..."
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-xs text-white hover:bg-indigo-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}