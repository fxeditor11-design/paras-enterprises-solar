import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { SolarCalculator } from './components/SolarCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceId(undefined);
  };

  const handleScrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070D18] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
      {/* Cinematic Welcome Intro on first load */}
      <IntroScreen />

      {/* Sticky High-End Navigation Bar */}
      <Header onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Cinematic Full-Screen Hero */}
        <Hero
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onScrollToContact={handleScrollToContact}
        />

        {/* 01 to 05 Interactive Services Section */}
        <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Cinematic Split-Screen About Section */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Premium Project Showcase (Solar Installation, Fitting, Govt Projects) */}
        <ProjectsShowcase onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Animated Map-Style Service Area Section (Latur & Surrounding Regions) */}
        <ServiceAreaSection onOpenQuoteModal={(loc) => handleOpenQuoteModal(loc)} />

        {/* Updated Paras Enterprises Solar Price Calculator */}
        <SolarCalculator onOpenQuoteModal={(note) => handleOpenQuoteModal(note)} />

        {/* Dramatic Contact CTA Section */}
        <ContactSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      {/* Corporate Engineering Footer */}
      <Footer onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Quick Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Quote / Inquiry Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        initialServiceId={selectedServiceId}
        onClose={handleCloseQuoteModal}
      />
    </div>
  );
}
