"use client";

import { motion } from "framer-motion";

const config: Record<string, { bg: string; text: string; glow: string }> = {
  Pending: { bg: "bg-yellow-500/10", text: "text-yellow-400", glow: "shadow-[0_0_10px_rgba(234,179,8,0.2)]" },
  "Under Review": { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-[0_0_10px_rgba(59,130,246,0.2)]" },
  Approved: { bg: "bg-green-500/10", text: "text-green-400", glow: "shadow-[0_0_10px_rgba(34,197,94,0.2)]" },
  Launched: { bg: "bg-[#00FFD1]/10", text: "text-[#00FFD1]", glow: "shadow-[0_0_10px_rgba(0,255,209,0.3)]" },
  Rejected: { bg: "bg-red-500/10", text: "text-red-400", glow: "shadow-[0_0_10px_rgba(239,68,68,0.2)]" },
};

export default function StatusBadge({ status }: { status: string }) {
  const c = config[status] || { bg: "bg-gray-500/10", text: "text-gray-400", glow: "" };
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`text-xs px-3 py-1 rounded-full border border-white/[0.06] font-medium ${c.bg} ${c.text} ${c.glow}`}
    >
      {status === "Launched" && "🚀 "}{status}
    </motion.span>
  );
}
