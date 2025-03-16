"use client";

import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      title: jobTitle,
      company: company,
      type: jobType,
      location,
      salary,
      description,
      requirements,
      skills,
    };
    setLoading(true);
    console.log(company);
    console.log("JobData", jobData);
    try {
      const response = await axios.post("/api/jobs", jobData);
      console.log("JobPosted successfully ", response.data);
      setLoading(false);
      router.push("/dashboard/recruiter");
    } catch (e) {
      console.error("Error posting job", e);
      setLoading(false);
    }
  };

  return (
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
            Company Name
          </Label>
          <Input
            id="job-title"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
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

        <div className="grid gap-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill}</span>
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill || ""}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button onClick={addSkill} type="button">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>

        <Button className="bg-black text-white" onClick={handleSubmit}>
          {loading ? "Posting Job..." : "Post Job"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobForm;
