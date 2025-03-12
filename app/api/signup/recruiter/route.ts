import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, role } = body;
  if (!email || !password || !role) {
    return new NextResponse("Provide all fields", { status: 400 });
  }

  const exsist = await prisma.recruiter.findUnique({
    where: {
      email: email,
    },
  });

  if (exsist) {
    return new NextResponse("User already exist", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const recruiter = await prisma.recruiter.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  return NextResponse.json(recruiter);
}
