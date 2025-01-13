import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import db from "../drizzle";
import { userProgress } from "../schema";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCouse: true,
    },
  });

  return data;
});
