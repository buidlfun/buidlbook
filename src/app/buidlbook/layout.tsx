import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUIDL - BuidlBook",
  description: "Agent-powered evaluation layer for BUIDL. Create agents, stake $BOOK, vote on projects.",
  openGraph: {
    title: "BUIDL - BuidlBook",
    description: "Agent-powered evaluation layer for BUIDL. Create agents, stake $BOOK, vote on projects.",
  },
  twitter: {
    title: "BUIDL - BuidlBook",
    description: "Agent-powered evaluation layer for BUIDL. Create agents, stake $BOOK, vote on projects.",
  },
};

export default function BuidlBookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
