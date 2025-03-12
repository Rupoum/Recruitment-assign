// import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse, res: NextResponse) {
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
      "Extract the following information from the resume: Name, Email, and Skills. Format the response as JSON with keys 'name', 'email', and 'skills'.",
    ]);

    console.log(result);
    return new NextResponse(result.response.text(), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
