import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema/";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

const main = async () => {
  try {
    console.log("seeding database..");

    await db.delete(schema.userProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);


    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "1 + 1 = ?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "HINT",
        order: 2,
        imageSrc: '/singa.svg',
        question: "Be_ua_g ? ",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "2 + 3 = ? ",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        audioSrc: "/1.mp3",
        challengeId: 1,
        correct: false,
        imageSrc: "/1.svg",
        text: "1",
      },
      {
        audioSrc: "/2.svg",
        challengeId: 1,
        correct: true,
        imageSrc: "/2.svg",
        text: "2",
      },
      {
        audioSrc: "/3.svg",
        challengeId: 1,
        correct: false,
        imageSrc: "/3.svg",
        text: "3",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 2,
        correct: false,
        text: "Singa",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Beruang",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Gajah",
      },
    ]);

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 3,
        correct: true,
        text: "5",
      },
      {
        challengeId: 3,
        correct: false,
        text: "0",
      },
      {
        challengeId: 3,
        correct: false,
        text: "3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: "1 + 1 = ?",
      },
      {
        id: 5,
        lessonId: 2,
        type: "HINT",
        order: 2,
        imageSrc: '/bear.svg',
        question: "Hewan apakah ini ? ",
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: "2 + 3 = ? ",
      },
    ]);

    console.log("database seeded");
  } catch (e) {
    console.error(e);
    throw new Error("Failed to seed database");
  }
};

main();
