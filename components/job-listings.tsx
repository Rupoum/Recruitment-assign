"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  createdAt: string;
}
export function JobListings() {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="grid gap-4">
      {data.length === 0 ? (
        <p>No jobs yet</p>
      ) : (
        data.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <h3>{job.company}</h3>
                  <CardDescription>Location : {job.location}</CardDescription>
                </div>
                <Badge variant="outline">Type: {job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-md underline underline-offset-2">
                Job description
              </div>
              <p className="text-sm">{job.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="text-sm">Skills:</div>
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                Posted: {formatDistanceToNow(new Date(job.createdAt))} ago
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button size="sm">View Matches</Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
