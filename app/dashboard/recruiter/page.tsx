import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobListings } from "@/components/job-listings";
import { CandidateMatches } from "@/components/candidiate-matches";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Analytics } from "@/components/recruiter-analytics";

export default function RecruiterDashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Recruiter Dashboard"
        text="Manage your job listings and view candidate matches."
      >
        <Button asChild className="bg-black text-white text-md">
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
            value="candidates"
            className="data-[state=active]:bg-green-300"
          >
            Candidate Matches
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-green-300"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <JobListings />
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <CandidateMatches />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
