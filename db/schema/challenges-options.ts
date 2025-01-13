import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { challenges } from "./challenges";
import { relations } from "drizzle-orm";

export const challengesOptions = pgTable("challenges_options", {
  id: serial("id").primaryKey(),
  imageSrc: text("image_src").notNull(),
  audioSrc: text("audio_src").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
});

export const challengesOptionsRelations = relations(
  challengesOptions,
  ({ one }) => ({
    challenges: one(challenges, {
      fields: [challengesOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export type ChallengeOptionType = typeof challengesOptions.$inferSelect;
