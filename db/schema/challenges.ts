import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { lessons } from "./lessons";
import { relations } from "drizzle-orm";
import { challengesOptions } from "./challenges-options";
import { challengeProgress } from "./challenges-progress";

export const challengesEnum = pgEnum("type", ["SELECT", "HINT"]);

export const challenges = pgTable("challenge", {
  id: serial("id").primaryKey(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  imageSrc: text("image_src"),
  order: integer("order").notNull(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const challengeRelations = relations(challenges, ({ one, many }) => ({
  lessons: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengesOptions),
  challengeProgress: many(challengeProgress)
}));

export type ChallengeType = typeof challenges.$inferSelect;
