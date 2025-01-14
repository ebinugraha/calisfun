import { cache } from "react";
import { getUserProgress } from "./user-progrss";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { challengeProgress, units } from "../schema";
import { auth } from "@clerk/nextjs/server";

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();
  const { userId } = await auth();

  if (!userProgress) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId , userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenge: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId!),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenge = lesson.challenge.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenge };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
