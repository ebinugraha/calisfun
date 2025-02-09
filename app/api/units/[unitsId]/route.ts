import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { units } from "@/db/schema";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: number }> }
) => {
  try {
    const { userId } = await auth();

    const { unitsId } = await params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }

    const dataUnits = await db.query.units.findFirst({
      where: eq(units.id, unitsId),
    });

    return NextResponse.json(dataUnits);
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 402 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: number }> }
) => {
  try {
    const body = await req.json();
    const { unitsId } = await params;

    const data = await db
      .update(units)
      .set({
        ...body,
      })
      .where(eq(units.id, unitsId))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 402 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ unitsId: number }> }
) => {
  try {
    const { unitsId } = await params;

    if (!unitsId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 402 });
    }

    const data = await db
      .delete(units)
      .where(eq(units.id, unitsId))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 402 });
  }
};
