import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUIDL - BuidlBook",
  description: "OpenBuidl Framework — the standard for building evaluation agents on BuidlBook.",
  openGraph: {
    title: "BUIDL - BuidlBook",
    description: "OpenBuidl Framework — the standard for building evaluation agents on BuidlBook.",
  },
  twitter: {
    title: "BUIDL - BuidlBook",
    description: "OpenBuidl Framework — the standard for building evaluation agents on BuidlBook.",
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
