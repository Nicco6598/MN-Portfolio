import { Project } from '@/data/projects';

export function generateProjectStructuredData(project: Project, url: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.shortDescription,
        image: project.imageUrl,
        url: url,
        author: {
            '@type': 'Person',
            name: 'Marco Niccolini',
            url: 'https://mn-portfolio-orpin.vercel.app/',
            jobTitle: 'Full Stack & Blockchain Developer',
            sameAs: [
                'https://github.com/Nicco6598',
                'https://twitter.com/nicco6598',
                'https://www.linkedin.com/in/marco-niccolini',
            ],
        },
        datePublished: `${project.year}-01-01`,
        keywords: project.languages.join(', '),
        genre: project.type,
        inLanguage: 'it-IT',
    };
}

export function generatePersonStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Marco Niccolini',
        url: 'https://mn-portfolio-orpin.vercel.app/',
        image: 'https://mn-portfolio-orpin.vercel.app/avatar.png',
        jobTitle: 'Full Stack & Blockchain Developer',
        description:
            'Full Stack Developer specializzato in Web3, Blockchain e sviluppo di applicazioni decentralizzate (dApp)',
        sameAs: [
            'https://github.com/Nicco6598',
            'https://twitter.com/nicco6598',
            'https://www.linkedin.com/in/marco-niccolini',
        ],
        knowsAbout: [
            'Web3',
            'Blockchain',
            'Smart Contracts',
            'Solidity',
            'React',
            'Next.js',
            'TypeScript',
            'Full Stack Development',
        ],
    };
}

export function generateWebsiteStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Marco Niccolini Portfolio',
        url: 'https://mn-portfolio-orpin.vercel.app/',
        description:
            'Portfolio professionale di Marco Niccolini, Full Stack & Blockchain Developer',
        author: {
            '@type': 'Person',
            name: 'Marco Niccolini',
        },
        inLanguage: ['it-IT', 'en-US'],
    };
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
