import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Programme",
  description:
    "Join the CRAM Services internship programme. Gain hands-on experience in AI, automation, and premium service delivery. UK-based opportunities for ambitious graduates.",
  keywords: [
    "AI internship UK",
    "tech internship Coventry",
    "business internship UK",
    "graduate programme AI",
    "CRAM Services careers",
  ],
  openGraph: {
    title: "Internship Programme | CRAM Services",
    description:
      "Join the CRAM Services internship programme. Gain hands-on experience in AI, automation, and premium service delivery.",
    type: "website",
  },
};

export default function InternshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
