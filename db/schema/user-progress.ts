import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { relations } from "drizzle-orm";

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }).notNull(),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(50),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCouse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export type UserProgressType = typeof userProgress.$inferSelect;
