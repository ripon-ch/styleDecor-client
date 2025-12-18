import React from "react";
import { Routes as RouterRoutes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PageTransition from "components/PageTransition";

import NotFound from "pages/NotFound";
import HomeLanding from "./pages/home-landing";
import ServicesCatalog from "./pages/services-catalog";
import UserAuthentication from "./pages/user-authentication";
import CustomerDashboard from "./pages/customer-dashboard";
import PaymentProcessing from "./pages/payment-processing";
import ServiceDetails from "./pages/service-details";
import CoverageMap from "./pages/coverage-map/CoverageMap";
import AdminDashboard from "./pages/admin-dashboard";
import DecoratorDashboard from "./pages/decorator-dashboard";
import AboutUs from "./pages/about-us";
import ContactUs from "./pages/contact-us";

import { useAuth } from "./hooks/useAuth";

// PrivateRoute wrapper
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/user-authentication" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location?.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransition><HomeLanding /></PageTransition>} />
        <Route path="/home-landing" element={<PageTransition><HomeLanding /></PageTransition>} />
        <Route path="/services-catalog" element={<PageTransition><ServicesCatalog /></PageTransition>} />
        <Route path="/user-authentication" element={<PageTransition><UserAuthentication /></PageTransition>} />
        <Route path="/service-details" element={<PageTransition><ServiceDetails /></PageTransition>} />
        <Route path="/coverage-map" element={<PageTransition><CoverageMap /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />

        {/* Protected Routes */}
        <Route path="/customer-dashboard" element={<PrivateRoute role="customer"><PageTransition><CustomerDashboard /></PageTransition></PrivateRoute>} />
        <Route path="/payment-processing" element={<PrivateRoute role="customer"><PageTransition><PaymentProcessing /></PageTransition></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><PageTransition><AdminDashboard /></PageTransition></PrivateRoute>} />
        <Route path="/decorator-dashboard" element={<PrivateRoute role="decorator"><PageTransition><DecoratorDashboard /></PageTransition></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </RouterRoutes>
    </AnimatePresence>
  );
};

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AnimatedRoutes />
    </ErrorBoundary>
  );
};

export default Routes;
