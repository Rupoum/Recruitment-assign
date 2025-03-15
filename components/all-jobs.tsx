"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Progress } from "@radix-ui/react-progress";
import { Button } from "./ui/button";
import { Briefcase, Building, Eye, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
const AllJobs = ({ applied }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/alljobs");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(data, "data");
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
              {applied.includes(job.id) ? (
                <Button size="sm" variant="outline" disabled>
                  Applied Already
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleApplication(job.jobId)}>
                  Apply
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AllJobs;
