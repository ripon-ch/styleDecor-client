import React, { useEffect } from "react";
import PrimaryNav from "../../components/navigation/PrimaryNav.jsx";

import HeroSection from "./components/HeroSection.jsx";
import FeaturedDecorators from "./components/FeaturedDecorators.jsx";
import CoverageMap from "./components/CoverageMap.jsx";
import ServicesOverview from "./components/ServicesOverview.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import TrustSignals from "./components/TrustSignals.jsx";
import Footer from "./components/Footer.jsx";

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
