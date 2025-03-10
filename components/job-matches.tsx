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

export function JobMatches() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Acme Inc",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      matchScore: 95,
      salary: "$120,000 - $150,000",
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "TechCorp",
      location: "New York, NY",
      type: "Full-time",
      posted: "1 week ago",
      matchScore: 88,
      salary: "$100,000 - $130,000",
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 3,
      title: "UI Developer",
      company: "DesignHub",
      location: "San Francisco, CA",
      type: "Contract",
      posted: "3 days ago",
      matchScore: 82,
      salary: "$90/hr",
      skills: ["React", "Tailwind CSS", "Figma"],
    },
  ];

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Building className="h-3 w-3" /> {job.company} •{" "}
                  <MapPin className="h-3 w-3" /> {job.location}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {job.matchScore}% Match
                </span>
                <Progress value={job.matchScore} className="h-2 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{job.type}</Badge>
              <span className="text-sm text-muted-foreground">
                {job.salary}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              Posted {job.posted}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                View Details
              </Button>
              <Button size="sm">Apply Now</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
