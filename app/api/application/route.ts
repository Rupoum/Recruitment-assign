import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextResponse, res: NextResponse) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const email = session.user?.email;

  const { jobId } = await req.json();
  console.log("Job Id:", jobId);
  if (!jobId) {
    return new NextResponse("Job Id not provided", { status: 400 });
  }

  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        userEmail: email || undefined,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updateProfile = await prisma.userProfile.update({
      where: {
        userEmail: email || undefined,
      },
      data: {
        applied: {
          push: jobId,
        },
      },
    });

    return new NextResponse(JSON.stringify(updateProfile), { status: 200 });
  } catch (error) {
    console.error("Error updating user Profile", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextResponse, res: NextResponse) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;

  try {
    const user = await prisma.userProfile.findUnique({
      where: {
        userEmail: email || undefined,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const jobDetails = await prisma.job.findMany({
      where: {
        id: {
          in: user.applied,
        },
      },
    });

    return new NextResponse(JSON.stringify(jobDetails), { status: 200 });
  } catch (error) {
    console.log("Error fetching job details", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
