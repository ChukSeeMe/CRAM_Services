import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Automotive & Jet Detailing",
  description:
    "Concours-level car detailing and aircraft jet cleaning in Coventry and across the UK. Paint correction, ceramic coating, and interior restoration for prestige vehicles.",
  keywords: [
    "car detailing Coventry",
    "jet detailing UK",
    "premium car valeting",
    "paint correction Coventry",
    "ceramic coating UK",
    "mobile car detailing",
    "prestige vehicle detailing",
  ],
  openGraph: {
    title: "Premium Automotive & Jet Detailing | CRAM Services",
    description:
      "Concours-level car detailing and aircraft jet cleaning in Coventry and across the UK.",
    type: "website",
  },
};

export default function CarDetailingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
