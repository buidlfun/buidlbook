"use client";

import { useCursor } from "./CursorProvider";

export default function GradientBlob({
  size = 600,
  color = "rgba(0,255,209,0.07)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const { normalizedX, normalizedY } = useCursor();

  const offsetX = (normalizedX - 0.5) * 60;
  const offsetY = (normalizedY - 0.5) * 60;

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: "morph 15s ease-in-out infinite",
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      }}
    />
  );
}
