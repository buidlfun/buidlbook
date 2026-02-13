"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import TiltCard from "@/components/TiltCard";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticButton from "@/components/MagneticButton";

const companies = [
  {
    name: "Store.fun",
    desc: "Launch a store in seconds on store.fun/start. No banks, no fees. Permissionless commerce on Solana.",
    tag: "Accelerator • 2024",
    href: "https://x.com/storedotfun",
    logo: "/storefun.jpg",
    status: "Launched",
  },
  {
    name: "Vibe",
    desc: "Tokenize your vibe. Vibe introduces IMM: Internet Music Markets. Speculate on sound.",
    tag: "IPO • 2024",
    href: "https://x.com/vibe_us_com",
    logo: "/vibe.jpg",
    status: "Launched",
  },
  {
    name: "CGN",
    desc: "Decision-making infrastructure for ICM on Pumpfun. Creator Governance Network — where creators govern their own economies.",
    tag: "Accelerator • 2023",
    href: "https://x.com/cgnetworkx",
    logo: "/cgn.jpg",
    status: "Launched",
  },
  {
    name: "Prophet Win",
    desc: "Predict the future and become a Prophet. The first Solana-based pumpfun prediction markets.",
    tag: "Incubator • 2024",
    href: "https://x.com/prophet_win",
    logo: "/prophet.jpg",
    status: "Launched",
  },
  {
    name: "Dude",
    desc: "Nostalgic mobile games with a twist. 5.3M+ dudes and counting. Gaming meets degen culture.",
    tag: "Series B • 2022",
    href: "https://x.com/Dudesolanagames",
    logo: "/dude.jpg",
    status: "Launched",
  },
];

const stats = [
  { value: 5, label: "Projects Incubated" },
  { value: 5, label: "Projects Launched" },
  { value: 100, label: "Success Rate", suffix: "%" },
];

function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.a
      ref={ref}
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="block group"
    >
      <TiltCard className="rounded-2xl h-full">
        <div className="p-8 border border-white/[0.04] rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#FF3B3B]/20 transition-all duration-500 h-full relative overflow-hidden">
          {/* Red glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF3B3B]/0 to-[#FF3B3B]/0 group-hover:from-[#FF3B3B]/[0.03] group-hover:to-transparent transition-all duration-500 rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <Image src={company.logo} alt={company.name} width={48} height={48} className="rounded-lg object-cover w-12 h-12" />
              <span className="text-[10px] uppercase tracking-wider text-[#FF3B3B]/60 border border-[#FF3B3B]/20 rounded-full px-3 py-1">
                {company.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-space)]">{company.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{company.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 uppercase tracking-wider">{company.tag}</span>
              <span className="text-xs text-[#FF3B3B]/40 group-hover:text-[#FF3B3B]/70 transition-colors">View on 𝕏 →</span>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.a>
  );
}

export default function Cohort1() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Red gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF3B3B]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 border border-[#FF3B3B]/20 rounded-full px-5 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            <span className="text-[#FF3B3B]/80 text-xs uppercase tracking-[0.2em] font-medium">Cohort 1 — Solana</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl sm:text-7xl md:text-[120px] font-bold leading-[0.9] tracking-tight font-[family-name:var(--font-space)] mb-8"
          >
            <span className="text-[#F5F5F0] block">Where it</span>
            <span className="bg-gradient-to-r from-[#FF3B3B] to-[#FF6B6B] bg-clip-text text-transparent block">all started.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Five projects entered the machine. Five projects launched on Solana.
            <br className="hidden md:block" />
            The first cohort proved autonomous incubation works.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-20 gap-y-12 md:gap-x-32">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space)] text-white mb-2">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solana marquee */}
      <div className="overflow-hidden py-6 border-y border-white/[0.03]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8">
              {["Store.fun", "Vibe", "CGN", "Prophet Win", "Dude", "Solana", "Pumpfun", "ICM", "DeFi", "Gaming"].map((item) => (
                <span key={`${i}-${item}`} className="text-sm text-[#FF3B3B]/30 uppercase tracking-[0.2em] font-medium">
                  {item} <span className="text-[#FF3B3B]/10 mx-4">◆</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Companies Grid */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <ScrollReveal>
          <p className="text-[#FF3B3B]/50 text-sm uppercase tracking-[0.2em] mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-space)] text-white mb-20">
            The graduates.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company, i) => (
            <CompanyCard key={company.name} company={company} index={i} />
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Link href="/submit">
              <TiltCard className="rounded-2xl h-full">
                <div className="p-8 border border-dashed border-white/[0.08] rounded-2xl bg-white/[0.01] hover:border-[#00FFD1]/20 transition-all duration-500 h-full flex flex-col items-center justify-center text-center min-h-[250px]">
                  <div className="text-4xl mb-4">🔨</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-space)]">Your project?</h3>
                  <p className="text-gray-600 text-sm mb-4">Cohort 2 is live on Monad.</p>
                  <span className="text-[#00FFD1] text-xs uppercase tracking-wider">Apply now →</span>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA to Cohort 2 */}
      <section className="py-32 px-6 text-center">
        <ScrollReveal>
          <p className="text-gray-600 text-sm uppercase tracking-[0.2em] mb-4">What&apos;s next</p>
          <h2 className="text-4xl md:text-7xl font-bold font-[family-name:var(--font-space)] text-white mb-6">
            Solana was the proof.<br />
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#00CC99] bg-clip-text text-transparent">Monad is the future.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-12">
            Cohort 2 brings AI-powered VC agents, autonomous consensus, and nad.fun launches.
          </p>
          <MagneticButton
            href="/"
            className="inline-block px-10 py-4 bg-[#00FFD1] text-black rounded-full font-semibold hover:bg-[#00E5BB] transition-colors text-lg"
          >
            Enter Cohort 2 →
          </MagneticButton>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-[#FF3B3B]/20 to-transparent" />
        <div className="py-12 text-center text-gray-600 text-xs tracking-wide">
          Cohort 1 · Built on Solana · 5/5 launched
        </div>
      </footer>
    </div>
  );
}
