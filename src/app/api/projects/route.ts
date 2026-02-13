import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { logActivity } from "@/lib/activity";

export async function GET() {
  try {
    const rows = await query(
      "SELECT * FROM projects ORDER BY CASE WHEN rank IS NOT NULL THEN rank ELSE 9999 END ASC, created_at DESC"
    );

    // Calculate consensus per project from real vote data
    const allVotes = await query("SELECT project_id, score FROM votes");
    const votesByProject: Record<number, number[]> = {};
    for (const v of allVotes) {
      const pid = Number(v.project_id);
      if (!votesByProject[pid]) votesByProject[pid] = [];
      votesByProject[pid].push(Number(v.score));
    }

    const enriched = rows.map((p: any) => {
      const scores = votesByProject[Number(p.id)] || [];
      let consensus: number | null = null;
      if (scores.length >= 2) {
        const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((sum, s) => sum + (s - mean) ** 2, 0) / scores.length;
        const stdDev = Math.sqrt(variance);
        consensus = Math.max(0, Math.round(100 - (stdDev / 50) * 100));
      } else if (scores.length === 1) {
        consensus = 100;
      }
      return { ...p, consensus };
    });

    return NextResponse.json(enriched);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, ticker, description, team, tokenomics, pitch, website, twitter, github, category, stage } = body;

    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
    }

    await query(
      `INSERT INTO projects (name, ticker, description, team, tokenomics, pitch, website, twitter, github, category, stage)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, ticker || null, description, team || null, tokenomics || null, pitch || null, website || null, twitter || null, github || null, category || "DeFi", stage || "Pre-seed"]
    );

    await logActivity({
      action: "Project Submitted",
      method: "POST",
      endpoint: "/api/projects",
      project_name: name,
      status_code: 200,
      detail: `Ticker: ${ticker || "N/A"}, Category: ${category || "DeFi"}, Stage: ${stage || "Pre-seed"}`,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    await logActivity({ action: "Project Submission Failed", method: "POST", endpoint: "/api/projects", status_code: 500, detail: e.message });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
