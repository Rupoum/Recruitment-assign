"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Job Details</CardTitle>
            <CardDescription>
              Fill in the details of the job you want to post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="job-title" className="text-lg font-mono">
                Job Title
              </Label>
              <Input
                id="job-title"
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="job-type" className="text-lg font-mono">
                  Job Type
                </Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-300  text-black">
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-lg font-mono">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Remote, New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary" className="text-lg font-mono">
                Salary Range
              </Label>
              <Input
                id="salary"
                placeholder="e.g. $80,000 - $100,000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-lg font-mono">
                Job Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the job role, responsibilities, and company culture..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="requirements" className="text-lg font-mono">
                Requirements & Skills
              </Label>
              <Textarea
                id="requirements"
                className=""
                placeholder="List the required skills, experience, and qualifications..."
                rows={5}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>

            <Button className="bg-black text-white">Post Job</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
