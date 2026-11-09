"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Job } from "../dashboard/recruiter/jobs/page";
import { deleteJob } from "@/lib/actions/jobs";

export function DeleteJobDialog({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Delete Job
  const handleJobDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteJob(job._id);

      if (res.deletedCount > 0) {
        toast.success("Job deleted successfully!");

        setOpen(false);
        router.refresh();
      } else {
        toast.error("Job not found or already deleted!");
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("Failed to delete job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-red-500 transition-all hover:bg-zinc-800 hover:text-red-300"
            title="Delete Job"
          >
            <Trash2Icon className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Delete Job?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete "{job.title}"?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleJobDelete}
            variant="destructive"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}