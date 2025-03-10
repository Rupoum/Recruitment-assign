import Link from "next/link";
import { ArrowRight, FileText, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
// const date = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* header */}
      <header className=" w-full ">
        <div className=" flex items-center justify-between py-4 px-14">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ResuMatch</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Button asChild className="bg-black text-white">
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>
      {/* main */}
      <main className="flex-1 mt-4">
        <section className="py-20 md:py-32">
          <div className=" flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              Intelligent Resume Processing & Job Matching
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-2xl text-muted-foreground">
              Our AI-powered platform analyzes resumes, matches candidates to
              jobs, and helps both recruiters and job seekers make better
              connections.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-black text-white">
                <Link href="/register?role=recruiter">
                  I&apos;m a Recruiter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/register?role=candidate">
                  I&apos;m a Job Seeker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className=" py-16 bg-muted/50">
          <div className="px-16">
            <h2 className="text-5xl font-bold tracking-tight text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-slate-100 rounded-lg shadow-lg">
                <FileText className="h-12 w-12 mb-4 text-black" />
                <h3 className="text-xl font-bold mb-2">Resume Parsing</h3>
                <p className="text-muted-foreground">
                  Extract structured information from resumes including contact
                  details, skills, work experience, and education.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-slate-100 rounded-lg shadow-lg">
                <Search className="h-12 w-12 mb-4 text-black" />
                <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Our algorithm matches job postings with candidate profiles,
                  identifying relevant skills and generating compatibility
                  scores.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-slate-100 rounded-lg shadow-lg">
                <Users className="h-12 w-12 mb-4 text-black" />
                <h3 className="text-xl font-bold mb-2">Applicant Tracking</h3>
                <p className="text-muted-foreground">
                  Analyze resumes against job descriptions, identify missing
                  keywords, and provide actionable feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}

      <footer className=" py-6 px-5">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 ResuMatch. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
