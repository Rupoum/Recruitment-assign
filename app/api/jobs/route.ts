import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Request) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const email = session.user?.email;

  const body = await req.json();
  const {
    title,
    type,
    location,
    salary,
    description,
    requirements,
    skills,
    company,
  } = body;
  if (
    !title ||
    !type ||
    !location ||
    !salary ||
    !description ||
    !requirements ||
    !skills ||
    !company
  ) {
    return new NextResponse("Provide all fields", { status: 400 });
  }

  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: {
        email: email || undefined,
      },
    });

    if (!recruiter) {
      return new NextResponse("User not found", { status: 404 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        type,
        location,
        company,
        salary,
        description,
        requirements,
        skills,
        recruiter: {
          connect: {
            email: email || undefined,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(job), { status: 200 });
  } catch (e) {
    return new NextResponse(e, { status: 500 });
  }
}
export async function GET(req: Request, res: Request) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;
  const recruiter = await prisma.recruiter.findUnique({
    where: {
      email: email || undefined,
    },
  });
  if (!recruiter) {
    return new NextResponse("User not found", { status: 404 });
  }

  const jobs = await prisma.job.findMany({
    where: {
      recruiter: {
        email: email || undefined,
      },
    },
  });
  return new NextResponse(JSON.stringify(jobs), { status: 200 });

  return new NextResponse("Hello", { status: 200 });
}
