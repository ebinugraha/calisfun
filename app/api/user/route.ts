import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        return NextResponse.json({ message: "success" });
    } catch (error) {
        return NextResponse.json({ message: "failed" });
    }
}