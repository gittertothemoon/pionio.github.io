export interface LocalizedField { it: string; en: string }
export interface Service {
  id: string;
  name: LocalizedField;
  tagline: LocalizedField;
  description: LocalizedField;
  outcomes: LocalizedField[];
  roiNote: LocalizedField;
}

export const services: Service[] = [
  {
    id: 'design-system',
    name: { it: 'Design System & UI Kit', en: 'Design System & UI Kit' },
    tagline: { it: 'Il tuo brand, ovunque riconoscibile', en: 'Your brand, recognizable everywhere' },
    description: {
      it: 'Creo un sistema di design che fa sembrare il tuo brand sempre professionale e coerente. I tuoi clienti ti riconosceranno subito, su ogni pagina e piattaforma.',
      en: 'I create a design system that makes your brand always look professional and consistent. Your clients will recognize you immediately, on every page and platform.'
    },
    outcomes: [
      { it: 'Sviluppo più veloce del 30%', en: 'Development 30% faster' },
      { it: 'Brand sempre riconoscibile', en: 'Always recognizable brand' },
      { it: 'Pronto per crescere rapidamente', en: 'Ready for rapid growth' }
    ],
    roiNote: {
      it: 'Meno tempo sprecato in correzioni, più tempo per far crescere il business.',
      en: 'Less time wasted on corrections, more time to grow the business.'
    }
  },
  {
    id: 'conversion-site',
    name: { it: 'Sito che converte visitatori in clienti', en: 'Website that turns visitors into clients' },
    tagline: { it: 'Più contatti, più vendite', en: 'More contacts, more sales' },
    description: {
      it: 'Il tuo sito web non deve solo essere bello, deve vendere. Studio ogni dettaglio per guidare i visitatori verso l\'azione che vuoi: contattarti, comprare, iscriversi.',
      en: 'Your website shouldn\'t just look good, it should sell. I study every detail to guide visitors toward the action you want: contact you, buy, subscribe.'
    },
    outcomes: [
      { it: 'Più richieste di contatto', en: 'More contact requests' },
      { it: 'Meno abbandoni immediati', en: 'Fewer immediate abandons' },
      { it: 'Clienti che ti scelgono subito', en: 'Clients who choose you immediately' }
    ],
    roiNote: {
      it: 'Ogni nuovo cliente che arriva dal sito paga tutto il progetto.',
      en: 'Every new client from the site pays for the entire project.'
    }
  },
  {
    id: 'performance-refactor',
    name: { it: 'Sito veloce che non fa scappare i clienti', en: 'Fast site that doesn\'t scare away clients' },
    tagline: { it: 'Veloce = più fiducia e vendite', en: 'Fast = more trust and sales' },
    description: {
      it: 'I tuoi clienti abbandonano perché il sito è lento? Risolvo i problemi tecnici che ti fanno perdere soldi: caricamenti istantanei, navigazione fluida, esperienza perfetta.',
      en: 'Are your clients leaving because the site is slow? I fix the technical problems that make you lose money: instant loading, smooth navigation, perfect experience.'
    },
    outcomes: [
      { it: 'Caricamento sotto i 2 secondi', en: 'Loading under 2 seconds' },
      { it: 'Google ti premia nel ranking', en: 'Google rewards you in ranking' },
      { it: 'Visitatori che restano di più', en: 'Visitors who stay longer' }
    ],
    roiNote: {
      it: 'Un secondo di ritardo = 7% di conversioni perse. Vale la pena sistemare.',
      en: 'One second delay = 7% conversions lost. It\'s worth fixing.'
    }
  }
  ,
  {
    id: 'growth-analytics',
    name: { it: 'Dati chiari per decisioni vincenti', en: 'Clear data for winning decisions' },
    tagline: { it: 'Sai cosa funziona davvero', en: 'You know what really works' },
    description: {
      it: 'Basta andare a intuito. Ti mostro esattamente cosa fanno i visitatori sul tuo sito, dove si bloccano, cosa li convince. Dati semplici per scelte intelligenti.',
      en: 'Stop guessing. I show you exactly what visitors do on your site, where they get stuck, what convinces them. Simple data for smart choices.'
    },
    outcomes: [
      { it: 'Vedi il percorso di ogni cliente', en: 'See every customer\'s journey' },
      { it: 'Capisci chi ti porta più valore', en: 'Understand who brings you more value' },
      { it: 'Decidi basandoti sui fatti', en: 'Decide based on facts' }
    ],
    roiNote: {
      it: 'Stop sprecare budget su quello che non funziona. Investi solo su ciò che paga.',
      en: 'Stop wasting budget on what doesn\'t work. Invest only in what pays.'
    }
  },
  {
    id: 'ux-experimentation',
    name: { it: 'Test scientifici per crescere davvero', en: 'Scientific tests to truly grow' },
    tagline: { it: 'Miglioramenti continui e misurabili', en: 'Continuous and measurable improvements' },
    description: {
      it: 'Non cambio tutto sperando che funzioni. Testo ogni modifica su una parte dei visitatori prima di applicarla. Solo i miglioramenti veri restano, il resto lo scartiamo.',
      en: 'I don\'t change everything hoping it works. I test every change on part of visitors before applying it. Only real improvements stay, the rest we discard.'
    },
    outcomes: [
      { it: 'Ogni cambiamento migliora i risultati', en: 'Every change improves results' },
      { it: 'Zero rischi di peggiorare', en: 'Zero risk of making things worse' },
      { it: 'Crescita costante nel tempo', en: 'Constant growth over time' }
    ],
    roiNote: {
      it: 'Perché rischiare quando puoi essere certo? I test pagano se stessi.',
      en: 'Why risk when you can be certain? Tests pay for themselves.'
    }
  }
];
