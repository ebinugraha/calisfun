import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { relations } from "drizzle-orm";
import { lessons } from "./lessons";

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitRelation = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export type UnitType = typeof units.$inferSelect;
