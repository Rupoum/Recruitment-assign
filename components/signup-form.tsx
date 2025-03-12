"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") || "candidate";
  const [role, setRole] = useState(defaultRole);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: defaultRole,
  });

  const router = useRouter();

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/signup", data);

    const userData = response.data;
    console.log(userData);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2"
      >
        <FileText className="h-6 w-6" />
        <span className="text-xl font-bold">ResuMatch</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={data.email}
              onChange={(e) => {
                setData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => {
                setData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label>Account Type</Label>
            <RadioGroup
              defaultValue={role}
              value={role}
              onValueChange={(value) => {
                setRole(value);
                setData((prev) => ({ ...prev, role: value }));
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="recruiter"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                    role === "recruiter" ? "bg-black text-white" : "bg-popover"
                  }`}
                >
                  <span>Recruiter</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="candidate"
                  id="candidate"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="candidate"
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                    role === "candidate" ? "bg-black text-white" : "bg-popover"
                  }`}
                >
                  <span>Job Seeker</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-black shadow-black shadow-sm"
            onClick={registerUser}
          >
            Create account
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
