import marketplace from '../assets/marketplace.png';
import nft from '../assets/nft.png';
import travel from '../assets/travel.png';

export const projects = [
  { 
    id: 1, 
    title: 'Moove Marketplace', 
    shortDescription: 'Piattaforma innovativa per acquistare, vendere e scambiare NFT legati ai viaggi.',
    fullDescription: `MooveMP è una piattaforma rivoluzionaria creata da Moove, che offre agli utenti la possibilità di immergersi nel mondo degli NFT (Token Non Fungibili) attraverso il tema dei viaggi. Gli utenti possono esplorare una vasta gamma di NFT legati ai viaggi, che possono acquistare, vendere o scambiare tra loro. Questi NFT possono rappresentare esperienze di viaggio uniche, opere d'arte digitali ispirate a destinazioni famose, o anche collezionabili legati a luoghi iconici in tutto il mondo. MooveMP fornisce una piattaforma sicura e intuitiva dove gli amanti dei viaggi e gli appassionati di NFT possono connettersi, scoprire e possedere pezzi unici legati al loro interesse comune per l'esplorazione del mondo. La piattaforma è dotata di funzionalità avanzate per garantire transazioni sicure e una navigazione user-friendly. Gli utenti possono anche partecipare a eventi virtuali, aste e collaborazioni con artisti digitali di tutto il mondo.`,
    imageUrl: marketplace,
    year: '2024',
    month: 'Aprile',
    languages: ['JavaScript', 'TypeScript', 'React', 'Solidity'],
    type: 'Sviluppo di dApp',
    vercelLink: 'https://moove-mp.vercel.app/',
    githubLink: 'https://github.com/Nicco6598/MooveMP',
  },
  { 
    id: 2, 
    title: 'MyNFT VRF Contract', 
    shortDescription: 'Contratto per un mercato decentralizzato di token non fungibili (NFT).',
    fullDescription: `Il contratto MyNFT permette agli utenti di partecipare a un mercato decentralizzato di token non fungibili (NFT), mettendo in risalto l'unicità e la proprietà digitale. Gli utenti possono creare, acquistare e vendere NFT, ciascuno rappresentante un oggetto digitale unico, come arte, collezionabili e altro ancora. Questa piattaforma utilizza lo standard ERC-721 per garantire la compatibilità e la sicurezza nella gestione degli NFT. Il contratto include funzionalità avanzate di sicurezza e verifica, tra cui l'integrazione con il VRF (Verifiable Random Function) per garantire l'equità e la trasparenza nelle transazioni. Gli sviluppatori e gli utenti possono interagire con il contratto tramite una semplice interfaccia, facilitando l'adozione e l'utilizzo della piattaforma.`,
    imageUrl: nft,
    year: '2024',
    month: 'Febbraio',
    languages: ['Solidity', 'TypeScript'],
    type: 'Sviluppo Blockchain',
    vercelLink: '#',
    githubLink: 'https://github.com/Nicco6598/NFT-SmartContract',
  },
  { 
    id: 3, 
    title: 'dApp Travel', 
    shortDescription: 'Piattaforma per acquistare pacchetti viaggio utilizzando criptovalute.',
    fullDescription: `dApp Travel è una piattaforma innovativa che permette di acquistare pacchetti viaggio utilizzando criptovalute. Grazie alla nostra integrazione con MetaMask e alla rete di test Sepolia, offriamo un'esperienza utente fluida e sicura, rendendo l'acquisto di pacchetti viaggio più accessibile che mai. Gli utenti possono esplorare vari pacchetti viaggio, comparare prezzi e destinazioni, e finalizzare gli acquisti in modo sicuro utilizzando le loro criptovalute preferite. La piattaforma include anche funzionalità di feedback e recensioni, permettendo agli utenti di condividere le loro esperienze e aiutare altri viaggiatori a fare scelte informate. Inoltre, dApp Travel offre promozioni e sconti esclusivi per i membri registrati, incentivando l'uso della piattaforma e la fidelizzazione dei clienti.`,
    imageUrl: travel,
    year: '2024',
    month: 'Gennaio',
    languages: ['Solidity', 'TypeScript', 'React'],
    type: 'Sviluppo Web',
    vercelLink: 'https://eth-d-app-travel.vercel.app/',
    githubLink: 'https://github.com/Nicco6598/eth_dApp-Travel',
  },
  // Aggiungi altri progetti se necessario
];
