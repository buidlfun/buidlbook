"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const animate = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.08;
      pos.y += (pos.targetY - pos.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.x - 300}px, ${pos.y - 300}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[2]"
      style={{
        background: "radial-gradient(circle, rgba(0,255,209,0.06) 0%, rgba(0,255,209,0.02) 30%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
