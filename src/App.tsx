import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { CaseStudies } from './sections/CaseStudies';
import { Process } from './sections/Process';
import { StickyPhotoCarousel } from './sections/StickyPhotoCarousel';
import { Testimonials } from './sections/Testimonials';
import { CTA } from './sections/CTA';
import { InteractiveLightSection } from './sections/InteractiveLightSection';
import { ContactSimple as Contact } from './sections/ContactSimple';
import { ScrollOrchestrator } from './motion/ScrollOrchestrator';
import { BackToTop } from './components/ui/BackToTop';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/cookies/CookieBanner';
import { CookiePreferencesModal } from './components/cookies/CookiePreferencesModal';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex flex-col font-sans antialiased selection-green"
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <Navbar />
        <ScrollOrchestrator>
          <main className="flex-1">
            <Hero />
            <Services />
            <CaseStudies />
            <Process />
            <InteractiveLightSection />
            <StickyPhotoCarousel />
            <Testimonials />
            <CTA />
            <Contact />
          </main>
        </ScrollOrchestrator>
        <BackToTop />
        <Footer />
        <CookieBanner />
        <CookiePreferencesModal />
      </div>
    </ThemeProvider>
  );
};
