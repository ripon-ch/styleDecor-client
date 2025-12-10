import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PageTransition from "components/PageTransition";
import NotFound from "pages/NotFound";
import HomeLanding from './pages/home-landing';
import ServicesCatalog from './pages/services-catalog';
import UserAuthentication from './pages/user-authentication';
import CustomerDashboard from './pages/customer-dashboard';
import PaymentProcessing from './pages/payment-processing';
import ServiceDetails from './pages/service-details';
import CoverageMap from './pages/coverage-map/CoverageMap';
import AdminDashboard from './pages/admin-dashboard';
import DecoratorDashboard from './pages/decorator-dashboard';
import AboutUs from './pages/about-us';
import ContactUs from './pages/contact-us';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location?.pathname}>
        {/* Define your route here */}
        <Route path="/" element={<PageTransition><HomeLanding /></PageTransition>} />
        <Route path="/home-landing" element={<PageTransition><HomeLanding /></PageTransition>} />
        <Route path="/services-catalog" element={<PageTransition><ServicesCatalog /></PageTransition>} />
        <Route path="/user-authentication" element={<PageTransition><UserAuthentication /></PageTransition>} />
        <Route path="/customer-dashboard" element={<PageTransition><CustomerDashboard /></PageTransition>} />
        <Route path="/payment-processing" element={<PageTransition><PaymentProcessing /></PageTransition>} />
        <Route path="/service-details" element={<PageTransition><ServiceDetails /></PageTransition>} />
        <Route path="/coverage-map" element={<PageTransition><CoverageMap /></PageTransition>} />
        <Route path="/admin-dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/decorator-dashboard" element={<PageTransition><DecoratorDashboard /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </RouterRoutes>
    </AnimatePresence>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AnimatedRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;