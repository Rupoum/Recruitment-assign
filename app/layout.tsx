import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./context/Provider";
import { Session } from "next-auth";

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
      <Provider>
        {" "}
        <body className={` antialiased`} suppressHydrationWarning>
          {children}
        </body>
      </Provider>
    </html>
  );
}
