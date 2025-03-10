import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";

export function ApplicationStatus() {
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "Acme Inc",
      appliedDate: "2023-05-15",
      status: "interview",
      nextStep: "Technical Interview on May 25, 2023",
      matchScore: 95,
    },
    {
      id: 2,
      jobTitle: "UI Developer",
      company: "DesignHub",
      appliedDate: "2023-05-10",
      status: "reviewing",
      nextStep: "Application under review",
      matchScore: 82,
    },
    {
      id: 3,
      jobTitle: "Frontend Engineer",
      company: "TechCorp",
      appliedDate: "2023-05-05",
      status: "rejected",
      nextStep: "Position filled",
      matchScore: 78,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline">Applied</Badge>;
      case "reviewing":
        return <Badge variant="secondary">Under Review</Badge>;
      case "interview":
        return <Badge variant="default">Interview Stage</Badge>;
      case "offer":
        return <Badge className="bg-green-500">Offer Received</Badge>;
      case "rejected":
        return <Badge variant="destructive">Not Selected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Applications</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{app.jobTitle}</CardTitle>
                  <CardDescription>{app.company}</CardDescription>
                </div>
                {getStatusBadge(app.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applied on:</span>
                  <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Match Score:</span>
                  <span>{app.matchScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Step:</span>
                  <span>{app.nextStep}</span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Recruiter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="active" className="space-y-4">
        {applications
          .filter((app) => app.status !== "rejected")
          .map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.jobTitle}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applied on:</span>
                    <span>
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Match Score:</span>
                    <span>{app.matchScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Step:</span>
                    <span>{app.nextStep}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Recruiter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
      <TabsContent value="archived" className="space-y-4">
        {applications
          .filter((app) => app.status === "rejected")
          .map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.jobTitle}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applied on:</span>
                    <span>
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Match Score:</span>
                    <span>{app.matchScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Step:</span>
                    <span>{app.nextStep}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  );
}
