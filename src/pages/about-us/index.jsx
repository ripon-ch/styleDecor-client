import React, { useEffect, useState } from 'react';

import PrimaryNav from '../../components/navigation/PrimaryNav';
import Footer from '../home-landing/components/Footer';
import HeroSection from './components/HeroSection';
import CompanyStory from './components/CompanyStory';
import TeamShowcase from './components/TeamShowcase';
import StatisticsSection from './components/StatisticsSection';
import ValuesCommitment from './components/ValuesCommitment';
import BangladeshFocus from './components/BangladeshFocus';


const AboutUs = () => {
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
          <p className="text-sm text-muted-foreground">Loading About Us...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="pt-16">
        <HeroSection />
        <CompanyStory />
        <StatisticsSection />
        <TeamShowcase />
        <ValuesCommitment />
        <BangladeshFocus />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;