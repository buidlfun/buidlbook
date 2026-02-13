import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { logActivity } from "@/lib/activity";

// DELETE /api/agents/:id
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);
    const agent = await query("SELECT name FROM agents WHERE id = ?", [id]);
    await query("DELETE FROM votes WHERE agent_id = ?", [id]);
    await query("DELETE FROM agents WHERE id = ?", [id]);

    await logActivity({
      action: "Agent Deleted (Admin)",
      method: "DELETE",
      endpoint: `/api/agents/${id}`,
      agent_name: agent[0]?.name || `#${id}`,
      status_code: 200,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
