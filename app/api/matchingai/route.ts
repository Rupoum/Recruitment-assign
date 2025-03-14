import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
if (process.env.GEMINI_API === undefined) {
  throw new Error("GEMINI_API is not defined");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const userEmail = session.user?.email;
    if (!userEmail) {
      return new NextResponse("User email not found", { status: 404 });
    }

    // Fetch the user's skills
    const userProfile = await prisma.userProfile.findUnique({
      where: { userEmail },
      select: { skills: true },
    });

    if (!userProfile || !userProfile.skills.length) {
      return new NextResponse("User profile or skills not found", {
        status: 404,
      });
    }

    const userSkills = userProfile.skills;

    // Fetch all jobs
    const jobs = await prisma.job.findMany({
      select: { id: true, title: true, company: true, skills: true },
    });

    if (!jobs.length) {
      return new NextResponse("No jobs found", { status: 404 });
    }

    // Generate AI prompt
    const prompt = `
      The candidate has the following skills: ${userSkills.join(", ")}.
      Compare these skills with the required skills for each of the following job listings:
      
      ${jobs
        .map(
          (job) =>
            `Job ID: ${job.id}, Title: ${job.title}, Company: ${
              job.company
            }, Required Skills: ${job.skills.join(", ")}`
        )
        .join("\n\n")}

      For each job, calculate the matching percentage based on relevance, list the matching skills, the missing skills, and provide improvement suggestions.
      Return the response as a JSON array where each object has the fields: jobId, jobTitle, company, matchPercentage, matchingSkills, missingSkills, and improvementSuggestions you shpuld address as second person .
    `;

    // Send request to Gemini AI
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
    const result = await model.generateContent([prompt]);

    const text = await result.response.text();

    // Extract JSON response
    const jsonStartIndex = text.indexOf("[");
    const jsonEndIndex = text.lastIndexOf("]");
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Invalid JSON response");
    }

    const jsonData = text.substring(jsonStartIndex, jsonEndIndex + 1);

    return new NextResponse(jsonData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
