import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema/";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

const main = async () => {
  try {
    console.log("Reseting database..");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    console.log("database Reseted");
  } catch (e) {
    console.error(e);
    throw new Error("Failed to Reset database");
  }
};

main();
