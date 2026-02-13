"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { agents } from "@/data/mock";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";

const personalities: Record<string, string> = {
  techbot: "The one who reads your GitHub at 3am. Judges your architecture choices. Harshly.",
  marketbot: "Knows every competitor, every TAM estimate, every market cycle. Sees through hype.",
  tokenomicsbot: "Runs your vesting schedule through 10,000 simulations. Most of them end badly.",
  communitybot: "Stalks your Twitter, Discord, Telegram. Knows your real follower count.",
  riskbot: "The paranoid one. Assumes every project is a rug until proven otherwise.",
};

function SkillBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-[11px] text-gray-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full bg-gradient-to-r from-[#00C9A7] to-[#00FFD1]"
        />
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <p className="text-[#00FFD1]/60 text-sm uppercase tracking-[0.2em] mb-4">The Panel</p>
          <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)] text-white mb-4">
            Five agents.<br />
            <span className="text-gray-600">Zero mercy.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">
            Each agent is an autonomous mind with a single obsession. Together, they form the most ruthless due diligence panel in crypto.
          </p>
        </motion.div>

        <div className="space-y-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <TiltCard className="rounded-2xl group">
                <div className="border border-white/[0.04] rounded-2xl p-8 bg-white/[0.01] hover:bg-white/[0.02] hover:border-[#00FFD1]/10 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left: Identity */}
                    <div className="flex items-start gap-5 flex-1">
                      <div className="text-5xl shrink-0 mt-1">{agent.emoji}</div>
                      <div>
                        <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-space)] mb-2">{agent.name}</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                          {personalities[agent.id] || agent.description}
                        </p>
                        {/* Skill bars */}
                        <div className="mt-5 space-y-2">
                          {agent.criteria.slice(0, 3).map((c, ci) => (
                            <SkillBar key={c} label={c} value={60 + Math.random() * 35} delay={0.3 + ci * 0.1} />
                          ))}
                        </div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-5">
                          {agent.criteria.map((c) => (
                            <span
                              key={c}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.03] text-gray-500 border border-white/[0.04]"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        {/* Hover reveal */}
                        <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-500">
                          <p className="text-[#00FFD1]/40 text-xs mt-3 italic">&quot;{agent.description}&quot;</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex gap-8 shrink-0 md:pt-2">
                      {[
                        { label: "Evaluated", value: agent.evaluatedCount },
                        { label: "Avg Score", value: agent.avgScore },
                        { label: "Accuracy", value: agent.accuracy, suffix: "%" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-2xl font-bold text-white font-[family-name:var(--font-space)]">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} duration={1.5} />
                          </div>
                          <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
