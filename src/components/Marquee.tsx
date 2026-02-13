"use client";

export default function Marquee({ items, speed = "normal", reverse = false }: { items: string[]; speed?: "normal" | "slow"; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/[0.04] py-4">
      <div
        className={`inline-flex ${speed === "slow" ? "animate-marquee-slow" : "animate-marquee"}`}
        style={{ direction: reverse ? "rtl" : "ltr" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sm text-gray-500 font-medium tracking-wide uppercase">
            {item}
            <span className="mx-8 text-[#00FFD1]/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
