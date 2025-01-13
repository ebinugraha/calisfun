import { cache } from "react";
import { getUserProgress } from "./user-progrss";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { units } from "../schema";

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    return [];
  }
  
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId), 
    with: {
      lessons: {
        with: {
          challenge: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });
});
