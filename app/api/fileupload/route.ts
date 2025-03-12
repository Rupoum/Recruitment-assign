import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const { base64File, filename, user } = await req.json();
    if (!base64File || !filename || !user) {
      throw new Error(
        "Missing base64File or filename or user email in request body"
      );
    }
    console.log(user.email);

    // const storageAccount = process.env.AZURE_STORAGE_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER;
    // const accessKey = process.env.AZURE_STORAGE_ACCESS_KEY;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Missing connection string in environment variables");
    }
    if (!containerName) {
      throw new Error("Missing container name in environment variables");
    }
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const fileBuffer = Buffer.from(base64File, "base64");
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: "application/pdf" },
    });
    const fileUrl = blockBlobClient.url;
    const updateUser = await prisma.user.update({
      where: { email: user.email },
      data: { fileUrl: fileUrl },
    });
    console.log(updateUser);
    return new NextResponse("File uploaded successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(e, { status: 500 });
  }
}
