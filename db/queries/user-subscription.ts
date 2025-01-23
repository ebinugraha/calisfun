import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { userSubscription } from "../schema";

const DAY_IN_MS = 86_400_000;

export const getUserSubscription = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) {
    return null;
  }

  const isActice =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()

  return {
    ...data,
    isActive: !!isActice,
  };
});
