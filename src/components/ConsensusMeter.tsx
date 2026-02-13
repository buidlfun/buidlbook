"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AgentEvaluation } from "@/data/mock";

export default function ConsensusMeter({ evaluations }: { evaluations: AgentEvaluation[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (evaluations.length === 0) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-yellow-500"
        />
        Awaiting evaluation...
      </div>
    );
  }

  const avg = evaluations.reduce((s, e) => s + e.score, 0) / evaluations.length;
  const passing = evaluations.filter((e) => e.score >= 70).length;
  const threshold = 70;
  const pct = Math.min(100, (avg / 100) * 100);
  const isGood = avg >= threshold;

  return (
    <div ref={ref}>
      <div className="flex justify-between text-xs mb-2">
        <span className="text-gray-400 font-medium">
          Consensus: <span className={isGood ? "text-green-400 neon-green" : "text-[#00FFD1] neon-teal"}>{avg.toFixed(0)}</span>/100
        </span>
        <span className="text-gray-500">{passing}/5 agents passing</span>
      </div>
      <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className={`h-full rounded-full relative ${
            isGood
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-[#00C9A7] via-[#00E5BB] to-[#00FFD1]"
          }`}
        >
          <div className={`absolute inset-0 rounded-full ${isGood ? "shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "glow-teal"}`} />
        </motion.div>
      </div>
      <div className="relative h-4">
        <div className="absolute top-1 text-[10px] text-gray-600 font-medium" style={{ left: `${threshold}%`, transform: "translateX(-50%)" }}>
          ▲ 70
        </div>
      </div>
    </div>
  );
}
