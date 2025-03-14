import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

import JobForm from "@/components/job-form";

export default function NewJobPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Post New Job"
        text="Create a new job listing to find the perfect candidate."
      >
        <Button variant="ghost" asChild>
          <Link href="/dashboard/recruiter">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4">
        <JobForm />
      </div>
    </DashboardShell>
  );
}
