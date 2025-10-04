export interface LocalizedField { it: string; en: string }
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: LocalizedField;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Giulia P.',
    role: 'Founder SaaS Fintech',
    quote: {
      it: 'In 3 mesi abbiamo raddoppiato le conversioni. Non è solo design, è strategia di business che funziona. Investimento già ripagato.',
      en: 'In 3 months we doubled conversions. It\'s not just design, it\'s business strategy that works. Investment already paid back.'
    }
  },
  {
    id: 't2',
    author: 'Andrea L.',
    role: 'Marketing Lead',
    quote: {
      it: 'Prima sprecavamo budget in traffico che non convertiva. Ora ogni visitatore ha più probabilità di diventare cliente. ROI incredibile.',
      en: 'Before we wasted budget on traffic that didn\'t convert. Now every visitor is more likely to become a client. Incredible ROI.'
    }
  },
  {
    id: 't3',
    author: 'Sara R.',
    role: 'E-commerce Manager',
    quote: {
      it: 'Il sito ora vende anche di notte. Performance perfetta e vendite cresciute del 40%. È il collaboratore più prezioso che abbiamo.',
      en: 'The site now sells even at night. Perfect performance and sales grew 40%. He\'s the most valuable collaborator we have.'
    }
  }
];
