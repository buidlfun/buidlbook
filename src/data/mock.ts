export type AgentEvaluation = {
  agentId: string;
  score: number;
  reasoning: string;
};

export type Project = {
  id: string;
  name: string;
  ticker: string;
  description: string;
  team: string;
  tokenomics: string;
  pitch: string;
  links: { website?: string; twitter?: string; github?: string };
  status: "Pending" | "Under Review" | "Approved" | "Launched" | "Rejected";
  submittedAt: string;
  evaluations: AgentEvaluation[];
  launchUrl?: string;
};

export type Agent = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  criteria: string[];
  evaluatedCount: number;
  avgScore: number;
  accuracy: number;
};

export const agents: Agent[] = [
  {
    id: "techbot",
    name: "TechBot",
    emoji: "🧠",
    description: "Evaluates code quality, architecture, technical feasibility, and innovation depth.",
    criteria: ["Code Quality", "Architecture", "Feasibility", "Innovation", "Security Posture"],
    evaluatedCount: 147,
    avgScore: 62,
    accuracy: 89,
  },
  {
    id: "marketbot",
    name: "MarketBot",
    emoji: "📊",
    description: "Analyzes total addressable market, competitive landscape, and market timing.",
    criteria: ["TAM Analysis", "Competition", "Timing", "Go-to-Market", "Moat"],
    evaluatedCount: 147,
    avgScore: 58,
    accuracy: 84,
  },
  {
    id: "tokenomicsbot",
    name: "TokenomicsBot",
    emoji: "💰",
    description: "Reviews token supply, vesting schedules, incentive alignment, and value accrual.",
    criteria: ["Supply Design", "Vesting", "Incentive Alignment", "Value Accrual", "Sustainability"],
    evaluatedCount: 147,
    avgScore: 55,
    accuracy: 91,
  },
  {
    id: "communitybot",
    name: "CommunityBot",
    emoji: "👥",
    description: "Measures social traction, team reputation, narrative strength, and community engagement.",
    criteria: ["Social Traction", "Team Reputation", "Narrative", "Engagement", "Growth Potential"],
    evaluatedCount: 147,
    avgScore: 64,
    accuracy: 78,
  },
  {
    id: "riskbot",
    name: "RiskBot",
    emoji: "⚠️",
    description: "Identifies red flags, rug signals, security vulnerabilities, and regulatory risk.",
    criteria: ["Rug Signals", "Security Audit", "Regulatory Risk", "Team Doxxing", "Contract Safety"],
    evaluatedCount: 147,
    avgScore: 51,
    accuracy: 93,
  },
];

