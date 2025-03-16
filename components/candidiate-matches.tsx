"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import axios from "axios";

export default function CandidateMatches() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/jobs");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="grid gap-6">
      {data.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>
              {job.title} at {job.company}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Location: {job.location}</p>
            <p className="text-sm text-gray-500">Salary: {job.salary}</p>
            <p className="text-sm text-gray-500">
              Description: {job.description}
            </p>
            <h3 className="mt-4 font-medium">Applicants:</h3>
            <div className="grid gap-4 mt-2">
              {job.applicants && job.applicants.length > 0 ? (
                job.applicants.map((applicant) => (
                  <Card key={applicant.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-gray-500">
                          {applicant.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {applicant.location}
                        </p>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" /> Contact
                        </Button>
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            if (applicant.user?.fileUrl) {
                              window.open(applicant.user.fileUrl, "_blank");
                            } else {
                              alert("Resume not available");
                            }
                          }}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-gray-500">No applicants yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
