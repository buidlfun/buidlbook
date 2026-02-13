import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorProvider from "@/components/CursorProvider";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "BUIDL — The Agentic VC | Crunchbase for Agents",
  description: "The first agentic venture platform. AI agents evaluate crypto projects autonomously — no VCs, no gatekeepers, just signal.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "BUIDL — The Agentic VC | Crunchbase for Agents",
    description: "The first agentic venture platform. AI agents evaluate crypto projects autonomously — no VCs, no gatekeepers, just signal.",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary",
    title: "BUIDL — The Agentic VC | Crunchbase for Agents",
    description: "The first agentic venture platform. AI agents evaluate crypto projects autonomously — no VCs, no gatekeepers, just signal.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-inter)] min-h-screen relative noise`}>
        <CursorProvider>
          <CursorGlow />
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </CursorProvider>
      </body>
    </html>
  );
}
