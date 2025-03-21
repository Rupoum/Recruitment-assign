import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
export async function GET() {
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

  const jobsWithApplicants = await Promise.all(
    jobs.map(async (job) => {
      const applicants = await prisma.userProfile.findMany({
        where: {
          id: {
            in: job.applicants,
          },
        },
        include: {
          user: {
            select: {
              fileUrl: true,
            },
          },
        },
      });

      return {
        ...job,
        applicants: applicants.map((applicant) => ({
          ...applicant,
          fileUrl: applicant.user.fileUrl,
        })),
      };
    })
  );
  // console.log(jobsWithApplicants, "applicants details");
  return new NextResponse(JSON.stringify(jobsWithApplicants), { status: 200 });

  return new NextResponse("Hello", { status: 200 });
}
