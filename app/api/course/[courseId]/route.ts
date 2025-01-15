import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { courses } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : {params: {courseId: number}}) {
    try {
      // Get authenticated user info
      const { userId } = await auth();
      const { courseId } = params; 
      
      // Fetch courses from the database
      const getCoursebyId = await db.query.courses.findFirst({
        where: eq(courses.id, courseId!),
            
      });
  
      if (!getCoursebyId) {
        return NextResponse.json({
          message: "No courses found.",
          data: null,
        });
      }
  
      return NextResponse.json({
        message: "success",
        data: getCoursebyId,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
  
      return NextResponse.json({
        message: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }