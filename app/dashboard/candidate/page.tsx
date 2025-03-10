import Link from "next/link";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobMatches } from "@/components/job-matches";
import { ApplicationStatus } from "@/components/application-status";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ResumePreview } from "@/components/resume-preview";

export default function CandidateDashboard() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Candidate Dashboard"
        text="Manage your profile, view job matches, and track applications."
      >
        <Button asChild>
          <Link href="/dashboard/candidate/resume/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Link>
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile & Resume</TabsTrigger>
          <TabsTrigger value="matches">Job Matches</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ResumePreview />
        </TabsContent>
        <TabsContent value="matches" className="space-y-4">
          <JobMatches />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <ApplicationStatus />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
