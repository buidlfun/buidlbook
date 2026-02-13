"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

type CursorContextType = {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
};

const CursorContext = createContext<CursorContextType>({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });

export function useCursor() {
  return useContext(CursorContext);
}

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const normalizedX = x / window.innerWidth;
    const normalizedY = y / window.innerHeight;

    setCursor({ x, y, normalizedX, normalizedY });

    document.documentElement.style.setProperty("--cursor-x", `${x}px`);
    document.documentElement.style.setProperty("--cursor-y", `${y}px`);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <CursorContext.Provider value={cursor}>
      {children}
    </CursorContext.Provider>
  );
}