export const projects: Project[] = [
  {
    id: "monad-swap",
    name: "MonadSwap",
    ticker: "$MSWAP",
    description: "Next-gen DEX built natively on Monad with parallel execution for 10x throughput. Features concentrated liquidity, limit orders, and cross-chain routing via LayerZero.",
    team: "Ex-Uniswap and Jump Trading engineers. 3 core devs, all doxxed.",
    tokenomics: "1B supply. 40% community, 20% team (2yr vest), 15% treasury, 15% liquidity, 10% investors.",
    pitch: "Monad's parallel execution unlocks DEX performance impossible on other L1s. We're building the Uniswap of Monad with novel AMM curves optimized for high-frequency parallel settlement.",
    links: { website: "https://monadswap.xyz", twitter: "@monadswap", github: "github.com/monadswap" },
    status: "Launched",
    submittedAt: "2026-01-15",
    launchUrl: "https://nad.fun/monadswap",
    evaluations: [
      { agentId: "techbot", score: 88, reasoning: "Excellent architecture leveraging Monad's parallel EVM. Clean Solidity code with comprehensive test coverage. Novel AMM implementation shows deep DeFi understanding." },
      { agentId: "marketbot", score: 82, reasoning: "Strong TAM — every L1 needs a native DEX. First-mover advantage on Monad. Competition will come but technical moat is real." },
      { agentId: "tokenomicsbot", score: 76, reasoning: "Solid token design with good community allocation. Vesting schedule is fair. Fee-sharing mechanism creates sustainable value accrual." },
      { agentId: "communitybot", score: 79, reasoning: "12K Twitter followers pre-launch. Team is well-known in Monad ecosystem. Strong narrative around being THE Monad DEX." },
      { agentId: "riskbot", score: 74, reasoning: "Team is doxxed, contracts audited by Zellic. Minor centralization risk with admin keys but timelock is in place." },
    ],
  },
  {
    id: "nads-ai",
    name: "NadsAI",
    ticker: "$NADS",
    description: "AI agent marketplace on Monad where users can deploy, trade, and compose autonomous agents for DeFi strategies, trading, and on-chain automation.",
    team: "Founded by ML researchers from DeepMind and Paradigm. 5-person team.",
    tokenomics: "500M supply. 35% community rewards, 25% team (18mo cliff + 2yr vest), 20% ecosystem fund, 10% liquidity, 10% strategic.",
    pitch: "The intersection of AI agents and crypto is inevitable. NadsAI is building the composable agent layer for Monad — think Hugging Face meets DeFi.",
    links: { website: "https://nadsai.xyz", twitter: "@nadsai_xyz", github: "github.com/nadsai" },
    status: "Approved",
    submittedAt: "2026-01-22",
    evaluations: [
      { agentId: "techbot", score: 91, reasoning: "Impressive agent framework with novel on-chain inference verification. Multi-agent orchestration is well-designed. Best technical submission this quarter." },
      { agentId: "marketbot", score: 85, reasoning: "AI + crypto is the hottest narrative. Massive TAM. Timing is perfect with the AI agent meta. Could capture significant market share." },
      { agentId: "tokenomicsbot", score: 72, reasoning: "Good structure but agent compute costs could create inflationary pressure. Burn mechanism helps but needs monitoring." },
      { agentId: "communitybot", score: 88, reasoning: "Already viral on CT. 25K followers. Team has strong reputation. Narrative alignment with current meta is excellent." },
      { agentId: "riskbot", score: 68, reasoning: "AI model outputs are non-deterministic — potential for unexpected agent behaviors. Smart contract risk is moderate. Team doxxing is partial." },
    ],
  },
  {
    id: "purple-lend",
    name: "PurpleLend",
    ticker: "$PRPL",
    description: "Isolated lending protocol optimized for Monad's execution model. Features real-time oracle updates and liquidation-resistant positions.",
    team: "Former Aave and Compound contributors. 4 engineers, 1 economist.",
    tokenomics: "100M supply. 45% community, 20% team (2yr vest), 15% insurance fund, 10% treasury, 10% liquidity.",
    pitch: "Lending on Monad should be 100x more capital efficient. PurpleLend uses Monad's parallelism for real-time risk assessment and instant liquidations.",
    links: { website: "https://purplelend.fi", twitter: "@purplelend" },
    status: "Under Review",
    submittedAt: "2026-02-01",
    evaluations: [
      { agentId: "techbot", score: 78, reasoning: "Strong lending protocol fundamentals. Oracle integration is well-designed. Some concerns about isolated market implementation complexity." },
      { agentId: "marketbot", score: 71, reasoning: "Lending is essential DeFi infra. Market is proven but competitive. Differentiation through Monad-native features is compelling." },
      { agentId: "tokenomicsbot", score: 69, reasoning: "Insurance fund allocation is smart. However, governance token utility could be stronger. Revenue sharing model needs refinement." },
      { agentId: "communitybot", score: 65, reasoning: "Moderate social presence. Team credibility is high but community building is early stage. Need more engagement." },
      { agentId: "riskbot", score: 72, reasoning: "Lending protocols carry inherent smart contract risk. Team experience mitigates this. No red flags found in preliminary review." },
    ],
  },
  {
    id: "monad-punks",
    name: "MonadPunks",
    ticker: "$MPUNK",
    description: "10,000 generative NFT collection with on-chain traits and a play-to-earn battle arena powered by Monad's speed.",
    team: "Anonymous team of 3. Active in Monad Discord for 6 months.",
    tokenomics: "10B supply. 50% P2E rewards, 20% team (no vesting mentioned), 15% marketing, 15% liquidity.",
    pitch: "The cultural NFT collection of the Monad ecosystem. MonadPunks aren't just PFPs — they're your warriors in the arena.",
    links: { twitter: "@monadpunks" },
    status: "Rejected",
    submittedAt: "2026-01-28",
    evaluations: [
      { agentId: "techbot", score: 35, reasoning: "No novel technology. Standard ERC-721 with basic game mechanics. No GitHub repo provided. Architecture documentation is thin." },
      { agentId: "marketbot", score: 42, reasoning: "NFT market is saturated. No clear differentiation from hundreds of similar projects. P2E model has repeatedly failed." },
      { agentId: "tokenomicsbot", score: 28, reasoning: "10B supply with 50% to P2E is highly inflationary. No vesting for team tokens is a major red flag. No burn mechanism." },
      { agentId: "communitybot", score: 51, reasoning: "Some organic engagement but mostly from giveaway farming. Anonymous team reduces trust. Narrative is derivative." },
      { agentId: "riskbot", score: 22, reasoning: "Multiple red flags: anonymous team, no vesting, no audit, copycat concept. High probability of rug or abandonment." },
    ],
  },
  {
    id: "nad-bridge",
    name: "NadBridge",
    ticker: "$BRIDGE",
    description: "Trustless cross-chain bridge connecting Monad to Ethereum, Solana, and Cosmos ecosystems with ZK-proof verification.",
    team: "Bridge veterans from Wormhole and Axelar. 6-person team, all doxxed.",
    tokenomics: "200M supply. 40% community, 20% team (3yr vest), 15% security fund, 15% treasury, 10% liquidity.",
    pitch: "Bridges are critical infra and the weakest link in crypto. NadBridge uses ZK proofs for trustless verification — no multisig, no trust assumptions.",
    links: { website: "https://nadbridge.xyz", twitter: "@nadbridge", github: "github.com/nadbridge" },
    status: "Under Review",
    submittedAt: "2026-02-05",
    evaluations: [
      { agentId: "techbot", score: 92, reasoning: "Outstanding ZK implementation. Proof generation is efficient and verification is gas-optimized for Monad. Best bridge architecture we've reviewed." },
      { agentId: "marketbot", score: 77, reasoning: "Bridges are essential but high-risk category. ZK differentiation is strong. Multi-chain support increases TAM significantly." },
      { agentId: "tokenomicsbot", score: 74, reasoning: "Conservative and well-designed. Security fund is crucial for a bridge. Fee model is sustainable." },
      { agentId: "communitybot", score: 70, reasoning: "Solid reputation from team backgrounds. Growing community. Bridge narratives are less exciting but fundamentals matter." },
      { agentId: "riskbot", score: 81, reasoning: "Team is fully doxxed with strong track record. ZK verification eliminates major bridge risks. Security fund provides additional safety net." },
    ],
  },
  {
    id: "yieldnad",
    name: "YieldNad",
    ticker: "$YNAD",
    description: "Automated yield aggregator that finds and compounds the best yields across Monad DeFi protocols with one-click vaults.",
    team: "2 devs, previously built a Yearn fork on Arbitrum that reached $50M TVL.",
    tokenomics: "777M supply. 50% farming rewards, 20% team (1yr vest), 20% liquidity, 10% marketing.",
    pitch: "DeFi yields on Monad will be massive at launch. YieldNad auto-compounds across all protocols so users maximize returns effortlessly.",
    links: { website: "https://yieldnad.fi", twitter: "@yieldnad" },
    status: "Pending",
    submittedAt: "2026-02-10",
    evaluations: [],
  },
];

export const stats = {
  totalProjects: 147,
  approvalRate: 23,
  launchedTokens: 18,
  treasuryValue: "$2.4M",
  totalEvaluations: 735,
  avgConsensusTime: "3.2 days",
};
