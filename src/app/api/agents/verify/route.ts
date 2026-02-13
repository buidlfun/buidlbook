import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getNbookBalance, meetsThreshold, BOOK_THRESHOLD } from "@/lib/bbook";

// POST /api/agents/verify — verify an agent's on-chain $BOOK balance
export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json({ error: "wallet is required" }, { status: 400 });
    }

    const agents = await query("SELECT * FROM agents WHERE wallet = ?", [wallet]);
    if (agents.length === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const agent = agents[0];
    const onChainBalance = await getNbookBalance(wallet);
    const verified = onChainBalance > 0;
    const effectiveBalance = verified ? onChainBalance : Number(agent.nbook_balance);
    const eligible = meetsThreshold(effectiveBalance);
    const newStatus = eligible ? "active" : "pending";

    // Update DB with latest balance and status
    await query(
      "UPDATE agents SET nbook_balance = ?, status = ? WHERE id = ?",
      [effectiveBalance, newStatus, agent.id]
    );

    return NextResponse.json({
      wallet,
      agent_name: agent.name,
      on_chain_balance: onChainBalance,
      effective_balance: effectiveBalance,
      threshold: BOOK_THRESHOLD,
      eligible,
      status: newStatus,
      verification: verified ? "on-chain" : "mock (no contract configured)",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
