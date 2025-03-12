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

export function ResumePreview() {
  const resumeData = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      summary:
        "Experienced frontend developer with 8+ years of experience building responsive and accessible web applications. Specialized in React, TypeScript, and modern frontend frameworks.",
    },
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "GraphQL",
      "Jest",
      "Responsive Design",
      "Accessibility",
      "Performance Optimization",
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "Present",
        description:
          "Lead frontend development for the company's main product. Implemented new features, improved performance, and mentored junior developers.",
      },
      {
        title: "Frontend Engineer",
        company: "WebSolutions Inc.",
        location: "New York, NY",
        startDate: "2017-06",
        endDate: "2020-02",
        description:
          "Developed and maintained multiple client websites. Worked closely with designers to implement pixel-perfect UIs.",
      },
      {
        title: "Web Developer",
        company: "Digital Agency",
        location: "Boston, MA",
        startDate: "2015-01",
        endDate: "2017-05",
        description:
          "Built responsive websites for various clients using modern web technologies.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationDate: "2014-05",
      },
    ],
  };

  const download = async () => {};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Resume
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">
                {resumeData.personalInfo.name}
              </CardTitle>
              <CardDescription className="text-lg">
                {resumeData.personalInfo.title}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => download}>
              <FileText className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
            <span>{resumeData.personalInfo.email}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>•</span>
            <span>{resumeData.personalInfo.location}</span>
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
              <p>{resumeData.personalInfo.summary}</p>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              {resumeData.experience.map((exp, index) => (
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
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-sm text-muted-foreground">
                    {edu.institution} • {edu.location}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Graduated:{" "}
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
