import { NextResponse } from "next/server";
import { cache } from "react";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  try {
    const userProgressData = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId!),
    });
    if (!userProgressData) {
      return NextResponse.json({
        message: "No progress data found for the user.",
        data: null,
      });
    }

    return NextResponse.json({
      message: "success",
      data: userProgressData,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);

    return NextResponse.json({
      message: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
