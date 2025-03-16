"use client";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-40 border-b bg-background transition-transform duration-300 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex h-16 px-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <span className="text-xl font-bold">ResuMatch</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href={""}
              className="text-sm font-medium hover:underline"
              onClick={() => {
                toast.error("Settings not available yet", {});
              }}
            >
              Settings
            </Link>
            <Button onClick={() => signOut()}>Log out</Button>
          </nav>
        </div>
      </header>
      <div className="   flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 px-14">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[100vh] w-full shrink-0 md:sticky md:block border-r-2">
          <div className="h-full py-6 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              <Link
                href=""
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href=""
                onClick={() => {
                  toast.error("Profile not available yet", {});
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Profile
              </Link>
              <Link
                href=""
                onClick={() => {
                  toast.error("Comming Soon !");
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Messages
              </Link>
              <Link
                href=""
                onClick={() => {
                  toast.error("Not available yet");
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Settings
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">
          <div className="grid gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
