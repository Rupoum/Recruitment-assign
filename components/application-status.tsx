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
import { Mail, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
interface Application {
  id: string;
  title: string;
  location: string;
  salary: string;
  type: string;
  requirements: string;
  skills: string[];
  recruiterId: string;
}

export function ApplicationStatus() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/application");
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching application data:", error);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All Applications</TabsTrigger>
        {/* <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger> */}
      </TabsList>
      <TabsContent value="all" className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{app.title}</CardTitle>
                  <CardDescription>{app.location}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Salary:</span>
                  <span>{app.salary || "Not specified"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{app.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Requirements:</span>
                  <span>{app.requirements}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {app.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    {app.recruiterId}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      {/* <TabsContent value="active" className="space-y-4">
        {applications
          .filter((app) => app.status !== "rejected")
          .map((app) => (
            <Card key={app.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.title}</CardTitle>
                    <CardDescription>{app.location}</CardDescription>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary:</span>
                    <span>{app.salary || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{app.type}</span>
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
                    <CardTitle>{app.title}</CardTitle>
                    <CardDescription>{app.location}</CardDescription>
                  </div>
                  {getStatusBadge(app.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary:</span>
                    <span>{app.salary || "Not specified"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </TabsContent> */}
    </Tabs>
  );
}
