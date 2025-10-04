# PIONIO Portfolio

Un portfolio interattivo costruito con React + TypeScript + Tailwind CSS, progettato per conversioni elevate e un'esperienza utente coinvolgente.

## 🎯 Caratteristiche Principali

- **🌍 Internazionalizzazione**: Supporto completo IT/EN con contenuti localizzati
- **🎬 Animazioni Avanzate**: Sistema motion globale con Framer Motion e rispetto A11y
- **📱 Responsive Design**: Ottimizzato per desktop, tablet e mobile
- **⚡ Performance**: Animazioni hardware-accelerated, lazy loading, bundle ottimizzato
- **🎨 Design System**: Palette brand coerente (nero + verde bosco), tipografia scalabile
- **♿ Accessibilità**: WCAG compliant, keyboard navigation, screen reader friendly

## 🏗️ Architettura

```
src/
├── components/           # Componenti riutilizzabili
│   ├── ui/              # Primitives (Button, Badge, Metric)
│   └── layout/          # Layout components (Container, Section, Navbar)
├── sections/            # Sezioni principali del sito
│   ├── Hero.tsx         # Landing con animazioni parola-per-parola
│   ├── Services.tsx     # Griglia servizi con reveal staggered
│   ├── CaseStudiesNew.tsx # Scrollytelling sticky immagine + testi
│   ├── Process.tsx      # Timeline verticale sticky con progress
│   ├── Testimonials.tsx # Carousel auto-play con touch support
│   ├── CTA.tsx          # Call-to-action con gradient beam
│   └── Contact.tsx      # Form validato con stati localizzati
├── motion/              # Sistema animazioni
│   ├── MotionProvider.tsx    # Context globale, token, A11y
│   ├── AnchorGlow.tsx        # Link luminosi con scroll-to-section
│   ├── Scrollytelling.tsx    # Pattern sticky immagine + contenuto
│   ├── SectionSeparator.tsx  # Separatori progressivi tra sezioni
│   └── ScrollOrchestrator.tsx # Parallax background, page progress
├── i18n/                # Internazionalizzazione
│   ├── translations.ts       # Dizionario strutturato IT/EN
│   └── I18nProvider.tsx      # Context con localStorage persistence
├── data/                # Contenuti statici localizzati
│   ├── services.ts      # Servizi con ROI focus
│   ├── caseStudies.ts   # Casi studio con metriche impatto
│   ├── process.ts       # Step processo iterativo
│   ├── testimonials.ts  # Quote clienti localizzate
│   └── metrics.ts       # KPI e statistiche
└── utils/               # Utilities
    ├── cn.ts           # Class name merger (clsx wrapper)
    └── loc.ts          # Helper localizzazione tr(field, locale)
```

## 🎨 Design System

### Palette Colori
```css
/* Brand Colors (Verde Bosco) */
--brand-50: #f0fdf4
--brand-100: #dcfce7
--brand-200: #bbf7d0
--brand-300: #86efac
--brand-400: #4ade80
--brand-500: #22c55e   /* Primary */
--brand-600: #16a34a
--brand-700: #15803d
--brand-800: #166534
--brand-900: #14532d

/* Accent (Marrone Scuro) */
--brand-accent: #5a3122
```

### Typography
- **Font Stack**: Inter, system-ui, sans-serif
- **Scale**: text-xs (11px) → text-5xl (48px)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)

### Motion Tokens
```javascript
{
  ease: [0.22, 1, 0.36, 1],     // Cubic bezier custom
  duration: { short: 0.45, base: 0.55, long: 0.65 },
  y: { small: 16, base: 20, large: 24 },
  stagger: { tight: 0.06, base: 0.08, loose: 0.09 },
  threshold: 0.15,              // Viewport intersection
  parallax: '10%',              // Max background parallax
}
```

## 🚀 Setup e Sviluppo

### Prerequisiti
- Node.js 18+ 
- npm/yarn/pnpm

### Installazione
```bash
# Clone del repository
git clone [repository-url]
cd pionio-portfolio

# Installazione dipendenze
npm install

# Avvio dev server
npm run dev

# Build produzione
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 🌐 Deploy su GitHub Pages

### Setup Automatico (Raccomandato)

1. **Crea repository su GitHub** chiamato `pionio-portfolio`
2. **Connetti il repository locale**:
   ```bash
   git remote add origin https://github.com/TUO_USERNAME/pionio-portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. **Abilita GitHub Pages**:
   - Vai su Settings > Pages nel repository
   - Source: seleziona "GitHub Actions"
   - Il deploy si avvierà automaticamente ad ogni push su `main`

### Deploy Manuale
```bash
npm run deploy
```

### Configurazione
- **Vite Config**: Base URL configurato per GitHub Pages in `vite.config.ts`
- **GitHub Actions**: Workflow automatico in `.github/workflows/deploy.yml`
- **URL Produzione**: `https://TUO_USERNAME.github.io/pionio-portfolio/`

