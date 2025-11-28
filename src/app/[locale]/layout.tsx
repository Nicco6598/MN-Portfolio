import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
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
  metadataBase: new URL("https://mn-portfolio-orpin.vercel.app"),
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
    url: "https://mn-portfolio-orpin.vercel.app",
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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-base">
      <body
        className={`${display.variable} ${grotesk.variable} antialiased text-frost bg-base`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen bg-base text-frost">
            <div className="pointer-events-none fixed inset-0 bg-grid-overlay opacity-25" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,122,41,0.08),transparent_45%)]" />
            <IntroLoader />
            <Navbar />
            <main className="relative z-10 pt-32">{children}</main>
            <Footer />
            <Analytics />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
