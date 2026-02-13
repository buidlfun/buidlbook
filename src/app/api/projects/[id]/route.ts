import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { logActivity } from "@/lib/activity";

// PATCH /api/projects/:id — update project status/rank
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const body = await req.json();
    const { status, rank } = body;
    const id = Number(idStr);

    const sets: string[] = [];
    const args: any[] = [];

    if (status !== undefined) { sets.push("status = ?"); args.push(status); }
    if (rank !== undefined) { sets.push("rank = ?"); args.push(rank); }
    sets.push("updated_at = datetime('now')");

    if (sets.length <= 1) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    args.push(id);
    await query(`UPDATE projects SET ${sets.join(", ")} WHERE id = ?`, args);

    await logActivity({
      action: "Project Updated (Admin)",
      method: "PATCH",
      endpoint: `/api/projects/${id}`,
      status_code: 200,
      detail: `Status: ${status || "unchanged"}, Rank: ${rank ?? "unchanged"}`,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/projects/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    const proj = await query("SELECT name FROM projects WHERE id = ?", [id]);
    await query("DELETE FROM votes WHERE project_id = ?", [id]);
    await query("DELETE FROM projects WHERE id = ?", [id]);

    await logActivity({
      action: "Project Deleted (Admin)",
      method: "DELETE",
      endpoint: `/api/projects/${id}`,
      project_name: proj[0]?.name || `#${id}`,
      status_code: 200,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
