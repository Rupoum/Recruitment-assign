"use client";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobListings } from "@/components/job-listings";
// import { CandidateMatches } from "@/components/candidiate-matches";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
// import { Analytics } from "@/components/recruiter-analytics";
import CandidateMatches from "@/components/candidiate-matches";
import { toast } from "sonner";

export default function RecruiterDashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Recruiter Dashboard"
        text="Manage your job listings and view candidate matches."
      >
        <Button
          asChild
          className="bg-black text-white text-md hover:bg-white hover:text-black"
        >
          <Link href="/dashboard/recruiter/jobs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="jobs" className="space-y-10 ">
        <TabsList className="space-x-9 ">
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:bg-green-300 "
          >
            Job Listings
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="data-[state=active]:bg-green-300"
          >
            Applications
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-green-300"
            onClick={() => {
              toast.error("Analytics not available yet", {});
            }}
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <JobListings />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <CandidateMatches />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          {/* <Analytics /> */}
          <div>Not Available !</div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
