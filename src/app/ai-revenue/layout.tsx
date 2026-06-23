import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Automation Solutions",
  description:
    "12 specialist AI agents that generate leads, write content, monitor SEO, and automate your operations. UK-based. No hype — just results.",
  keywords: [
    "AI automation UK",
    "AI agents for business",
    "lead generation AI",
    "content creation AI",
    "SEO monitoring UK",
    "business automation Coventry",
    "AI revenue generation",
  ],
  openGraph: {
    title: "AI & Automation Solutions | CRAM Services",
    description:
      "12 specialist AI agents that generate leads, write content, monitor SEO, and automate your operations.",
    type: "website",
  },
};

export default function AIRevenueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
