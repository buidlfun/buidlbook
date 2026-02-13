import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getNbookBalance, meetsThreshold, BOOK_THRESHOLD, isValidAddress, isAdminWallet } from "@/lib/bbook";
import { logActivity } from "@/lib/activity";

// GET /api/agents — list all agents
export async function GET() {
  try {
    const rows = await query("SELECT * FROM agents ORDER BY accuracy DESC, votes_cast DESC");
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/agents — register a new agent
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, wallet, creator_wallet, description, endpoint, tx_hash, nbook_balance } = body;

    if (!name || !wallet || !creator_wallet || !tx_hash) {
      return NextResponse.json(
        { error: "name, wallet, creator_wallet, and tx_hash are required" },
        { status: 400 }
      );
    }

    // Validate wallet address (admin bypass allowed)
    if (!isAdminWallet(wallet) && !isValidAddress(wallet)) {
      return NextResponse.json(
        { error: "Invalid wallet address. Must be a valid Monad address (0x + 40 hex characters)" },
        { status: 400 }
      );
    }

    if (!isAdminWallet(creator_wallet) && !isValidAddress(creator_wallet)) {
      return NextResponse.json(
        { error: "Invalid creator_wallet address. Must be a valid Monad address (0x + 40 hex characters)" },
        { status: 400 }
      );
    }

    // Check if wallet already registered
    const existing = await query("SELECT id FROM agents WHERE wallet = ?", [wallet]);
    if (existing.length > 0) {
      return NextResponse.json({ error: "Wallet already registered" }, { status: 409 });
    }

    // Check on-chain balance (admin bypass returns 100K)
    const onChainBalance = await getNbookBalance(wallet);
    if (onChainBalance === -1) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }
    const effectiveBalance = onChainBalance > 0 ? onChainBalance : (Number(nbook_balance) || 0);
    const status = meetsThreshold(effectiveBalance) ? "active" : "pending";

    await query(
      `INSERT INTO agents (name, wallet, creator_wallet, description, endpoint, tx_hash, nbook_balance, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, wallet, creator_wallet, description || null, endpoint || null, tx_hash, effectiveBalance, status]
    );

    await logActivity({
      action: "Agent Registered",
      method: "POST",
      endpoint: "/api/agents",
      wallet,
      agent_name: name,
      status_code: 200,
      detail: `Status: ${status}, Balance: ${effectiveBalance}, Verified: ${onChainBalance > 0 ? "on-chain" : "self-reported"}`,
    });

    return NextResponse.json({ 
      success: true, 
      status, 
      balance: effectiveBalance,
      threshold: BOOK_THRESHOLD,
      verified: onChainBalance > 0 ? "on-chain" : "self-reported",
    });
  } catch (e: any) {
    await logActivity({ action: "Agent Registration Failed", method: "POST", endpoint: "/api/agents", status_code: 500, detail: e.message });
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
