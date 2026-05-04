import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DemoModal from "@/components/DemoModal";
import FloatingActions from "@/components/FloatingActions";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-space-grotesk" });

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
    <html lang="en" suppressHydrationWarning className={`h-full antialiased scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
      <head />
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-[#D18F08] selection:text-black font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col pt-0 relative z-0">
          {children}
        </main>
        <DemoModal />
        <FloatingActions />
      </body>
    </html>
  );
}
