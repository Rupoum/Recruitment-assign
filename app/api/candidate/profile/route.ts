import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log(session.user?.email);
  const email = session.user?.email;

  //  finding the user
  const user = await prisma.user.findUnique({
    where: {
      email: email || undefined,
    },
  });
  const resumeUrl = user?.fileUrl;
  //   console.log(user?.fileUrl);

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  //  user profile from resume
  const userProfile = await prisma.userProfile.findUnique({
    where: {
      userEmail: email || undefined,
    },
    include: {
      experience: true,
      education: true,
    },
  });

  const applied = await prisma.userProfile.findUnique({
    where: {
      userEmail: email || undefined,
    },
    select: {
      applied: true,
    },
  });
  console.log(applied);

  if (!userProfile) {
    return new NextResponse("No Profile Data", { status: 404 });
  }

  //nopt needed now might use later to add more data
  const userData = {
    ...user,

    userProfile,
  };
  const userwithResume = {
    ...userProfile,
    ...applied,
    resumeUrl,
  };
  return new NextResponse(JSON.stringify(userwithResume), {
    status: 200,
  });
}
