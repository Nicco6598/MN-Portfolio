import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import IntroLoader from "@/components/layout/intro-loader";

const display = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const grotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marco-niccolini.dev"),
  title: {
    default: "Marco Niccolini — Web & Blockchain Engineer",
    template: "%s · Marco Niccolini",
  },
  description:
    "Creo brand digitali e prodotti Web3 end-to-end: design systems, interfacce immersive e smart contract pronti per la produzione.",
  openGraph: {
    title: "Marco Niccolini — Web & Blockchain Engineer",
    description:
      "Unisco product design e sviluppo fullstack per esperienze digitali audaci, con focus su Web3 e interfacce immersive.",
    url: "https://marco-niccolini.dev",
    siteName: "Marco Niccolini Portfolio",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Preview portfolio Marco Niccolini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nicco6598",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="bg-base">
      <body
        className={`${display.variable} ${grotesk.variable} antialiased text-frost bg-base`}
      >
        <div className="relative min-h-screen bg-base text-frost">
          <div className="pointer-events-none fixed inset-0 bg-grid-overlay opacity-25" />
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,122,41,0.08),transparent_45%)]" />
          <IntroLoader />
          <Navbar />
          <main className="relative z-10 pt-32">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
