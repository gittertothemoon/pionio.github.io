export interface LocalizedField { it: string; en: string }
export interface ProcessStep {
  id: string;
  title: LocalizedField;
  summary: LocalizedField;
  detail: LocalizedField;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: { it: 'Capiamo il tuo business', en: 'We understand your business' },
    summary: { it: 'Analizziamo insieme dove sei ora e dove vuoi arrivare.', en: 'We analyze together where you are now and where you want to go.' },
    detail: { it: 'Prima call gratuita per capire obiettivi, problemi attuali e opportunità nascoste. Niente perdite di tempo, solo strategie concrete.', en: 'Free first call to understand goals, current problems and hidden opportunities. No time wasting, only concrete strategies.' }
  },
  {
    id: 'architecture',
    title: { it: 'Progettiamo il percorso perfetto', en: 'We design the perfect path' },
    summary: { it: 'Ogni click deve portare più vicino all\'obiettivo.', en: 'Every click must bring closer to the goal.' },
    detail: { it: 'Mappa il percorso ideale dei tuoi clienti: da quando arrivano a quando comprano. Zero confusione, massima chiarezza.', en: 'Map your customers\' ideal journey: from when they arrive to when they buy. Zero confusion, maximum clarity.' }
  },
  {
    id: 'design',
    title: { it: 'Creiamo l\'esperienza che converte', en: 'We create the experience that converts' },
    summary: { it: 'Design che vende senza essere invadente.', en: 'Design that sells without being intrusive.' },
    detail: { it: 'Ogni elemento è studiato per guidare l\'occhio e convincere la mente. Il risultato: visitatori che diventano clienti naturalmente.', en: 'Every element is designed to guide the eye and convince the mind. The result: visitors who become clients naturally.' }
  },
  {
    id: 'delivery',
    title: { it: 'Lanciamo e miglioriamo insieme', en: 'We launch and improve together' },
    summary: { it: 'Risultati rapidi e crescita continua.', en: 'Quick results and continuous growth.' },
    detail: { it: 'Vedi i primi risultati in poche settimane. Poi monitoriamo, testiamo e miglioriamo costantemente per crescere ancora di più.', en: 'See first results in a few weeks. Then we monitor, test and constantly improve to grow even more.' }
  }
];
