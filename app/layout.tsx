import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResuMatch - Intelligent Resume Processing & Job Matching",
  description: "AI-powered platform for resume parsing and job matching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
