// import { NextApiRequest, NextApiResponse } from "next";

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";

// export async function GET(req: NextApiRequest, res: NextApiRequest) {
//   const session = await getServerSession();
//   console.log(session.user?.email);
//   if (!process.env.GEMINI_API) {
//     return new NextResponse("Error", { status: 500 });
//   }
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   console.log(process.env.GEMINI_API); //   const prompt = "Explain how AI works";

//   try {
//     const filePath = path.resolve("./test.pdf");
//     console.log(filePath);
//     if (!fs.existsSync(filePath)) {
//       throw new Error("File does not exist.");
//     }

//     const fileContent = fs.readFileSync(filePath);
//     if (!fileContent) {
//       throw new Error("File is empty.");
//     }

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: Buffer.from(fileContent).toString("base64"),
//           mimeType: "application/pdf",
//         },
//       },
//       "Extract the following information from the resume: Name, Title, Email, Phone, Location, Summary, Skills, Experience (including title, company, location, start date, end date, and description), and Education (including degree, institution, location, and graduation date). Format the response as JSON with appropriate keys.",
//     ]);

//     console.log(result);
//     return new NextResponse(result.response.text(), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new NextResponse("Error", { status: 500 });
//   }
// }
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
    return new NextResponse("unauthorised", { status: 500 });
  }
  if (!process.env.GEMINI_API) {
    return new NextResponse("Error with api key ", { status: 500 });
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

    const pdfBuffer = await fetch(user.fileUrl).then((response) => {
      return response.arrayBuffer();
    });

    const binaryPdf = Buffer.from(pdfBuffer);
    fs.writeFileSync(pdfPath, binaryPdf, "binary");
    console.log("File saved");

    const uploadResult = await fileManager.uploadFile(pdfPath, {
      mimeType: "application/pdf",
      displayName: "Candidate Resume",
    });

    console.log(uploadResult.file.uri);

    const result = await model.generateContent([
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
      "Extract the following information from the resume: Name, Title, Email, Phone, Location, Summary, Skills, Experience (including title, company, location, start date, end date, and description), and Education (including degree, institution, location, and graduation date). Format the response as JSON with appropriate keys.",
    ]);
    console.log(result.response.text());
    fs.unlinkSync(pdfPath);
    console.log("File deleted");

    return new NextResponse(result.response.text(), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
