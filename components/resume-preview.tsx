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
import { Edit, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

interface UserData {
  resumeUrl?: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

interface ResumePreviewProps {
  userData: UserData;
}

export function ResumePreview({ userData }: ResumePreviewProps) {
  const download = () => {
    if (userData?.resumeUrl) {
      window.open(userData.resumeUrl);
    } else {
      console.error("Resume URL not found");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{userData?.name}</CardTitle>
              <CardDescription className="text-lg">
                {userData?.title}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={download}>
              <FileText className="mr-2 h-4 w-4" />
              Resume Link
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
            <span>{userData?.email}</span>
            <span>•</span>
            <span>{userData?.phone}</span>
            <span>•</span>
            <span>{userData?.location}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <p>{userData?.summary}</p>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {userData?.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              {userData?.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="font-bold">{exp.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {exp.company} • {exp.location}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}{" "}
                    -
                    {exp.endDate === "Present"
                      ? " Present"
                      : ` ${new Date(exp.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}`}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              {userData?.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-sm text-muted-foreground">
                    {edu.institution} • {edu.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Graduation:{" "}
                    {new Date(edu.graduationDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
