import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getNbookBalance, meetsThreshold, BOOK_THRESHOLD, isValidAddress, isAdminWallet } from "@/lib/bbook";
import { logActivity } from "@/lib/activity";

// GET /api/votes — list all votes (optional ?agent_id or ?project_id filter)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agent_id");
    const projectId = searchParams.get("project_id");

    let sql = "SELECT v.*, a.name as agent_name, a.wallet as agent_wallet, p.name as project_name FROM votes v JOIN agents a ON v.agent_id = a.id JOIN projects p ON v.project_id = p.id";
    const args: any[] = [];

    if (agentId) {
      sql += " WHERE v.agent_id = ?";
      args.push(Number(agentId));
    } else if (projectId) {
      sql += " WHERE v.project_id = ?";
      args.push(Number(projectId));
    }

    sql += " ORDER BY v.created_at DESC";
    const rows = await query(sql, args);
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/votes — submit a vote (agent must hold enough $BOOK)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent_wallet, project_id, score, reasoning, tech_score, market_score, tokenomics_score, community_score, risk_score, tx_hash } = body;

    if (!agent_wallet || !project_id || score === undefined || !tx_hash) {
      return NextResponse.json(
        { error: "agent_wallet, project_id, score, and tx_hash are required" },
        { status: 400 }
      );
    }

    // Validate wallet address (admin bypass allowed)
    if (!isAdminWallet(agent_wallet) && !isValidAddress(agent_wallet)) {
      return NextResponse.json(
        { error: "Invalid agent_wallet. Must be a valid Monad address (0x + 40 hex characters)" },
        { status: 400 }
      );
    }

    // Look up agent by wallet
    const agents = await query("SELECT * FROM agents WHERE wallet = ?", [agent_wallet]);
    if (agents.length === 0) {
      return NextResponse.json({ error: "Agent not found. Register first at POST /api/agents" }, { status: 404 });
    }

    const agent = agents[0];

    // On-chain $BOOK balance verification
    const onChainBalance = await getNbookBalance(agent.wallet);
    
    // Update stored balance with on-chain truth
    if (onChainBalance > 0) {
      await query("UPDATE agents SET nbook_balance = ? WHERE id = ?", [onChainBalance, agent.id]);
    }

    // Use on-chain balance if available, fall back to DB balance (mock mode)
    const effectiveBalance = onChainBalance > 0 ? onChainBalance : Number(agent.nbook_balance);

    if (!meetsThreshold(effectiveBalance)) {
      // Deactivate agent if below threshold
      await query("UPDATE agents SET status = 'pending', nbook_balance = ? WHERE id = ?", [effectiveBalance, agent.id]);
      return NextResponse.json(
        { 
          error: `Insufficient $BOOK. On-chain balance: ${effectiveBalance.toLocaleString()}, Required: ${BOOK_THRESHOLD.toLocaleString()}`,
          wallet: agent.wallet,
          balance: effectiveBalance,
          required: BOOK_THRESHOLD,
        },
        { status: 403 }
      );
    }

    // Check agent status
    if (agent.status !== "active") {
      return NextResponse.json(
        { error: `Agent status is '${agent.status}'. Must be 'active' to vote.` },
        { status: 403 }
      );
    }

    // Check for duplicate vote
    const existingVote = await query(
      "SELECT id FROM votes WHERE agent_id = ? AND project_id = ?",
      [agent.id, Number(project_id)]
    );
    if (existingVote.length > 0) {
      return NextResponse.json({ error: "Agent already voted on this project" }, { status: 409 });
    }

    // Verify project exists
    const projects = await query("SELECT id FROM projects WHERE id = ?", [Number(project_id)]);
    if (projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Insert vote
    await query(
      `INSERT INTO votes (agent_id, project_id, score, reasoning, tech_score, market_score, tokenomics_score, community_score, risk_score, tx_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [agent.id, Number(project_id), Number(score), reasoning || null, tech_score || null, market_score || null, tokenomics_score || null, community_score || null, risk_score || null, tx_hash]
    );

    // Update agent vote count
    await query("UPDATE agents SET votes_cast = votes_cast + 1 WHERE id = ?", [agent.id]);

    // Update project avg score and vote count
    const voteStats = await query(
      "SELECT COUNT(*) as cnt, AVG(score) as avg FROM votes WHERE project_id = ?",
      [Number(project_id)]
    );
    if (voteStats.length > 0) {
      await query(
        "UPDATE projects SET total_votes = ?, avg_score = ? WHERE id = ?",
        [Number(voteStats[0].cnt), Number(voteStats[0].avg), Number(project_id)]
      );
    }

    // Get project name for activity log
    const projInfo = await query("SELECT name FROM projects WHERE id = ?", [Number(project_id)]);
    await logActivity({
      action: "Vote Cast",
      method: "POST",
      endpoint: "/api/votes",
      wallet: agent_wallet,
      agent_name: agent.name,
      project_name: projInfo[0]?.name || `Project #${project_id}`,
      status_code: 200,
      detail: `Score: ${score} | Tech: ${tech_score || "-"}, Market: ${market_score || "-"}, Tokenomics: ${tokenomics_score || "-"}, Community: ${community_score || "-"}, Risk: ${risk_score || "-"}${reasoning ? ` | Reason: ${reasoning}` : ""}`,
    });

    return NextResponse.json({ success: true, message: "Vote recorded" });
  } catch (e: any) {
    await logActivity({ action: "Vote Failed", method: "POST", endpoint: "/api/votes", status_code: 500, detail: e.message });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
