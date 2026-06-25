import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind CRAM Services — a Coventry-based company delivering AI automation systems, premium automotive detailing, and aviation services across the UK.",
  keywords: [
    "about CRAM Services",
    "CRAM Services team",
    "UK AI company",
    "Coventry AI business",
    "CRAM Services founder",
    "community interest company UK",
  ],
  openGraph: {
    title: "About Us | CRAM Services",
    description:
      "Meet the team behind CRAM Services — AI automation, premium detailing, and aviation services, all built on precision and purpose.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
