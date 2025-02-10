import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { CourseNotFoundModal } from "@/components/modals/course-not-found-modal";

const nunitoFont = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Calisfun",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${nunitoFont.className} antialiased`}
        >
          <Toaster/>
          <PracticeModal/>
          <ExitModal/>
          <HeartsModal/>
          <CourseNotFoundModal/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
