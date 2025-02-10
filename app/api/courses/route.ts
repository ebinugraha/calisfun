import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";

// Create API route handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    // Fetch courses from the database
    const coursesData = await db.query.courses.findMany();

    if (!coursesData) {
      return NextResponse.json({
        message: "No courses found.",
        data: null,
      });
    }

    return NextResponse.json(coursesData);
  } catch (error) {
    console.error("Error fetching courses:", error);

    return NextResponse.json({
      message: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = await db.insert(courses).values({...body,}).returning();

  return NextResponse.json(data[0]);
};
