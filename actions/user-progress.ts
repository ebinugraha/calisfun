"use server";

import db from "@/db/drizzle";
import { getCoursebyId } from "@/db/queries/courses";
import { getUserProgress } from "@/db/queries/user-progrss";
import { challengeProgress, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { challenges } from "../db/schema/challenges";
import { getUserSubscription } from "@/db/queries/user-subscription";

const POINTS_TO_REFILL = 10;

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

  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error("Course not available");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.username || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      })
      .where(eq(userProgress.userId, userId));

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

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  const userSubscription = await getUserSubscription();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  // Todo get user

  const challenge2 = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge2) {
    throw new Error("Challenge not found");
  }

  console.log("ini ada");

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId!),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return {
      error: "practice",
    };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (userSubscription?.isActive) {
    return {
      error: "subscription",
    };
  }

  if (currentUserProgress.hearts === 0) {
    return {
      error: "hearts",
    };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId!));

  const lessonId = challenge2.lessonId;

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("user progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough point");
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
};
