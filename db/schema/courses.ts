import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { userProgress } from "./user-progress";
import { units } from "./units";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  description: text("description").notNull(),
});

export const coursesRelation = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units)
}));

export type CoursesType = typeof courses.$inferSelect;
