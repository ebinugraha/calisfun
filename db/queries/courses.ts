import { cache } from "react";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { challengeProgress, courses, units } from "../schema";
import { auth } from "@clerk/nextjs/server";
import { getUserProgress } from "./user-progrss";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getCoursebyId = cache(async (id: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
    // TODO: get and units lessons
  });

  return data;
});

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenge: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenge.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});
