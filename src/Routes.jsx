import React from "react";
import {
    Routes as RouterRoutes,
    Route,
    useLocation,
    Navigate
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageTransition from "./components/PageTransition.jsx";

import NotFound from "./pages/NotFound.jsx";
import HomeLanding from "./pages/home-landing/HomeLanding.jsx";
import ServicesCatalog from "./pages/services-catalog/ServicesCatalog.jsx";
import UserAuthentication from "./pages/user-authentication/UserAuthentication.jsx";
import CustomerDashboard from "./pages/customer-dashboard/CustomerDashboard.jsx";
import PaymentProcessing from "./pages/payment-processing/PaymentProcessing.jsx";
import ServiceDetails from "./pages/service-details/ServiceDetails.jsx";
import CoverageMap from "./pages/coverage-map/CoverageMap.jsx";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.jsx";
import DecoratorDashboard from "./pages/decorator-dashboard/DecoratorDashboard.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";
import ContactUs from "./pages/contact-us/ContactUs.jsx";

import { useAuth } from "./hooks/useAuth.jsx";

// ✅ PrivateRoute stays SAME
const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse">
                        Loading Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/user-authentication"
                state={{ from: location }}
                replace
            />
        );
    }

    if (roles) {
        const userRole = user.role?.toLowerCase().trim();
        const isAllowed = roles.some(
            role => role.toLowerCase().trim() === userRole
        );
        if (!isAllowed) return <Navigate to="/" replace />;
    }

    return children;
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <RouterRoutes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <HomeLanding />
                        </PageTransition>
                    }
                />
                <Route
                    path="/home-landing"
                    element={
                        <PageTransition>
                            <HomeLanding />
                        </PageTransition>
                    }
                />
                <Route
                    path="/services-catalog"
                    element={
                        <PageTransition>
                            <ServicesCatalog />
                        </PageTransition>
                    }
                />
                <Route
                    path="/user-authentication"
                    element={
                        <PageTransition>
                            <UserAuthentication />
                        </PageTransition>
                    }
                />
                <Route
                    path="/service-details"
                    element={
                        <PageTransition>
                            <ServiceDetails />
                        </PageTransition>
                    }
                />
                <Route
                    path="/coverage-map"
                    element={
                        <PageTransition>
                            <CoverageMap />
                        </PageTransition>
                    }
                />
                <Route
                    path="/about-us"
                    element={
                        <PageTransition>
                            <AboutUs />
                        </PageTransition>
                    }
                />
                <Route
                    path="/contact-us"
                    element={
                        <PageTransition>
                            <ContactUs />
                        </PageTransition>
                    }
                />

                <Route
                    path="/customer-dashboard"
                    element={
                        <PrivateRoute roles={["customer"]}>
                            <PageTransition>
                                <CustomerDashboard />
                            </PageTransition>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/payment-processing"
                    element={
                        <PrivateRoute roles={["customer"]}>
                            <PageTransition>
                                <PaymentProcessing />
                            </PageTransition>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <PrivateRoute roles={["admin"]}>
                            <PageTransition>
                                <AdminDashboard />
                            </PageTransition>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/decorator-dashboard"
                    element={
                        <PrivateRoute roles={["decorator"]}>
                            <PageTransition>
                                <DecoratorDashboard />
                            </PageTransition>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <PageTransition>
                            <NotFound />
                        </PageTransition>
                    }
                />
            </RouterRoutes>
        </AnimatePresence>
    );
};

export default function Routes() {
    return (
        <>
            <ScrollToTop />
            <AnimatedRoutes />
        </>
    );
}
