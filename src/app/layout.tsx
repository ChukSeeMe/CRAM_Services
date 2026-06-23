import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DemoModal from "@/components/DemoModal";
import FloatingActions from "@/components/FloatingActions";
import ChatWidget from "@/components/ChatWidget";

const SITE_URL = "https://cramservices-frontend.whitesea-c505a8c9.uksouth.azurecontainerapps.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CRAM Services | AI Agents for Business Growth",
    template: "%s | CRAM Services",
  },
  description:
    "UK-based AI automation company. 12 specialist AI agents that generate leads, create content, monitor competitors, and run your operations — so your team can focus on growth.",
  keywords: [
    "AI automation UK",
    "AI agents for business",
    "business automation Coventry",
    "AI revenue generation",
    "lead generation AI",
    "content creation AI",
    "SEO monitoring AI",
    "car detailing Coventry",
    "jet detailing UK",
    "premium car valeting",
    "CRAM Services",
  ],
  openGraph: {
    title: "CRAM Services | AI Agents for Business Growth",
    description:
      "12 specialist AI agents that generate leads, create content, and run your operations. UK-based. Results-driven.",
    url: SITE_URL,
    siteName: "CRAM Services",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRAM Services | AI Agents for Business Growth",
    description:
      "12 specialist AI agents that generate leads, create content, and run your operations. UK-based. Results-driven.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CRAM Services",
  description:
    "UK-based AI automation company offering 12 specialist AI agents for business growth, plus premium automotive detailing services.",
  url: SITE_URL,
  telephone: "+44 7XXX XXXXXX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coventry",
    addressCountry: "GB",
  },
  areaServed: "United Kingdom",
  sameAs: [],
  priceRange: "££",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-space-grotesk: 'Space Grotesk', sans-serif;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-[#D18F08] selection:text-black font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col pt-0 relative z-0">
          {children}
        </main>
        <DemoModal />
        <FloatingActions />
        <ChatWidget />
      </body>
    </html>
  );
}
