export interface LocalizedField { it: string; en: string }
export interface CaseStudyVisual {
  src: string;
  alt: LocalizedField;
  className?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  challenge: LocalizedField;
  solution: LocalizedField;
  impactMetrics: { label: LocalizedField; value: string; highlight?: boolean }[];
  testimonial?: { author: string; role: string; quote: LocalizedField };
  visual: CaseStudyVisual;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'smoky-candle',
    client: 'Smoky Candle',
    sector: 'E-commerce artigianale',
    challenge: {
      it: 'Traffico in crescita ma pochissime vendite: i visitatori non capivano la qualità artigianale e abbandonavano al checkout mobile (72% di abbandoni). Soldi buttati in marketing.',
      en: 'Growing traffic but very few sales: visitors didn\'t understand the artisanal quality and abandoned at mobile checkout (72% abandonment). Money wasted on marketing.'
    },
    solution: {
      it: 'Ho trasformato il sito in una storia: ogni candela racconta il processo artigianale, i profumi diventano esperienze, il checkout mobile è ora semplice e sicuro con bundle irresistibili.',
      en: 'I transformed the site into a story: every candle tells the artisanal process, scents become experiences, mobile checkout is now simple and secure with irresistible bundles.'
    },
    impactMetrics: [
      { label: { it: 'Tasso di conversione', en: 'Conversion rate' }, value: '+27%', highlight: true },
      { label: { it: 'Valore medio ordine', en: 'Average order value' }, value: '+18%' },
      { label: { it: 'Abbandono carrello', en: 'Cart abandonment' }, value: '-22%' }
    ],
    testimonial: {
      author: 'Ivan P. e Gianmarco P. ',
      role: 'Founders & Makers',
      quote: {
        it: 'Finalmente il sito vende da solo. Prima dovevo convincere ogni cliente, ora mi chiamano già convinti. È il miglior investimento che abbia mai fatto.',
        en: 'Finally the site sells by itself. Before I had to convince every client, now they call me already convinced. It\'s the best investment I\'ve ever made.'
      }
    },
    visual: {
      src: '/case-studies/cs1.png',
      alt: {
        it: 'Homepage Smoky Candle con vetrina candele artigianali e storytelling sugli aromi',
        en: 'Smoky Candle homepage showcasing artisanal soy candles with scent storytelling'
      }
    }
  },
  {
    id: 'arena-barbershop',
    client: 'Arena Barbershop',
    sector: 'Servizi premium',
    challenge: {
      it: 'Barbershop di lusso con una gestione da dilettanti: clienti internazionali persi per la barriera linguistica, 30% di mancate presentazioni. Perdite economiche enormi.',
      en: 'Luxury barbershop with amateur management: international clients lost due to language barrier, 30% no-shows. Huge economic losses.'
    },
    solution: {
      it: 'Ho digitalizzato tutto: prenotazioni bilingue automatiche, profili dettagliati di ogni barbiere, pacchetti membership premium e reminder WhatsApp che funzionano davvero.',
      en: 'I digitized everything: automatic bilingual bookings, detailed profiles of every barber, premium membership packages and WhatsApp reminders that actually work.'
    },
    impactMetrics: [
      { label: { it: 'Prenotazioni online', en: 'Online bookings' }, value: '+64%', highlight: true },
      { label: { it: 'No-show', en: 'No-shows' }, value: '-28%' },
      { label: { it: 'Ticket medio', en: 'Average ticket' }, value: '+15%' }
    ],
    testimonial: {
      author: 'Paulo H.',
      role: 'Owner & Master Barber',
      quote: {
        it: 'Da quando abbiamo il nuovo sistema, l\'agenda è sempre piena e non perdo più tempo al telefono. I clienti prenotano da soli e pagano prima. Geniale.',
        en: 'Since we got the new system, the calendar is always full and I don\'t waste time on the phone anymore. Clients book themselves and pay in advance. Brilliant.'
      }
    },
    visual: {
      src: '/case-studies/cs2.png',
      alt: {
        it: 'Interfaccia Arena Barbershop con prenotazione online e profili barber bilingue',
        en: 'Arena Barbershop interface highlighting bilingual booking and barber profiles'
      }
    }
  },
  {
    id: 'sap-data-monitor',
    client: 'SAP Data Monitor',
    sector: 'Enterprise Software',
    challenge: {
      it: 'Dashboard SAP complesse rendevano impossibile prendere decisioni rapide. Dati sparsi ovunque, errori di reporting, team che perdeva ore preziose invece di lavorare.',
      en: 'Complex SAP dashboards made it impossible to make quick decisions. Data scattered everywhere, reporting errors, teams wasting precious hours instead of working.'
    },
    solution: {
      it: 'Ho creato un centro di controllo unificato: tutti i dati SAP in una dashboard intuitiva, alert automatici quando serve, report che si generano da soli. Semplicità al posto del caos.',
      en: 'I created a unified control center: all SAP data in an intuitive dashboard, automatic alerts when needed, reports that generate themselves. Simplicity instead of chaos.'
    },
    impactMetrics: [
      { label: { it: 'Tempo di reporting', en: 'Reporting time' }, value: '-65%', highlight: true },
      { label: { it: 'Errori di processo', en: 'Process errors' }, value: '-42%' },
      { label: { it: 'Efficienza operativa', en: 'Operational efficiency' }, value: '+38%' }
    ],
    testimonial: {
      author: 'Giovanni Caputo',
      role: 'IT Operations Manager',
      quote: {
        it: 'Abbiamo risparmiato ore di lavoro ogni giorno. Quello che prima richiedeva un team ora lo fa una persona in pochi minuti. ROI impressionante.',
        en: 'We saved hours of work every day. What used to require a team now takes one person a few minutes. Impressive ROI.'
      }
    },
    visual: {
      src: '/case-studies/cs3.png',
      alt: {
        it: 'Dashboard SAP Data Monitor con grafici real-time e alert di sistema',
        en: 'SAP Data Monitor dashboard with real-time charts and system alerts'
      }
    }
  },
  {
    id: 'creator-portfolio',
    client: 'IVY&NINA Portfolio',
    sector: 'Creator Economy',
    challenge: {
      it: 'Talento sprecato su una sola piattaforma: dependevano totalmente da Instagram, monetizzazione limitata, brand personale confuso. Rischio enorme se l\'algoritmo cambiava.',
      en: 'Talent wasted on one platform: totally dependent on Instagram, limited monetization, confused personal brand. Huge risk if the algorithm changed.'
    },
    solution: {
      it: 'Ho costruito il loro impero digitale: portfolio elegante che mostra tutto il valore, sistema di prenotazioni per servizi premium, diversificazione su più canali. Indipendenza totale.',
      en: 'I built their digital empire: elegant portfolio that shows all the value, booking system for premium services, diversification across multiple channels. Total independence.'
    },
    impactMetrics: [
      { label: { it: 'Revenue diversificati', en: 'Diversified revenue' }, value: '+73%', highlight: true },
      { label: { it: 'Engagement rate', en: 'Engagement rate' }, value: '+45%' },
      { label: { it: 'Servizi premium', en: 'Premium services' }, value: '+28%' }
    ],
    testimonial: {
      author: 'Ivy & Nina',
      role: 'Content Creators',
      quote: {
        it: 'Ora controlliamo noi il nostro destino. Non dipendiamo più dai capricci di Instagram e guadagniamo il triplo. Libertà totale.',
        en: 'Now we control our own destiny. We no longer depend on Instagram\'s whims and earn triple. Total freedom.'
      }
    },
    visual: {
      src: '/case-studies/cs4.png',
      alt: {
        it: 'Portfolio IVY&NINA con sezioni premium, gallery e sistema di booking',
        en: 'IVY&NINA portfolio with premium sections, gallery and booking system'
      }
    }
  }
];
