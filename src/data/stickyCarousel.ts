import { LField } from '../utils/loc';

export type Vector = 'right' | 'left' | 'top' | 'bottom' | 'corner-tr' | 'corner-tl' | 'corner-br' | 'corner-bl';

export interface StickyImage {
  src: string;
  alt: LField;
  from: Vector;
  rotate?: number; // degrees, max 8-10°
  depth?: 0 | 1 | 2; // parallax depth layers
}

export interface StickyStep {
  id: string;
  caption: LField;
  images: StickyImage[];
}

// Mock data per la sticky photo carousel - 1-2 immagini per focus massimo
export const stickySteps: StickyStep[] = [
  {
    id: 'research',
    caption: {
      it: 'Ascoltiamo → Capiamo',
      en: 'We Listen → We Understand'
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Ricerca approfondita sui tuoi clienti', en: 'Deep research on your customers' },
        from: 'right',
        depth: 0
      }
    ]
  },
  {
    id: 'strategy',
    caption: {
      it: 'Strategiamo → Pianifichiamo',
      en: 'We Strategize → We Plan'
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Strategia per il tuo successo', en: 'Strategy for your success' },
        from: 'left',
        depth: 0
      },
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Piano dettagliato di crescita', en: 'Detailed growth plan' },
        from: 'corner-tr',
        rotate: 5,
        depth: 1
      }
    ]
  },
  {
    id: 'design',
    caption: {
      it: 'Progettiamo → Creiamo',
      en: 'We Design → We Create'
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Design che converte visitatori in clienti', en: 'Design that converts visitors into clients' },
        from: 'top',
        depth: 0
      }
    ]
  },
  {
    id: 'development',
    caption: {
      it: 'Sviluppiamo → Testiamo',
      en: 'We Develop → We Test'
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Sviluppo perfetto e veloce', en: 'Perfect and fast development' },
        from: 'bottom',
        depth: 0
      },
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Architettura solida per crescere', en: 'Solid architecture to grow' },
        from: 'corner-bl',
        rotate: -6,
        depth: 1
      }
    ]
  },
  {
    id: 'optimization',
    caption: {
      it: 'Ottimizziamo → Perfezioniamo',
      en: 'We Optimize → We Perfect'  
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Prestazioni al massimo per più vendite', en: 'Maximum performance for more sales' },
        from: 'right',
        rotate: 4,
        depth: 0
      }
    ]
  },
  {
    id: 'launch',
    caption: {
      it: 'Lanciamo → Facciamo crescere',
      en: 'We Launch → We Grow'
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Il tuo successo online inizia qui', en: 'Your online success starts here' },
        from: 'left',
        depth: 0
      },
      {
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
        alt: { it: 'Crescita continua e risultati concreti', en: 'Continuous growth and concrete results' },
        from: 'corner-tr',
        rotate: -4,
        depth: 1
      }
    ]
  }
];