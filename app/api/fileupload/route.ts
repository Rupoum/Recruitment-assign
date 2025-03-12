import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(req: Request) {
  try {
    const { base64File, filename } = await req.json();
    if (!base64File || !filename) {
      throw new Error("Missing base64File or filename in request body");
    }

    const storageAccount = process.env.AZURE_STORAGE_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER;
    const accessKey = process.env.AZURE_STORAGE_ACCESS_KEY;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const fileBuffer = Buffer.from(base64File, "base64");
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: "application/pdf" },
    });
    return new NextResponse("File uploaded successfully", { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(e.message, { status: 500 });
  }
}
