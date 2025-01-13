import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { units } from "./units";
import { relations } from "drizzle-orm";
import { challenges } from "./challenges";

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
    order: integer("order").notNull()
});

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenge: many(challenges),
}));

export type LessonType = typeof lessons.$inferSelect;