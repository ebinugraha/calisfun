"use server";

import db from "@/db/drizzle";
import { getCoursebyId } from "@/db/queries/courses";
import { getUserProgress } from "@/db/queries/user-progrss";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const setCourse = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const course = await getCoursebyId(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  

  // if(!course.units.length || !course.units[0].lesson.length) {
  //     throw new Error("Course not available");
  // }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.username || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId: userId,
    activeCourseId: courseId,
    userName: user.username || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  //   Mememberi cache baru
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
