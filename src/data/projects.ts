export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  year: string;
  month: string;
  languages: string[];
  type: string;
  vercelLink: string;
  githubLink: string;
  status?: string;
  todo?: string[];
  // English localized fields (used when locale === "en")
  titleEn?: string;
  shortDescriptionEn?: string;
  fullDescriptionEn?: string;
  todoEn?: string[];
};

const monthToNumber = (month: string): number => {
  const months: Record<string, number> = {
    Gennaio: 1,
    Febbraio: 2,
    Marzo: 3,
    Aprile: 4,
    Maggio: 5,
    Giugno: 6,
    Luglio: 7,
    Agosto: 8,
    Settembre: 9,
    Ottobre: 10,
    Novembre: 11,
    Dicembre: 12,
  };

  return months[month] ?? 0;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Moove Marketplace',
    shortDescription:
      'Piattaforma NFT dedicata al travel con drops e marketplace per esperienze uniche.',
    fullDescription:
      `MooveMP è una piattaforma rivoluzionaria creata da Moove, che offre agli utenti la possibilità di immergersi nel mondo degli NFT (Token Non Fungibili) attraverso il tema dei viaggi. Gli utenti possono esplorare una vasta gamma di NFT legati ai viaggi, che possono acquistare, vendere o scambiare tra loro. Questi NFT possono rappresentare esperienze di viaggio uniche, opere d'arte digitali ispirate a destinazioni famose, o anche collezionabili legati a luoghi iconici in tutto il mondo. MooveMP fornisce una piattaforma sicura e intuitiva dove gli amanti dei viaggi e gli appassionati di NFT possono connettersi, scoprire e possedere pezzi unici legati al loro interesse comune per l'esplorazione del mondo. La piattaforma è dotata di funzionalità avanzate per garantire transazioni sicure e una navigazione user-friendly. Gli utenti possono anche partecipare a eventi virtuali, aste e collaborazioni con artisti digitali di tutto il mondo.`,
    titleEn: 'Moove Marketplace',
    shortDescriptionEn:
      'NFT platform for travel brands with drops and a marketplace for unique experiences.',
    fullDescriptionEn:
      `MooveMP is an NFT platform created by Moove that lets users dive into travel-themed non-fungible tokens. Users can explore a wide range of travel-related NFTs that can be bought, sold, or traded on-chain. These NFTs can represent unique travel experiences, digital artworks inspired by famous destinations, or collectibles tied to iconic locations around the world.

The platform provides a secure and intuitive environment where travel enthusiasts and NFT collectors can connect, discover, and own unique pieces linked to their passion for exploration. Advanced features ensure safe transactions and a smooth browsing experience. Users can also join virtual events, auctions, and collaborations with digital artists from around the world.`,
    imageUrl: '/images/marketplace.png',
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
    shortDescription: 'Marketplace NFT on-chain con estrazioni eque tramite VRF.',
    fullDescription:
      `Il contratto MyNFT permette agli utenti di partecipare a un mercato decentralizzato di token non fungibili (NFT), mettendo in risalto l'unicità e la proprietà digitale. Gli utenti possono acquistare e vendere NFT, ciascuno rappresentante un oggetto digitale unico, come arte, collezionabili e altro ancora. Questa piattaforma utilizza lo standard ERC-721 per garantire la compatibilità e la sicurezza nella gestione degli NFT. 
Il contratto include funzionalità avanzate di sicurezza e verifica, tra cui l'integrazione con il VRF (Verifiable Random Function) per garantire l'equità e la trasparenza nelle transazioni. Inoltre, i possessori di questi NFT avranno accesso esclusivo a corsi, sessioni di meditazione, chiamate e altri contenuti premium. Gli sviluppatori e gli utenti possono interagire con il contratto tramite una semplice interfaccia, facilitando l'adozione e l'utilizzo della piattaforma.`,
    titleEn: 'MyNFT VRF Contract',
    shortDescriptionEn: 'On-chain NFT marketplace with fair draws powered by Chainlink VRF.',
    fullDescriptionEn:
      `The MyNFT smart contract powers a decentralized marketplace for non‑fungible tokens, highlighting digital uniqueness and ownership. Users can buy and sell NFTs representing digital art, collectibles, and more, all built on the ERC‑721 standard for compatibility and security.

The contract integrates Verifiable Random Function (VRF) to guarantee fairness and transparency for random draws and rewards. Holders gain access to exclusive content such as courses, meditation sessions, and calls. Developers and users can interact with the contract through a simple interface, making it easy to adopt and extend the platform.`,
    imageUrl: '/images/nft.png',
    year: '2024',
    month: 'Febbraio',
    languages: ['Solidity', 'TypeScript'],
    type: 'Sviluppo Blockchain',
    vercelLink: '#',
    githubLink: 'https://github.com/Nicco6598/NFT-SmartContract',
  },
  {
    id: 3,
    title: 'voyage.',
    shortDescription: 'Booking crypto-friendly con MetaMask e recensioni integrate.',
    fullDescription:
      `voyage. è una piattaforma innovativa che permette di acquistare pacchetti viaggio utilizzando criptovalute. Grazie alla nostra integrazione con MetaMask e alla rete di test Sepolia, offriamo un'esperienza utente fluida e sicura, rendendo l'acquisto di pacchetti viaggio più accessibile che mai. Gli utenti possono esplorare vari pacchetti viaggio, comparare prezzi e destinazioni, e finalizzare gli acquisti in modo sicuro utilizzando le loro criptovalute preferite. La piattaforma include anche funzionalità di feedback e recensioni, permettendo agli utenti di condividere le loro esperienze e aiutare altri viaggiatori a fare scelte informate. Inoltre, voyage. offre promozioni e sconti esclusivi per i membri registrati, incentivando l'uso della piattaforma e la fidelizzazione dei clienti.`,
    titleEn: 'voyage.',
    shortDescriptionEn: 'Crypto‑friendly travel booking with MetaMask and integrated reviews.',
    fullDescriptionEn:
      `voyage. is a travel booking dApp that lets users purchase travel packages using cryptocurrencies. Through MetaMask integration and the Sepolia test network, it delivers a smooth and secure experience, making crypto payments for trips accessible.

Users can explore packages, compare prices and destinations, and complete purchases safely using their preferred tokens. The platform includes feedback and review features so travelers can share experiences and help others choose better. Registered members gain access to exclusive promotions and discounts, encouraging engagement and retention.`,
    imageUrl: '/images/travel.png',
    year: '2024',
    month: 'Gennaio',
    languages: ['Solidity', 'TypeScript', 'React'],
    type: 'Sviluppo Web',
    vercelLink: 'https://eth-d-app-travel.vercel.app/',
    githubLink: 'https://github.com/Nicco6598/eth_dApp-Travel',
  },
  {
    id: 4,
    title: 'DAO Smart Contract',
    shortDescription: 'Sistema di governance modulare per community decentralizzate.',
    fullDescription:
      `Il contratto DAO offre agli utenti l'opportunità di partecipare attivamente alle decisioni e alla governance della nostra piattaforma decentralizzata. Con la detenzione di azioni e il voto su proposte, gli utenti diventano membri chiave del nostro ecosistema, contribuendo direttamente alla sua crescita e sviluppo. La trasparenza e la partecipazione sono valori fondamentali su cui è costruita la nostra DAO. Con il nostro contratto, gli utenti possono acquistare azioni per partecipare alla governance e proporsi come amministratori della piattaforma. Le proposte possono riguardare una vasta gamma di argomenti, e ogni membro può esprimere il proprio voto, garantendo che le decisioni riflettano il vero consenso della comunità.`,
    titleEn: 'DAO Smart Contract',
    shortDescriptionEn: 'Modular governance system for decentralized communities.',
    fullDescriptionEn:
      `The DAO smart contract allows users to actively participate in decisions and governance of a decentralized platform. By holding shares and voting on proposals, users become key members of the ecosystem and directly contribute to its growth.

Transparency and participation are core values of this DAO. Users can buy shares to join governance and apply as administrators. Proposals can cover many topics, and every member can vote, ensuring that decisions reflect real community consensus.`,
    imageUrl: '/images/dao.png',
    year: '2024',
    month: 'Febbraio',
    languages: ['Solidity', 'Remix IDE'],
    type: 'Sviluppo Smart Contract',
    vercelLink: '#',
    githubLink: 'https://github.com/Nicco6598/DAO-SmartContract',
  },
  {
    id: 5,
    title: 'Bombyx Digital Menu',
    shortDescription: 'Menu digitale mobile-first per valorizzare l’esperienza in bar.',
    fullDescription:
      `Benvenuti nel progetto del menù digitale per Bombyx Bar, un'innovativa soluzione pensata per migliorare l'esperienza dei clienti e ottimizzare le operazioni quotidiane di uno dei locali più trendy della città.

Il Bombyx Bar è rinomato non solo per i suoi cocktail unici e l'atmosfera accogliente, ma anche per la sua costante ricerca di innovazione e miglioramento. Il menù digitale rappresenta un passo avanti verso il futuro del settore della ristorazione, combinando estetica moderna e funzionalità avanzate per offrire un'esperienza utente senza pari.

Questo menù digitale non è solo un elenco di piatti e bevande: è un'opportunità per i clienti di immergersi completamente nell'esperienza Bombyx, grazie a fotografie artistiche, descrizioni dettagliate dei prodotti e suggerimenti di abbinamento creati con cura. Ogni sezione è progettata per guidare i clienti attraverso un viaggio sensoriale, evidenziando i piatti di punta e invitando a esplorare nuovi sapori e combinazioni.

Grazie alla sua interfaccia intuitiva e accessibile, il menù digitale facilita non solo la scelta dei piatti, ma anche la gestione degli ordini per il personale del bar. Con un design responsivo, il menù si adatta perfettamente a diversi dispositivi, dallo smartphone al tablet, garantendo un'esperienza coerente e piacevole in ogni situazione.

Il progetto non si limita alla semplice creazione di un menù; è un impegno verso l'innovazione continua e il miglioramento dell'efficienza operativa. Oltre a migliorare l'esperienza del cliente, il menù digitale aiuta il Bombyx Bar a ridurre i costi di stampa e aggiornamento dei menù cartacei, contribuendo così a una gestione più sostenibile dell'ambiente.

In sintesi, il menù digitale per Bombyx Bar rappresenta l'incontro perfetto tra tradizione e modernità, offrendo un'esperienza culinaria e visiva senza precedenti. È un onore presentare questo progetto nel mio portfolio, testimoniando l'impegno nel portare innovazione e valore aggiunto a clienti e partner commerciali.`,
    titleEn: 'Bombyx Digital Menu',
    shortDescriptionEn: 'Mobile‑first digital menu that enhances the in‑bar experience.',
    fullDescriptionEn:
      `The Bombyx Digital Menu is a mobile‑first experience designed for a cocktail bar that wants to elevate how guests browse and discover drinks. The interface combines a modern visual design with clear information architecture, helping customers explore signatures, classics, and food pairings.

The menu replaces static print with a responsive web app that adapts to phones and tablets, reduces printing costs, and keeps content always up to date. Rich imagery, detailed descriptions, and pairing suggestions turn the menu into a storytelling tool rather than a simple list.

This project showcases how a simple digital touchpoint can improve both customer experience and operational efficiency for hospitality brands.`,
    imageUrl: '/images/bombyx_logo.png',
    year: '2024',
    month: 'Maggio',
    languages: ['React', 'TypeScript'],
    type: 'Sviluppo Web',
    status: 'Aggiornato a NextJS',
    vercelLink: 'https://bombyx-menu.vercel.app/',
    githubLink: 'https://github.com/Nicco6598/bombyx-menu',
  },
  {
    id: 6,
    title: 'Scandellari Website',
    shortDescription: 'Corporate site per un player ferroviario con autenticità industriale.',
    fullDescription:
      `Il sito web di Scandellari Giacinto SNC è stato realizzato per rappresentare online un'azienda leader nel settore ferroviario. Il progetto si è concentrato sulla creazione di una piattaforma moderna, intuitiva e responsive, in grado di presentare i servizi, la storia e i valori dell'azienda. Particolare attenzione è stata posta all'usabilità e all'accessibilità, per garantire una navigazione fluida sia da desktop che da dispositivi mobili. Il sito offre una panoramica dettagliata delle attività aziendali, delle certificazioni e delle realizzazioni, rafforzando la presenza digitale di Scandellari Giacinto SNC e facilitando il contatto con clienti e partner.`,
    titleEn: 'Scandellari Website',
    shortDescriptionEn: 'Corporate website for a railway contractor with an industrial visual language.',
    fullDescriptionEn:
      `The Scandellari Giacinto SNC website was built to bring a railway contractor online with a modern, trustworthy presence. The project focuses on a responsive layout, clear service presentation, and strong emphasis on certifications and completed works.

The UX is designed for both desktop and mobile, with simple navigation and fast access to key sections such as services, company history, and contact. The visual direction blends industrial photography, typography, and color to reflect the company’s real‑world environment and expertise.`,
    imageUrl: '/images/scandellari.png',
    year: '2025',
    month: 'Maggio',
    languages: ['React', 'TypeScript', 'Node.js', 'Express'],
    type: 'Sviluppo Web',
    vercelLink: 'https://scandellarigiacintosnc.it/',
    githubLink: 'https://github.com/Nicco6598/scandellari',
  },
  {
    id: 7,
    title: 'Exora',
    shortDescription: 'Piattaforma decentralizzata per prediction markets basata su Web3 con subnet TAO dedicate.',
    fullDescription:
      `Exora è una dapp innovativa per prediction markets che rivoluziona il modo di scommettere su eventi futuri attraverso la tecnologia blockchain. La piattaforma permette agli utenti di acquistare token rappresentativi di previsioni specifiche per eventi binari (Si/No), dove il prezzo del token riflette la probabilità percepita dal mercato che l'evento si verifichi.

Il funzionamento è basato su meccanismi di mercato automatizzati: gli utenti acquistano token che rappresentano la loro previsione su un evento specifico. Man mano che più persone scommettono, il prezzo dei token si aggiorna in tempo reale riflettendo l'opinione collettiva del mercato. Quando l'evento si risolve, i possessori dei token vincenti ricevono una ricompensa proporzionale alla loro partecipazione, creando un sistema di previsione collettiva altamente accurato.

Exora si distingue per l'architettura unica basata su subnet dedicate di TAO (Bittensor), dove ogni categoria di eventi (sport, politica, economia, intrattenimento, etc.) ha il suo proprio subnet di intelligenza artificiale che analizza dati in tempo reale, studia tendenze e propone automaticamente nuovi eventi di previsione, ampliando continuamente l'ecosistema senza intervento umano.

La piattaforma integra tecnologie all'avanguardia come WalletConnect per connessioni wallet sicure, Chainlink per oracle decentralizzati che garantiscono la risoluzione affidabile degli eventi, e smart contract Solidity ottimizzati per performance elevate. L'interfaccia utente, sviluppata con React e TypeScript, offre un'esperienza fluida e intuitiva per la gestione delle previsioni.

I principali competitors nel mercato dei prediction markets includono Polymarket (leader nei mercati regolamentati), Kalshi (specializzato in eventi economici), Augur (pioniere dei prediction markets su Ethereum) e Gnosis (con la loro piattaforma Conditional Tokens). Exora si differenzia grazie all'integrazione AI-driven e alla scalabilità offerta dalla rete Bittensor.

Attualmente il progetto è in fase di sviluppo attivo, con la costruzione degli smart contract Solidity, dell'interfaccia frontend React/Web3.js, dell'integrazione con WalletConnect, della configurazione delle subnet TAO e dell'implementazione degli oracle Pyth per garantire risoluzioni eventi imparziali e automatizzate.`,
    titleEn: 'Exora',
    shortDescriptionEn: 'Web3 prediction markets platform with dedicated TAO subnets.',
    fullDescriptionEn:
      `Exora is a Web3 prediction markets dApp that rethinks how people bet on future events using blockchain. Users buy tokens that represent binary outcomes (Yes/No), where each token price reflects the market’s perceived probability.

The system is powered by automated market‑making mechanisms that update prices in real time as users trade. When an event resolves, holders of the winning outcome receive rewards proportional to their position.

Exora is built around dedicated TAO (Bittensor) subnets, one for each event category (sports, politics, economy, entertainment, etc.). Each subnet runs AI models that analyze live data, detect trends, and continuously propose new markets.

The stack includes WalletConnect for secure wallet connections, Chainlink oracles for decentralized and reliable event resolution, and optimized Solidity smart contracts for performance. The React + TypeScript frontend delivers a clean interface for browsing, trading, and managing positions.`,
    imageUrl: '/images/exora_logo.png',
    year: '2025',
    month: 'Ottobre',
    languages: ['Solidity', 'React', 'TypeScript', 'Web3.js', 'WalletConnect', 'TAO Subnets', 'Pyth', 'Python'],
    type: 'Sviluppo di dApp',
    vercelLink: 'https://exoramarkets.vercel.app/',
    githubLink: '#',
    status: 'In Sviluppo',
    todo: [
      'Sviluppo smart contract Solidity per prediction markets con meccanismi AMM',
      'Configurazione subnet TAO dedicate per categorie di eventi (sport, politica, economia)',
      'Integrazione Chainlink oracle per risoluzione eventi decentralizzata',
      'Sviluppo sistema di analisi dati e proposta eventi automatica via Python',
      'Implementazione meccanismi di liquidità e incentivazione per subnet',
      'Testing completo e audit di sicurezza degli smart contract',
    ],
    todoEn: [
      'Design and implementation of Solidity smart contracts for AMM-based prediction markets',
      'Configuration of dedicated TAO subnets for event categories (sports, politics, economy)',
      'Integration of Chainlink oracles for decentralized event resolution',
      'Data analysis and automatic market proposal engine in Python',
      'Liquidity and incentive mechanisms for TAO subnets',
      'Full testing and security audit of the smart contracts',
    ],
  },
];

export const sortedProjects = [...projects].sort((a, b) => {
  const yearDiff = parseInt(b.year, 10) - parseInt(a.year, 10);
  if (yearDiff !== 0) {
    return yearDiff;
  }
  return monthToNumber(b.month) - monthToNumber(a.month);
});

export const featuredProjects = sortedProjects.slice(0, 3);
