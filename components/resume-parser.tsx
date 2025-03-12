"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";

export function ResumeParser() {
  // Will be populated from the resume parsing service in a real app
  const session = useSession();
  console.log(session.data?.user?.email);

  const userEmail = session.data?.user?.email;
  const [parsedData, setParsedData] = useState({
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
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationDate: "2014-05",
      },
    ],
  });

  const fetchData = async () => {
    console.log("backendhit");
    const data = await axios.get("/api/aidata");
    // Handle the fetched data as needed

    console.log(data);
  };

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (
      newSkill.trim() !== "" &&
      !parsedData.skills.includes(newSkill.trim())
    ) {
      setParsedData({
        ...parsedData,
        skills: [...parsedData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setParsedData({
      ...parsedData,
      skills: parsedData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review & Edit Parsed Resume</CardTitle>
          <CardDescription>
            We `&apos;`ve automatically extracted information from your resume.
            Please review and edit as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            className="text-sm mb-3 w-fit h-auto bg-green-300 px-2 py-2 text-center rounded-3xl shadow-2xs shadow-green-300 hover:shadow-green-800 cursor-pointer "
            onClick={fetchData}
          >
            Fetch data from resume
          </button>

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={parsedData.personalInfo.name}
                      onChange={(e) =>
                        setParsedData({
                          ...parsedData,
                          personalInfo: {
                            ...parsedData.personalInfo,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={parsedData.personalInfo.title}
                      onChange={(e) =>
                        setParsedData({
                          ...parsedData,
                          personalInfo: {
                            ...parsedData.personalInfo,
                            title: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={parsedData.personalInfo.email}
                      onChange={(e) =>
                        setParsedData({
                          ...parsedData,
                          personalInfo: {
                            ...parsedData.personalInfo,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={parsedData.personalInfo.phone}
                      onChange={(e) =>
                        setParsedData({
                          ...parsedData,
                          personalInfo: {
                            ...parsedData.personalInfo,
                            phone: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={parsedData.personalInfo.location}
                    onChange={(e) =>
                      setParsedData({
                        ...parsedData,
                        personalInfo: {
                          ...parsedData.personalInfo,
                          location: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    value={parsedData.personalInfo.summary}
                    onChange={(e) =>
                      setParsedData({
                        ...parsedData,
                        personalInfo: {
                          ...parsedData.personalInfo,
                          summary: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {parsedData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button onClick={addSkill} type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              {parsedData.experience.map((exp, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{exp.title}</CardTitle>
                    <CardDescription>
                      {exp.company} • {exp.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`exp-start-${index}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`exp-start-${index}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => {
                              const updatedExperience = [
                                ...parsedData.experience,
                              ];
                              updatedExperience[index].startDate =
                                e.target.value;
                              setParsedData({
                                ...parsedData,
                                experience: updatedExperience,
                              });
                            }}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                          <Input
                            id={`exp-end-${index}`}
                            type={exp.endDate === "Present" ? "text" : "month"}
                            value={exp.endDate}
                            onChange={(e) => {
                              const updatedExperience = [
                                ...parsedData.experience,
                              ];
                              updatedExperience[index].endDate = e.target.value;
                              setParsedData({
                                ...parsedData,
                                experience: updatedExperience,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                        <Textarea
                          id={`exp-desc-${index}`}
                          rows={3}
                          value={exp.description}
                          onChange={(e) => {
                            const updatedExperience = [
                              ...parsedData.experience,
                            ];
                            updatedExperience[index].description =
                              e.target.value;
                            setParsedData({
                              ...parsedData,
                              experience: updatedExperience,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              {parsedData.education.map((edu, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <CardDescription>
                      {edu.institution} • {edu.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`edu-grad-${index}`}>
                          Graduation Date
                        </Label>
                        <Input
                          id={`edu-grad-${index}`}
                          type="month"
                          value={edu.graduationDate}
                          onChange={(e) => {
                            const updatedEducation = [...parsedData.education];
                            updatedEducation[index].graduationDate =
                              e.target.value;
                            setParsedData({
                              ...parsedData,
                              education: updatedEducation,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Original</Button>
          <Button>Save Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
