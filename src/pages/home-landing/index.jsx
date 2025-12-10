import React, { useEffect } from 'react';
import PrimaryNav from '../../components/navigation/PrimaryNav';

import HeroSection from './components/HeroSection';
import FeaturedDecorators from './components/FeaturedDecorators';
import CoverageMap from './components/CoverageMap';
import ServicesOverview from './components/ServicesOverview';
import TestimonialsSection from './components/TestimonialsSection';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';

const HomeLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="pt-16">
        <HeroSection />
        <FeaturedDecorators />
        <ServicesOverview />
        <CoverageMap />
        <TestimonialsSection />
        <TrustSignals />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLanding;