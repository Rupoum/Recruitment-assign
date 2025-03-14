"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
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

export function JobListings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/jobs");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="grid gap-4">
      {data.map((job) => (
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
              {/* <Users className="mr-1 h-4 w-4" /> */}
              Posted:
              {formatDistanceToNow(new Date(job.createdAt))} ago
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
      ))}
    </div>
  );
}
