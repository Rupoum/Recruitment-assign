import { useEffect, useState } from "react";
import axios from "axios";
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
import { Progress } from "@/components/ui/progress";
import { Briefcase, Building, MapPin } from "lucide-react";

export function JobMatches({ applied }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get("/api/matchingai");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching match results:", error);
      }
    };
    fetchMatchData();
  }, []);

  // console.log(jobs[0].jobId);
  console.log(applied);

  // console.log(props.applied?.applied);

  const handleApplication = async (jobId) => {
    console.log("Applying for job:", jobId);
    try {
      const response = await axios.post("/api/application", {
        jobId,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };
  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <Card key={job.jobId}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{job.jobTitle}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-2">
                  <Building className="h-3 w-3" /> {job.company}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {job.matchPercentage}% Match
                </span>
                <Progress value={job.matchPercentage} className="w-[100%] " />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="mb-2">
              <span className="font-medium">Matching Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.matchingSkills.length > 0 ? (
                  job.matchingSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">
                    No matching skills
                  </span>
                )}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-medium">Missing Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.missingSkills.length > 0 ? (
                  job.missingSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-black">None</span>
                )}
              </div>
            </div>
            {job.improvementSuggestions && (
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="text-lg font-bold">Suggestions:</span>{" "}
                {job.improvementSuggestions}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button size="sm" variant="outline">
              View Details
            </Button>
            {applied.includes(job.jobId) ? (
              <Button size="sm" variant="outline" disabled>
                Applied Already
              </Button>
            ) : (
              <Button size="sm" onClick={() => handleApplication(job.jobId)}>
                Apply
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
