"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/cohort-1", label: "Cohort 1" },
  { href: "/buidlbook", label: "BuidlBook" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo.jpg" alt="BUIDL" width={28} height={28} className="rounded-md" />
          <span className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-space)]">
            BUIDL
          </span>
        </Link>
        <div className="flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] px-4 py-1.5 rounded-full transition-colors ${
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/submit"
            className="ml-4 text-[13px] px-5 py-1.5 bg-[#00FFD1] text-black rounded-full font-medium hover:bg-[#00E5BB] transition-colors"
          >
            Pitch Now
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
