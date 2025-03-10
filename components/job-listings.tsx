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
import { Eye, Users } from "lucide-react";

export function JobListings() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Acme Inc",
      location: "Remote",
      type: "Full-time",
      posted: "2 days ago",
      applicants: 24,
      description:
        "We're looking for an experienced frontend developer with React expertise.",
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "TechCorp",
      location: "New York, NY",
      type: "Full-time",
      posted: "1 week ago",
      applicants: 18,
      description: "Join our team to build scalable backend services.",
      skills: ["Node.js", "Python", "AWS"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "San Francisco, CA",
      type: "Contract",
      posted: "3 days ago",
      applicants: 12,
      description:
        "Looking for a creative designer to improve our product experience.",
      skills: ["Figma", "Adobe XD", "User Research"],
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
                <CardDescription>
                  {job.company} • {job.location}
                </CardDescription>
              </div>
              <Badge variant="outline">{job.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm">{job.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {job.applicants} applicants • Posted {job.posted}
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
