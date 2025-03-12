"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeParser } from "@/components/resume-parser";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const session = useSession();
  console.log(session.data?.user?.email);

  const user = session.data?.user;
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setFile(file);
    console.log(file);
  };

  const handleUpload = async () => {
    console.log("clicked");
    if (file) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64File = reader.result?.toString().split(",")[1];
          const response = await axios.post("/api/fileupload", {
            base64File,
            filename: file.name,
            user: user,
          });

          if (response.status === 200) {
            setIsUploaded(true);
          }
        };
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Upload Resume"
        text="Upload your resume to automatically populate your profile and find matching jobs."
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/candidate">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload" disabled={isUploaded}>
            Upload Resume
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-green-300"
            disabled={!isUploaded}
          >
            Preview & Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                We support PDF, DOCX, and TXT formats. Your resume will be
                parsed automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <>
                    <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Drag & drop your resume
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileInput}
                    />
                    <Button asChild>
                      <label htmlFor="resume-upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Select File
                      </label>
                    </Button>
                  </>
                ) : (
                  <>
                    <FileText className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">{file.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isUploaded
                        ? "Resume uploaded and parsed successfully!"
                        : "Uploading and parsing..."}
                    </p>
                    {isUploaded ? (
                      <Button variant="outline" onClick={() => setFile(null)}>
                        Upload a different file
                      </Button>
                    ) : (
                      <Button onClick={handleUpload}>Upload</Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <ResumeParser />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
