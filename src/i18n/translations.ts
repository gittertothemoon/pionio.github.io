export type Locale = 'it' | 'en';

interface SectionCopy {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proof: string;
  };
  services: { heading: string; subheading: string; more: string };
  caseStudies: { heading: string; subheading: string };
  process: { heading: string; subheading: string };
  testimonials: { heading: string; subheading: string };
  cta: { heading: string; subheading: string; action: string };
  contact: { heading: string; subheading: string; submit: string; success: string };
  nav: { services: string; cases: string; process: string; testimonials: string; contact: string };
  footer: { rights: string; map: string; focus: string; social: string; privacy: string; terms: string; cookies: string; build: string };
  cookies: {
    bannerTitle: string;
    bannerBody: string;
    acceptAll: string;
    rejectAll: string;
    manage: string;
    modalTitle: string;
    modalDescription: string;
    save: string;
    close: string;
    required: string;
    categories: {
      essential: { title: string; description: string };
      analytics: { title: string; description: string };
      marketing: { title: string; description: string };
    };
  };
}

export const translations: Record<Locale, SectionCopy> = {
  it: {
    hero: {
      title: 'Trasformo idee digitali in risultati concreti',
      subtitle: 'Web designer specializzato in conversioni: ogni progetto è studiato per portare più clienti e aumentare i tuoi ricavi.',
      ctaPrimary: 'Parliamo del tuo progetto',
      ctaSecondary: 'Scopri i risultati ottenuti',
      proof: 'Progetti reali, metriche trasparenti, zero promesse vuote.'
    },
    services: {
      heading: 'Servizi che portano clienti',
      subheading: 'Ogni progetto è pensato per un obiettivo preciso: più lead, vendite aumentate, utenti che restano.',
      more: 'Scopri come posso aiutarti'
    },
    caseStudies: {
      heading: 'Progetti che hanno funzionato',
      subheading: 'Risultati concreti: più vendite, meno abbandoni, clienti soddisfatti.'
    },
    process: {
      heading: 'Come lavoriamo insieme',
      subheading: 'Un metodo collaudato per ottenere risultati rapidi senza sprecare tempo e budget.'
    },
    testimonials: {
      heading: 'Cosa dicono i miei clienti',
      subheading: 'Parole di chi ha visto crescere davvero il proprio business.'
    },
    cta: {
      heading: 'Pronto a far crescere il tuo business?',
      subheading: 'Parliamone insieme: scopriamo come migliorare i tuoi risultati digitali.',
      action: 'Iniziamo subito'
    },
    contact: {
      heading: 'Iniziamo a lavorare insieme',
      subheading: 'Raccontami il tuo progetto e dove vuoi arrivare. Ti rispondo entro 24 ore.',
      submit: 'Invia il messaggio',
      success: 'Messaggio inviato! Ti ricontatto entro 24 ore.'
    },
    nav: {
      services: 'Servizi',
      cases: 'Casi',
      process: 'Processo',
      testimonials: 'Testimonianze',
      contact: 'Contatto'
    },
    footer: { 
      rights: 'Tutti i diritti riservati', 
      map: 'Mappa', 
      focus: 'Focus', 
      social: 'Social', 
      privacy: 'Privacy', 
      terms: 'Termini', 
      cookies: 'Cookies', 
      build: 'Build' 
    },
    cookies: {
      bannerTitle: 'Questo sito usa cookie',
      bannerBody: 'Utilizziamo cookie essenziali per il funzionamento e facoltativi per analisi e marketing. Scegli ora o aggiorna in qualsiasi momento.',
      acceptAll: 'Accetta tutti',
      rejectAll: 'Rifiuta non essenziali',
      manage: 'Gestisci preferenze',
      modalTitle: 'Preferenze cookie',
      modalDescription: 'Scegli quali categorie di cookie vuoi attivare. Puoi modificare la scelta quando vuoi dal footer.',
      save: 'Salva preferenze',
      close: 'Chiudi',
      required: 'Obbligatorio',
      categories: {
        essential: {
          title: 'Essenziali',
          description: 'Garantiscono il funzionamento del sito e non possono essere disattivati.'
        },
        analytics: {
          title: 'Analitici',
          description: 'Ci aiutano a capire come viene utilizzato il sito per migliorare l\'esperienza.'
        },
        marketing: {
          title: 'Marketing',
          description: 'Permettono di personalizzare comunicazioni e campagne.'
        }
      }
    }
  },
  en: {
    hero: {
      title: 'I turn digital ideas into tangible results',
      subtitle: 'Web designer specialized in conversions: every project is designed to bring you more clients and increase your revenue.',
      ctaPrimary: 'Let\'s discuss your project',
      ctaSecondary: 'See the results achieved',
      proof: 'Real projects, transparent metrics, zero empty promises.'
    },
    services: {
      heading: 'Services that bring clients',
      subheading: 'Every project is designed with a precise goal: more leads, increased sales, users who stay.',
      more: 'Discover how I can help you'
    },
    caseStudies: {
      heading: 'Projects that worked',
      subheading: 'Concrete results: more sales, fewer abandons, satisfied clients.'
    },
    process: {
      heading: 'How we work together',
      subheading: 'A proven method to achieve rapid results without wasting time and budget.'
    },
    testimonials: {
      heading: 'What my clients say',
      subheading: 'Words from those who have truly seen their business grow.'
    },
    cta: {
      heading: 'Ready to grow your business?',
      subheading: 'Let\'s talk about it: let\'s discover how to improve your digital results.',
      action: 'Let\'s start now'
    },
    contact: {
      heading: 'Let\'s start working together',
      subheading: 'Tell me about your project and where you want to go. I\'ll reply within 24 hours.',
      submit: 'Send message',
      success: 'Message sent! I\'ll contact you within 24 hours.'
    },
    nav: {
      services: 'Services',
      cases: 'Cases',
      process: 'Process',
      testimonials: 'Testimonials',
      contact: 'Contact'
    },
    footer: { 
      rights: 'All rights reserved', 
      map: 'Map', 
      focus: 'Focus', 
      social: 'Social', 
      privacy: 'Privacy', 
      terms: 'Terms', 
      cookies: 'Cookies', 
      build: 'Build' 
    },
    cookies: {
      bannerTitle: 'This site uses cookies',
      bannerBody: 'We rely on essential cookies for core functionality and optional ones for analytics and marketing. Make your choice now or adjust it later.',
      acceptAll: 'Accept all',
      rejectAll: 'Reject non-essential',
      manage: 'Manage preferences',
      modalTitle: 'Cookie preferences',
      modalDescription: 'Select which cookie categories you want to enable. You can update your choice from the footer at any time.',
      save: 'Save preferences',
      close: 'Close',
      required: 'Required',
      categories: {
        essential: {
          title: 'Essential',
          description: 'Required to keep the website working and cannot be disabled.'
        },
        analytics: {
          title: 'Analytics',
          description: 'Help us understand usage to improve the experience.'
        },
        marketing: {
          title: 'Marketing',
          description: 'Allow us to personalise communications and campaigns.'
        }
      }
    }
  }
};
