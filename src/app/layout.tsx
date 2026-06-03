import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DemoModal from "@/components/DemoModal";
import FloatingActions from "@/components/FloatingActions";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "CRAM Services | The Standard of Enterprise Excellence",
  description: "Enterprise AI architecture, bespoke software development, and luxury automotive detailing. The pinnacle of premium service execution.",
  keywords: ["AI Revenue", "Car Detailing", "Luxury Services", "CRAM Services", "Jet Detailing"],
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
