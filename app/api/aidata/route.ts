import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!process.env.GEMINI_API) {
    return new NextResponse("Error with API key", { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  const email = session.user?.email;
  if (!email) {
    return new NextResponse("No email found", { status: 404 });
  }

  const pdfPath = "Fetchedresume.pdf";
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !user.fileUrl) {
      return new NextResponse("No file found", { status: 404 });
    }

    // Fetch the PDF file from the URL
    const pdfBuffer = await fetch(user.fileUrl).then((response) => {
      return response.arrayBuffer();
    });

    const binaryPdf = Buffer.from(pdfBuffer);
    fs.writeFileSync(pdfPath, binaryPdf, "binary");
    console.log("File saved");

    // Upload the PDF file to Google AI
    const uploadResult = await fileManager.uploadFile(pdfPath, {
      mimeType: "application/pdf",
      displayName: "Candidate Resume",
    });

    console.log("File uploaded:", uploadResult.file.uri);

    const result = await model.generateContent([
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
      "Extract the following information from the resume: Name, Title, Email, Phone, Location, Summary, Skills, Experience or Work Experience (including title, company, location, start date, end date, and description), and Education (including degree, institution, location, and graduation date). Format the response as JSON with appropriate keys. Ensure the JSON response starts directly with the opening curly brace `{` and ends with the closing curly brace `}`. Do not include any additional text like json or explanations or ```.Name should always be string ,Title should always be a string ,Email should always be a string,Phone should always be a string,Location should always  be a string,Summary should always be a string ,Skills should always be 1D array.Experience should be an array of objects which will have title ,comapany,location,startDate,endDate,description.Always follow this format and do give back pnly and only this response,Education should be an array of objects and will have degree institution,location,graduationDate.If you dont get any field leave it empty but dont send any extra data or dont change the format. Always follow this exact format for the JSON keys: Name, Title, Email, Phone, Location, Summary, Skills, Experience, Education.",
    ]);

    const text = await result.response.text();
    console.log("Initial response:", text);

    const jsonStartIndex = text.indexOf("{");
    const jsonEndIndex = text.lastIndexOf("}");
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Invalid JSON response");
    }

    const jsonData = text.substring(jsonStartIndex, jsonEndIndex + 1);
    console.log("Final JSON:", jsonData);

    fs.unlinkSync(pdfPath);
    console.log("File deleted");

    return new NextResponse(jsonData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userEmail = session.user?.email;

  const { email, data } = body;
  if (!email || !data) {
    return new NextResponse("Provide all fields", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail || undefined,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userEmail: userEmail || undefined,
      },
    });

    if (userProfile) {
      // Update existing profile
      const updatedProfile = await prisma.userProfile.update({
        where: {
          userEmail: userEmail || undefined,
        },
        data: {
          name: data.personalInfo.name,
          title: data.personalInfo.title,
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          location: data.personalInfo.location,
          summary: data.personalInfo.summary,
          skills: data.skills,
          experience: {
            deleteMany: {},
            create: data.experience.map(
              (exp: {
                title: string;
                company: string;
                location: string;
                startDate: string;
                endDate?: string;
                description: string;
              }) => ({
                title: exp.title,
                company: exp.company,
                location: exp.location,
                startDate: exp.startDate,
                endDate: exp.endDate || " ",
                description: exp.description,
              })
            ),
          },
          education: {
            deleteMany: {},
            create: data.education.map(
              (edu: {
                degree: string;
                institution: string;
                location: string;
                graduationDate: string;
              }) => ({
                degree: edu.degree,
                institution: edu.institution,
                location: edu.location,
                graduationDate: edu.graduationDate || null,
              })
            ),
          },
        },
      });

      return new NextResponse(JSON.stringify(updatedProfile), { status: 200 });
    } else {
      // Create new profile
      const newProfile = await prisma.userProfile.create({
        data: {
          name: data.personalInfo.name,
          title: data.personalInfo.title,
          userEmail: userEmail || "",
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          location: data.personalInfo.location,
          summary: data.personalInfo.summary,
          skills: data.skills,
          experience: {
            create: data.experience.map(
              (exp: {
                title: string;
                company: string;
                location: string;
                startDate: string;
                endDate?: string;
                description: string;
              }) => ({
                title: exp.title,
                company: exp.company,
                location: exp.location,
                startDate: exp.startDate,
                endDate: exp.endDate || " ",
                description: exp.description,
              })
            ),
          },
          education: {
            create: data.education.map(
              (edu: {
                degree: string;
                institution: string;
                location: string;
                graduationDate: string;
              }) => ({
                degree: edu.degree,
                institution: edu.institution,
                location: edu.location,
                graduationDate: edu.graduationDate || null,
              })
            ),
          },
        },
      });

      return new NextResponse(JSON.stringify(newProfile), { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
