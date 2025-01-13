import { cache } from "react";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { courses } from "../schema";

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
