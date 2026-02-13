import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const [projects, agents, votes] = await Promise.all([
      query("SELECT COUNT(*) as cnt FROM projects"),
      query("SELECT COUNT(*) as cnt FROM agents WHERE status = 'active'"),
      query("SELECT COUNT(*) as cnt FROM votes"),
    ]);

    return NextResponse.json({
      totalProjects: Number(projects[0]?.cnt) || 0,
      activeAgents: Number(agents[0]?.cnt) || 0,
      totalVotes: Number(votes[0]?.cnt) || 0,
      cohorts: 2,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