> **⚠️ Importante**: Sostituisci `TUO_USERNAME` in `vite.config.ts` con il tuo username GitHub effettivo

### Dipendenze Principali
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^11.11.17",
  "clsx": "^2.1.1",
  "typescript": "^5.6.2",
  "tailwindcss": "^3.4.13",
  "vite": "^5.4.10"
}
```

## 🌍 Internazionalizzazione

### Struttura Traduzioni
```typescript
// src/i18n/translations.ts
export const translations: Record<Locale, SectionCopy> = {
  it: { hero: { title: "...", subtitle: "..." }, ... },
  en: { hero: { title: "...", subtitle: "..." }, ... }
}
```

### Uso nei Componenti
```typescript
// Hook principale
const { locale, t, switchLocale } = useI18n();

// Helper per campi localizzati
import { tr } from '../utils/loc';
const localizedText = tr(field, locale); // field: {it: "...", en: "..."}
```

### Campi Localizzati
```typescript
interface LocalizedField {
  it: string;
  en: string;
}

// Esempio uso nei dati
export const services: Service[] = [
  {
    id: 'strategy',
    name: { it: 'Strategia UX', en: 'UX Strategy' },
    description: { it: '...', en: '...' }
  }
];
```

## 🎬 Sistema Motion

### MotionProvider
Context globale che fornisce:
- Token di animazione standardizzati
- Rilevamento `prefers-reduced-motion`
- Factory per varianti Framer Motion
- Componenti riutilizzabili (Reveal, Stagger)

### Componenti Motion

#### Reveal
```typescript
<Reveal distance={20} delay={0.1} className="...">
  <h2>Titolo animato</h2>
</Reveal>
```

#### Stagger
```typescript
<Stagger stagger={0.08}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</Stagger>
```

#### AnchorGlow
```typescript
<AnchorGlow to="section-id" className="...">
  Link con glow e scroll fluido
</AnchorGlow>
```

#### Scrollytelling
```typescript
<Scrollytelling
  steps={contentSteps}
  stickyImage={<MyImage />}
/>
```

### Accessibilità Motion
- **Reduced Motion**: Automaticamente disabilita animazioni e parallax
- **Focus States**: Sempre visibili e contrastati
- **Keyboard Navigation**: Supporto completo tab/enter/space
- **Screen Readers**: Aria labels e live regions

## 📱 Responsive Design

### Breakpoints
```css
/* Tailwind default */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Pattern Responsivi
- **Mobile First**: Stili base per mobile, media queries per desktop
- **Sticky Disable**: Timeline e scrollytelling diventano sequenziali su mobile
- **Touch Support**: Swipe gestures per carousel e navigazione
- **Performance**: Animazioni ridotte su dispositivi meno potenti

## ⚡ Performance

### Ottimizzazioni Implementate
- **Hardware Acceleration**: Solo `opacity` e `transform` animate
- **Will-Change**: Applicato strategicamente prima delle animazioni
- **Intersection Observer**: Trigger efficienti per animazioni scroll-based
- **Lazy Loading**: Immagini e componenti caricati on-demand
- **Bundle Splitting**: Code splitting automatico via Vite

### Metriche Target
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1
- **Performance Budget**: Bundle < 500KB gzipped

## 🧪 Testing e QA

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Device Testing
- ✅ iPhone 12/13/14 (Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)
- ✅ Desktop 1920×1080, 1366×768

### Accessibility Checklist
- ✅ Keyboard navigation completa
- ✅ Screen reader compatibility
- ✅ Color contrast ratio WCAG AA
- ✅ Focus indicators visibili
- ✅ Reduced motion respect
- ✅ Semantic HTML structure

## 🔧 Personalizzazione

### Modificare Colori Brand
```css
/* tailwind.config.cjs */
theme: {
  extend: {
    colors: {
      brand: {
        500: '#your-primary-color',
        600: '#your-primary-dark',
        // ... altri toni
      }
    }
  }
}
```

### Aggiungere Nuove Sezioni
1. Creare componente in `src/sections/`
2. Aggiungere traduzioni in `src/i18n/translations.ts`
3. Importare e usare in `src/App.tsx`
4. Aggiungere link navigation in `src/components/layout/Navbar.tsx`

### Personalizzare Animazioni
```typescript
// src/motion/MotionProvider.tsx
export const motionTokens = {
  duration: { base: 0.8 }, // Rallenta animazioni
  ease: [0.25, 0.1, 0.25, 1], // Nuovo easing
  // ...
};
```

## 📝 Contribuire

1. Fork del repository
2. Branch feature (`git checkout -b feature/amazing-feature`)
3. Commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Aprire Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🤝 Supporto

Per domande o supporto:
- 📧 Email: [your-email]
- 💬 Issues: [GitHub Issues]
- 📚 Docs: [Documentazione completa]

---

**PIONIO** • Results Oriented Digital Partner
