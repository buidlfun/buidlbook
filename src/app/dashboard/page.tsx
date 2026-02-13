"use client";

import { motion } from "framer-motion";
import { stats, projects, agents } from "@/data/mock";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";

export default function DashboardPage() {
  const statusCounts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statItems = [
    { label: "Projects", value: stats.totalProjects },
    { label: "Approval Rate", value: stats.approvalRate, suffix: "%" },
    { label: "Launched", value: stats.launchedTokens },
    { label: "Treasury", raw: stats.treasuryValue },
    { label: "Evaluations", value: stats.totalEvaluations },
    { label: "Avg Consensus", raw: stats.avgConsensusTime },
  ];

  const pipelineStatuses = [
    { status: "Pending", color: "from-yellow-500 to-yellow-400" },
    { status: "Under Review", color: "from-blue-500 to-blue-400" },
    { status: "Approved", color: "from-green-500 to-green-400" },
    { status: "Launched", color: "from-[#00C9A7] to-[#00FFD1]" },
    { status: "Rejected", color: "from-red-500 to-red-400" },
  ];

  const statusLabels: Record<string, string> = {
    Pending: "Queued",
    "Under Review": "Under the Microscope",
    Approved: "Greenlit",
    Launched: "Launched",
    Rejected: "Rejected",
  };

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <p className="text-[#00FFD1]/60 text-sm uppercase tracking-[0.2em] mb-4">Analytics</p>
          <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)] text-white">
            The Machine&apos;s Pulse.
          </h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-20">
          {statItems.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="rounded-xl">
                <div className="p-5 border border-white/[0.04] rounded-xl text-center bg-white/[0.01]">
                  <div className="text-2xl font-bold text-white font-[family-name:var(--font-space)]">
                    {s.raw ? s.raw : <AnimatedCounter value={s.value!} suffix={s.suffix || ""} />}
                  </div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 border border-white/[0.04] rounded-xl bg-white/[0.01]"
          >
            <h2 className="text-sm text-gray-400 font-medium mb-6">Pipeline Breakdown</h2>
            <div className="space-y-4">
              {pipelineStatuses.map((item, i) => {
                const count = statusCounts[item.status] || 0;
                const pct = projects.length > 0 ? (count / projects.length) * 100 : 0;
                return (
                  <div key={item.status}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-400">{statusLabels[item.status] || item.status}</span>
                      <span className="text-gray-600">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Agent Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 border border-white/[0.04] rounded-xl bg-white/[0.01]"
          >
            <h2 className="text-sm text-gray-400 font-medium mb-6">Agent Performance</h2>
            <div className="space-y-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{agent.emoji}</span>
                    <span className="text-sm text-gray-300">{agent.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-500">{agent.avgScore} avg</span>
                    <span className="text-[#00FFD1]/80">{agent.accuracy}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-6 border border-white/[0.04] rounded-xl bg-white/[0.01]"
        >
          <h2 className="text-sm text-gray-400 font-medium mb-6">Recent Submissions</h2>
          <div className="space-y-0">
            {projects.slice(0, 5).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="flex items-center justify-between py-3 border-b border-white/[0.03] last:border-0"
              >
                <div>
                  <span className="text-sm text-gray-300">{p.name}</span>
                  <span className="text-[#00FFD1]/30 text-xs ml-2">{p.ticker}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-600">{p.submittedAt}</span>
                  <span className={`text-xs font-medium ${
                    p.status === "Launched" ? "text-[#00FFD1]/80" :
                    p.status === "Approved" ? "text-green-400/80" :
                    p.status === "Rejected" ? "text-red-400/60" :
                    p.status === "Under Review" ? "text-blue-400/80" :
                    "text-yellow-400/80"
                  }`}>
                    {statusLabels[p.status] || p.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
