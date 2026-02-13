import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/activity — list activity log (optional ?limit, default 50)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);

    const rows = await query(
      "SELECT * FROM activity_log ORDER BY id DESC LIMIT ?",
      [limit]
    );
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
