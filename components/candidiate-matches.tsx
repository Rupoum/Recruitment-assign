import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, UserCheck } from "lucide-react";

export function CandidateMatches() {
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      matchScore: 92,
      location: "Remote",
      experience: "8 years",
      skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
      applied: true,
    },
    {
      id: 2,
      name: "Sam Rivera",
      title: "Frontend Engineer",
      matchScore: 87,
      location: "New York, NY",
      experience: "5 years",
      skills: ["React", "JavaScript", "CSS", "Redux"],
      applied: false,
    },
    {
      id: 3,
      name: "Taylor Kim",
      title: "UI Developer",
      matchScore: 78,
      location: "San Francisco, CA",
      experience: "4 years",
      skills: ["React", "Styled Components", "Figma", "HTML/CSS"],
      applied: true,
    },
  ];

  return (
    <div className="grid gap-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={candidate.name}
                  />
                  <AvatarFallback>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{candidate.name}</CardTitle>
                  <CardDescription>
                    {candidate.title} • {candidate.location}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {candidate.matchScore}% Match
                </span>
                <Progress value={candidate.matchScore} className="h-2 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm mb-2">Experience: {candidate.experience}</p>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              {candidate.applied ? (
                <span className="flex items-center">
                  <UserCheck className="mr-1 h-4 w-4 text-green-500" />
                  Applied
                </span>
              ) : (
                <span>Not yet applied</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button size="sm">View Profile</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
