export interface LocalizedField { it: string; en: string }
export interface GlobalMetric { label: LocalizedField; value: string; }

export const globalMetrics: GlobalMetric[] = [
  { label: { it: 'Clienti che vedono più vendite', en: 'Clients who see more sales' }, value: '95%' },
  { label: { it: 'Media crescita conversioni', en: 'Average conversion growth' }, value: '+34%' },
  { label: { it: 'Meno visitatori che scappano', en: 'Fewer visitors who flee' }, value: '-28%' },
  { label: { it: 'Risultati visibili entro', en: 'Visible results within' }, value: '4-6 settimane' }
];
