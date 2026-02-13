"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TimelineLine({ className = "" }: { className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`absolute left-12 top-0 bottom-0 w-px ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        {/* Background line */}
        <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="rgba(0,255,209,0.06)" strokeWidth="0.5" />
        {/* Animated draw line */}
        <motion.line
          x1="0.5" y1="0" x2="0.5" y2="100"
          stroke="rgba(0,255,209,0.4)"
          strokeWidth="0.5"
          style={{ pathLength }}
        />
      </svg>
      {/* Glow dot at progress point */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00FFD1]"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          boxShadow: "0 0 10px rgba(0,255,209,0.6), 0 0 30px rgba(0,255,209,0.2)",
        }}
      />
    </div>
  );
}
