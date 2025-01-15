import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { cache } from "react";

// Create API route handler
export async function GET(req: Request) {
    try {
      // Get authenticated user info
      const { userId } = await auth();
      
      // Fetch courses from the database
      const coursesData = await db.query.courses.findMany();
  
      if (!coursesData) {
        return NextResponse.json({
          message: "No courses found.",
          data: null,
        });
      }
  
      return NextResponse.json({
        message: "success",
        data: coursesData,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
  
      return NextResponse.json({
        message: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }