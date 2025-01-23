import { cache } from "react";
import { getUserProgress } from "./user-progrss";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { challengeProgress, lessons, units } from "../schema";
import { auth } from "@clerk/nextjs/server";
import { challenges } from "../schema/challenges";

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();
  const { userId } = await auth();

  if (!userProgress) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenge: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],

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
      if (lesson.challenge.length === 0) {
        return { ...lesson, completed: false };
      }

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
