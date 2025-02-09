import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }

    const units = await db.query.units.findMany();

    return NextResponse.json(units);
    
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 402 });
  }
};
