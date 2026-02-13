// $BOOK on-chain balance verification

const MONAD_RPC_URL = process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz";
const BOOK_CONTRACT = process.env.BOOK_CONTRACT_ADDRESS || "";
const BOOK_THRESHOLD = 10000;
const BOOK_DECIMALS = 18;

// Admin bypass addresses (case-insensitive)
const ADMIN_WALLETS = ["0xadmin"];

// ERC-20 balanceOf(address) selector
const BALANCE_OF_SELECTOR = "0x70a08231";

// Validate Monad/EVM address format (0x + 40 hex chars)
export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

// Check if wallet is an admin bypass
export function isAdminWallet(address: string): boolean {
  return ADMIN_WALLETS.includes(address.toLowerCase());
}

export async function getNbookBalance(walletAddress: string): Promise<number> {
  // Admin bypass — always return above threshold
  if (isAdminWallet(walletAddress)) {
    console.log(`[BOOK] Admin bypass for wallet: ${walletAddress}`);
    return BOOK_THRESHOLD * 10; // 100K for admin
  }

  // Validate address format
  if (!isValidAddress(walletAddress)) {
    console.log(`[BOOK] Invalid address format: ${walletAddress}`);
    return -1; // Signal invalid address
  }

  // If no contract address configured, use mock mode
  if (!BOOK_CONTRACT) {
    console.log(`[BOOK] Mock mode — no contract configured. Wallet: ${walletAddress}`);
    return 0;
  }

  try {
    // Pad wallet address to 32 bytes
    const paddedAddress = walletAddress.toLowerCase().replace("0x", "").padStart(64, "0");
    const data = `${BALANCE_OF_SELECTOR}${paddedAddress}`;

    const res = await fetch(MONAD_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          { to: BOOK_CONTRACT, data },
          "latest",
        ],
        id: 1,
      }),
    });

    const json = await res.json();

    if (json.error) {
      console.error(`[BOOK] RPC error:`, json.error);
      return 0;
    }

    // Parse hex result to number, accounting for decimals
    const rawBalance = BigInt(json.result || "0x0");
    const balance = Number(rawBalance / BigInt(10 ** BOOK_DECIMALS));
    return balance;
  } catch (e) {
    console.error(`[BOOK] Balance check failed:`, e);
    return 0;
  }
}

export function meetsThreshold(balance: number): boolean {
  return balance >= BOOK_THRESHOLD;
}

export { BOOK_THRESHOLD };
