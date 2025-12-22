import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx"; // ✅ Correct hook path
import { bookingAPI as bookingService } from "../../services/api/bookingAPI.js"; // ✅ Correct service path

import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import PrimaryNav from "../../components/navigation/PrimaryNav.jsx";
import Breadcrumb from "../../components/navigation/Breadcrumb.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import DashboardStats from "./components/DashboardStats.jsx";
import TabNavigation from "./components/TabNavigation.jsx";
import ActiveBookingCard from "./components/ActiveBookingCard.jsx";
import BookingHistoryCard from "./components/BookingHistoryCard.jsx";
import PaymentHistoryCard from "./components/PaymentHistoryCard.jsx";
import ProfileManagement from "./components/ProfileManagement.jsx";
import QuickActions from "./components/QuickActions.jsx";
import UpcomingAppointments from "./components/UpcomingAppointments.jsx";
import RecommendedServices from "./components/RecommendedServices.jsx";
import Footer from "../home-landing/components/Footer.jsx";

export default function CustomerDashboard() {
    const { user, profile } = useAuth() || {};
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("active");

    useEffect(() => {
        if (user) {
            loadBookings();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadBookings = async () => {
        setLoading(true);
        setError("");
        try {
            const userId = user?.id || user?._id;
            if (!userId) throw new Error("User ID not found");
            const data = await bookingService.getAll(userId, "customer");
            setBookings(data || []);
        } catch (err) {
            setError(err?.message || "Connection Error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={loadBookings}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const upcomingBookings = bookings?.filter(
        b => b?.status === "confirmed" || b?.status === "in_progress"
    );
    const completedBookings = bookings?.filter(b => b?.status === "completed");

    const userData = {
        fullName: user?.name || "Rahul Ahmed",
        email: user?.email || "rahul.ahmed@example.com",
        phone: user?.phone || "+880 1712-345678",
        district: user?.address?.district || "dhaka",
        thana: user?.address?.thana || "dhanmondi",
        address: user?.address?.fullAddress || "House 45, Road 12, Dhanmondi",
        emailNotifications: true,
        smsNotifications: true
    };

    const dashboardStats = {
        activeBookings: upcomingBookings?.length || 0,
        completedServices: completedBookings?.length || 0,
        totalSpent:
            bookings?.reduce((sum, b) => sum + (b?.amount || 0), 0) || 0,
        favoriteDecorators: 5
    };

    const paymentHistory = [
        {
            id: 1,
            serviceName: "Wedding Stage Decoration",
            transactionId: "TXN-2025-001234",
            amount: 45000,
            paymentMethod: "Stripe",
            date: "01/12/2025",
            time: "03:45 PM",
            location: "Dhanmondi, Dhaka",
            status: "Completed"
        },
        {
            id: 2,
            serviceName: "Anniversary Celebration Decor",
            transactionId: "TXN-2025-001189",
            amount: 18000,
            paymentMethod: "Stripe",
            date: "25/11/2025",
            time: "11:20 AM",
            location: "Uttara, Dhaka",
            status: "Completed"
        },
        {
            id: 3,
            serviceName: "Corporate Event Setup",
            transactionId: "TXN-2025-001145",
            amount: 35000,
            paymentMethod: "Bank Transfer",
            date: "10/11/2025",
            time: "02:15 PM",
            location: "Banani, Dhaka",
            status: "Completed"
        },
        {
            id: 4,
            serviceName: "Baby Shower Decoration",
            transactionId: "TXN-2025-001098",
            amount: 12000,
            paymentMethod: "Cash",
            date: "05/11/2025",
            time: "10:30 AM",
            location: "Dhanmondi, Dhaka",
            status: "Completed"
        }
    ];

    const upcomingAppointments = [
        {
            id: 1,
            serviceName: "Wedding Stage Decoration",
            serviceImage:
                "https://images.unsplash.com/photo-1629222061513-6153477c7f2f",
            serviceImageAlt:
                "Elegant wedding stage with white and gold floral arrangements",
            date: "15/12/2025",
            time: "10:00 AM",
            daysUntil: 9
        },
        {
            id: 2,
            serviceName: "Birthday Party Decoration",
            serviceImage:
                "https://images.unsplash.com/photo-1641152298090-5d88769d4fc7",
            serviceImageAlt: "Colorful birthday party setup with balloon arch",
            date: "20/12/2025",
            time: "02:00 PM",
            daysUntil: 14
        }
    ];

    const recommendedServices = [
        {
            id: 201,
            name: "Engagement Ceremony Decor",
            image: "https://images.unsplash.com/photo-1700390774191-18233aee0c38",
            imageAlt:
                "Beautiful engagement ceremony decoration with floral arrangements and elegant seating",
            rating: 4.7,
            price: 28000
        },
        {
            id: 202,
            name: "Housewarming Decoration",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f18d10e1-1765033456932.png",
            imageAlt:
                "Festive housewarming decoration with traditional elements and modern touches",
            rating: 4.6,
            price: 15000
        },
        {
            id: 203,
            name: "Festival Celebration Setup",
            image: "https://images.unsplash.com/photo-1674011385053-8ae879d9b25d",
            imageAlt:
                "Vibrant festival decoration with colorful lights and traditional ornaments",
            rating: 4.8,
            price: 20000
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "active":
                return (
                    <div className="space-y-4">
                        {upcomingBookings?.length === 0 ? (
                            <div className="bg-card border border-border rounded-lg p-12 text-center">
                                <p className="text-muted-foreground">
                                    No active bookings at the moment
                                </p>
                            </div>
                        ) : (
                            upcomingBookings?.map(booking => (
                                <ActiveBookingCard
                                    key={booking?.id || booking?._id}
                                    booking={booking}
                                />
                            ))
                        )}
                    </div>
                );

            case "history":
                return (
                    <div className="space-y-4">
                        {completedBookings?.length === 0 ? (
                            <div className="bg-card border border-border rounded-lg p-12 text-center">
                                <p className="text-muted-foreground">
                                    No booking history available
                                </p>
                            </div>
                        ) : (
                            completedBookings?.map(booking => (
                                <BookingHistoryCard
                                    key={booking?.id || booking?._id}
                                    booking={booking}
                                />
                            ))
                        )}
                    </div>
                );

            case "payments":
                return (
                    <div className="space-y-4">
                        {paymentHistory?.length === 0 ? (
                            <div className="bg-card border border-border rounded-lg p-12 text-center">
                                <p className="text-muted-foreground">
                                    No payment history available
                                </p>
                            </div>
                        ) : (
                            paymentHistory?.map(payment => (
                                <PaymentHistoryCard
                                    key={payment?.id}
                                    payment={payment}
                                />
                            ))
                        )}
                    </div>
                );

            case "profile":
                return <ProfileManagement userProfile={userData} />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <PrimaryNav />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
                <DashboardHeader
                    userName={userData?.fullName}
                    userEmail={userData?.email}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Breadcrumb />

                    <div className="mt-6 space-y-6">
                        <DashboardStats stats={dashboardStats} />

                        <QuickActions />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <TabNavigation
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                />
                                <div className="mt-6">{renderTabContent()}</div>
                            </div>

                            <div className="space-y-6">
                                <UpcomingAppointments
                                    appointments={upcomingAppointments}
                                />
                            </div>
                        </div>

                        <RecommendedServices services={recommendedServices} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
