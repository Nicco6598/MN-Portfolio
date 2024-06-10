import marketplace from '../assets/marketplace.png';
import nft from '../assets/nft.png';
import travel from '../assets/travel.png';

export const projects = [
  { 
    id: 1, 
    title: 'Moove Marketplace', 
    shortDescription: 'Piattaforma innovativa per acquistare, vendere e scambiare NFT legati ai viaggi.',
    fullDescription: 'MooveMP, una piattaforma innovativa sviluppata da Moove, dove gli utenti possono acquistare, vendere e scambiare NFT legati al tema dei viaggi.',
    imageUrl: marketplace,
    year: '2023',
    month: 'June',
    languages: ['JavaScript', 'TypeScript', 'React'],
    type: 'Web Development',
    vercelLink: 'https://vercel.com',
    githubLink: 'https://github.com/yourusername/project1',
  },
  { 
    id: 2, 
    title: 'MyNFT VRF Contract', 
    shortDescription: 'Contratto per un mercato decentralizzato di token non fungibili (NFT).',
    fullDescription: 'Il contratto MyNFT permette agli utenti di partecipare a un mercato decentralizzato di token non fungibili (NFT), mettendo in risalto l\'unicità e la proprietà digitale. Gli utenti possono creare, acquistare e vendere NFT, ciascuno rappresentante un oggetto digitale unico, come arte, collezionabili e altro ancora. Questa piattaforma utilizza lo standard ERC-721 per garantire la compatibilità e la sicurezza nella gestione degli NFT.',
    imageUrl: nft,
    year: '2023',
    month: 'July',
    languages: ['Solidity', 'JavaScript'],
    type: 'Blockchain Development',
    vercelLink: 'https://vercel.com',
    githubLink: 'https://github.com/yourusername/project2',
  },
  { 
    id: 3, 
    title: 'dApp Travel', 
    shortDescription: 'Piattaforma per acquistare pacchetti viaggio utilizzando criptovalute.',
    fullDescription: 'dApp Travel, una piattaforma innovativa che permette di acquistare pacchetti viaggio utilizzando criptovalute. Grazie alla nostra integrazione con MetaMask e alla rete di test Sepolia, offriamo un\'esperienza utente fluida e sicura, rendendo l\'acquisto di pacchetti viaggio più accessibile che mai.',
    imageUrl: travel,
    year: '2023',
    month: 'August',
    languages: ['Solidity', 'JavaScript', 'React'],
    type: 'Web Development',
    vercelLink: 'https://vercel.com',
    githubLink: 'https://github.com/yourusername/project3',
  },
  // Aggiungi altri progetti se necessario
];
