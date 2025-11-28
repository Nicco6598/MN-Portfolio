import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Progetti",
    description:
        "Esplora i miei progetti di sviluppo Web3, blockchain e full-stack. Case studies modulari con focus su product storytelling, motion UI e infrastrutture decentralizzate.",
    openGraph: {
        title: "Progetti — Marco Niccolini",
        description:
            "Case studies modulari: product storytelling, motion UI e infrastrutture Web3. Filtra per stack o parole chiave.",
        url: "https://mn-portfolio-orpin.vercel.app/projects",
        type: "website",
        images: [
            {
                url: "/og-projects.png",
                width: 1200,
                height: 630,
                alt: "Progetti di Marco Niccolini",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Progetti — Marco Niccolini",
        description:
            "Case studies modulari: product storytelling, motion UI e infrastrutture Web3.",
        creator: "@nicco6598",
    },
    alternates: {
        canonical: "https://mn-portfolio-orpin.vercel.app/projects",
        languages: {
            'it-IT': "https://mn-portfolio-orpin.vercel.app/projects",
            'en-US': "https://mn-portfolio-orpin.vercel.app/en/projects",
        },
    },
    keywords: [
        "Web3 Projects",
        "Blockchain Development",
        "Smart Contracts",
        "dApp Development",
        "Full Stack Portfolio",
        "React Projects",
        "TypeScript",
        "Solidity",
        "Next.js",
    ],
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
