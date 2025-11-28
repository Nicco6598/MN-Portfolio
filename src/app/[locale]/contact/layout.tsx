import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Parliamo del tuo prossimo prodotto: dApp, smart contract, dashboard Web3. Rispondo entro 24 ore con una roadmap chiara.",
  openGraph: {
    title: "Contatti — Marco Niccolini",
    description:
      "Pagina contatti per collaborazioni su Web3, design system e sviluppo full-stack.",
    url: "https://mn-portfolio-orpin.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contatti di Marco Niccolini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti — Marco Niccolini",
    description: "Parliamo del tuo prossimo prodotto Web o Web3.",
    creator: "@nicco6598",
  },
  alternates: {
    canonical: "https://mn-portfolio-orpin.vercel.app/contact",
    languages: {
      "it-IT": "https://mn-portfolio-orpin.vercel.app/contact",
      "en-US": "https://mn-portfolio-orpin.vercel.app/en/contact",
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
