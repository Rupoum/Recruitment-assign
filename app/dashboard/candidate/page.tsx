"use client";
import Link from "next/link";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobMatches } from "@/components/job-matches";
import { ApplicationStatus } from "@/components/application-status";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ResumePreview } from "@/components/resume-preview";
import axios from "axios";
import { useEffect, useState } from "react";
import AllJobs from "@/components/all-jobs";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

interface UserData {
  resumeUrl?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export default function CandidateDashboard() {
  const [userData, setUserData] = useState<UserData>({
    resumeUrl: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: [],
    experience: [],
    education: [],
  });
  const [applied, setApplied] = useState<string[]>([]);
  const [ai, setAi] = useState("");
  const session = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/candidate/profile");

        setUserData(response.data);
        setApplied(response.data.applied);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log(userData);
  // console.log(applied);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Candidate Dashboard"
        text="Manage your profile, view job matches, and track applications."
      >
        <Button asChild className="hover:bg-black hover:text-white">
          <Link href="/dashboard/candidate/resume/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Link>
        </Button>

        <div></div>
      </DashboardHeader>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile & Resume</TabsTrigger>
          <TabsTrigger value="alljobs">All Jobs</TabsTrigger>
          <TabsTrigger value="matches">Job Matches</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ResumePreview userData={userData} />
        </TabsContent>
        <TabsContent value="alljobs" className="space-y-4">
          <AllJobs applied={applied} />
        </TabsContent>
        <TabsContent value="matches" className="space-y-4">
          <JobMatches applied={applied} />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <ApplicationStatus />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
