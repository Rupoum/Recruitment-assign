import { NextApiRequest, NextApiResponse } from "next";

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextApiRequest, res: NextApiRequest) {
  const session = await getServerSession();
  console.log(session.user?.email);
  if (!process.env.GEMINI_API) {
    return new NextResponse("Error", { status: 500 });
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log(process.env.GEMINI_API); //   const prompt = "Explain how AI works";

  try {
    const filePath = path.resolve("./test.pdf");
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist.");
    }

    const fileContent = fs.readFileSync(filePath);
    if (!fileContent) {
      throw new Error("File is empty.");
    }

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(fileContent).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      "Extract the following information from the resume: Name, Title, Email, Phone, Location, Summary, Skills, Experience (including title, company, location, start date, end date, and description), and Education (including degree, institution, location, and graduation date). Format the response as JSON with appropriate keys.",
    ]);

    console.log(result);
    return new NextResponse(result.response.text(), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
