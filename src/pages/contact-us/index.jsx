import React, { useEffect, useState } from 'react';

import PrimaryNav from '../../components/navigation/PrimaryNav';
import Footer from '../home-landing/components/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactMethods from './components/ContactMethods';
import OfficeLocations from './components/OfficeLocations';
import FAQSection from './components/FAQSection';
import SupportTicket from './components/SupportTicket';

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-sm text-muted-foreground">Loading Contact Information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="pt-16">
        <ContactHero />
        <ContactMethods />
        <ContactForm />
        <OfficeLocations />
        <FAQSection />
        <SupportTicket />
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;