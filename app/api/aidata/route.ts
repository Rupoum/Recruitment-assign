import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiRequest) {
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
      "Extract the following information from the resume: Name, Title, Email, Phone, Location, Summary, Skills, Experience (including title, company, location, start date, end date, and description), and Education (including degree, institution, location, and graduation date). Format the response as JSON with appropriate keys. Ensure the JSON response starts directly with the opening curly brace `{` and ends with the closing curly brace `}`. Do not include any additional text like json or explanations or ```. Always follow this exact format for the JSON keys: Name, Title, Email, Phone, Location, Summary, Skills, Experience, Education.",
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
