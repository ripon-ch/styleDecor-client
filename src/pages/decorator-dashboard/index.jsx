import React, { useState } from 'react';
import PrimaryNav from '../../components/navigation/PrimaryNav';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import DashboardHeader from './components/DashboardHeader';
import PerformanceStats from './components/PerformanceStats';
import TabNavigation from './components/TabNavigation';
import ActiveBookingCard from './components/ActiveBookingCard';
import PortfolioManagement from './components/PortfolioManagement';
import EarningsAnalytics from './components/EarningsAnalytics';
import ProfileSettings from './components/ProfileSettings';
import CustomerReviews from './components/CustomerReviews';
import QuickActions from './components/QuickActions';
import Footer from '../home-landing/components/Footer';

const DecoratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const decoratorData = {
    businessName: "Elegant Events by Fatima",
    ownerName: "Fatima Begum",
    email: "decorator@styledecor.com",
    phone: "+880 1712-987654",
    district: "dhaka",
    thana: "dhanmondi",
    address: "Shop 23, Block C, Dhanmondi",
    experience: "8 years",
    specialization: "Wedding & Corporate Events",
    emailNotifications: true,
    smsNotifications: true,
    availabilityStatus: "Available"
  };

  const performanceStats = {
    activeBookings: 8,
    completedJobs: 156,
    totalEarnings: 2450000,
    averageRating: 4.8,
    monthlyGrowth: 12.5,
    responseTime: "2 hours"
  };

  const activeBookings = [
  {
    id: 1,
    customerName: "Rahul Ahmed",
    customerPhone: "+880 1712-345678",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_128c51f58-1763295214604.png",
    customerImageAlt: "Professional young male customer with confident smile",
    serviceName: "Wedding Stage Decoration",
    serviceType: "Wedding Ceremony",
    scheduledDate: "15/12/2025",
    scheduledTime: "10:00 AM",
    location: "Dhanmondi, Dhaka",
    amount: 45000,
    advancePaid: 15000,
    status: "Confirmed",
    requirements: "Gold and white theme, floral arrangements, 300 guests capacity"
  },
  {
    id: 2,
    customerName: "Ayesha Sultana",
    customerPhone: "+880 1712-456789",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10fc1941c-1763296037966.png",
    customerImageAlt: "Professional young female customer with warm smile",
    serviceName: "Corporate Event Setup",
    serviceType: "Corporate Event",
    scheduledDate: "18/12/2025",
    scheduledTime: "09:00 AM",
    location: "Banani, Dhaka",
    amount: 35000,
    advancePaid: 10000,
    status: "Pending Confirmation",
    requirements: "Professional backdrop, stage lighting, branded materials"
  },
  {
    id: 3,
    customerName: "Imran Khan",
    customerPhone: "+880 1712-567890",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11c7650d6-1764746226516.png",
    customerImageAlt: "Professional male customer in business attire",
    serviceName: "Birthday Party Decoration",
    serviceType: "Birthday Celebration",
    scheduledDate: "20/12/2025",
    scheduledTime: "02:00 PM",
    location: "Gulshan, Dhaka",
    amount: 15000,
    advancePaid: 5000,
    status: "In Progress",
    requirements: "Superhero theme, balloon arrangements, kids-friendly setup"
  }];


  const portfolioItems = [
  {
    id: 1,
    title: "Royal Wedding Setup",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1656793074013-50b0e499cd2b",
    imageAlt: "Luxurious wedding stage with golden decorations and floral arrangements",
    price: 50000,
    views: 234,
    likes: 89,
    bookings: 12
  },
  {
    id: 2,
    title: "Corporate Conference Hall",
    category: "Corporate",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c75419f2-1764666356653.png",
    imageAlt: "Professional corporate event hall with modern stage setup",
    price: 40000,
    views: 156,
    likes: 67,
    bookings: 8
  },
  {
    id: 3,
    title: "Birthday Wonderland",
    category: "Birthday",
    image: "https://images.unsplash.com/photo-1712156302170-b3b1fa8d4b48",
    imageAlt: "Colorful birthday party setup with themed decorations",
    price: 18000,
    views: 189,
    likes: 78,
    bookings: 15
  }];


  const earningsData = {
    monthlyRevenue: [
    { month: 'Jan', revenue: 185000, bookings: 12 },
    { month: 'Feb', revenue: 195000, bookings: 14 },
    { month: 'Mar', revenue: 210000, bookings: 16 },
    { month: 'Apr', revenue: 198000, bookings: 13 },
    { month: 'May', revenue: 225000, bookings: 18 },
    { month: 'Jun', revenue: 240000, bookings: 20 },
    { month: 'Jul', revenue: 235000, bookings: 19 },
    { month: 'Aug', revenue: 250000, bookings: 21 },
    { month: 'Sep', revenue: 268000, bookings: 23 },
    { month: 'Oct', revenue: 280000, bookings: 24 },
    { month: 'Nov', revenue: 295000, bookings: 26 },
    { month: 'Dec', revenue: 310000, bookings: 28 }],

    serviceBreakdown: [
    { name: 'Wedding', value: 45, revenue: 1350000 },
    { name: 'Corporate', value: 30, revenue: 900000 },
    { name: 'Birthday', value: 15, revenue: 450000 },
    { name: 'Others', value: 10, revenue: 300000 }],

    recentTransactions: [
    {
      id: 1,
      customerName: "Rahul Ahmed",
      service: "Wedding Decoration",
      amount: 45000,
      date: "01/12/2025",
      status: "Received"
    },
    {
      id: 2,
      customerName: "Sadia Rahman",
      service: "Anniversary Setup",
      amount: 18000,
      date: "28/11/2025",
      status: "Received"
    },
    {
      id: 3,
      customerName: "Imran Khan",
      service: "Corporate Event",
      amount: 35000,
      date: "25/11/2025",
      status: "Pending"
    }]

  };

  const customerReviews = [
  {
    id: 1,
    customerName: "Rahul Ahmed",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_116719521-1764725373704.png",
    customerImageAlt: "Happy customer with satisfied expression",
    rating: 5,
    review: "Absolutely stunning work! The wedding decoration exceeded our expectations. Highly professional and creative team.",
    service: "Wedding Stage Decoration",
    date: "03/12/2025",
    response: "Thank you so much for your kind words! It was a pleasure working on your special day."
  },
  {
    id: 2,
    customerName: "Ayesha Sultana",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14690b699-1765017547120.png",
    customerImageAlt: "Satisfied female customer smiling",
    rating: 4,
    review: "Great service and beautiful decoration. The team was punctual and accommodating to our requests.",
    service: "Baby Shower Decoration",
    date: "01/12/2025",
    response: ""
  },
  {
    id: 3,
    customerName: "Karim Hassan",
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1965c6713-1763299935220.png",
    customerImageAlt: "Professional customer in business attire",
    rating: 5,
    review: "Perfect for our corporate event. Very professional setup and excellent attention to detail.",
    service: "Corporate Event Setup",
    date: "28/11/2025",
    response: "We appreciate your feedback! Looking forward to serving you again."
  }];


  const renderTabContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="space-y-4">
            {activeBookings?.length === 0 ?
            <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground">No active bookings at the moment</p>
              </div> :

            activeBookings?.map((booking) =>
            <ActiveBookingCard key={booking?.id} booking={booking} />
            )
            }
          </div>);

      case 'portfolio':
        return <PortfolioManagement portfolioItems={portfolioItems} />;
      case 'earnings':
        return <EarningsAnalytics earningsData={earningsData} />;
      case 'profile':
        return <ProfileSettings decoratorProfile={decoratorData} />;
      case 'reviews':
        return <CustomerReviews reviews={customerReviews} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <DashboardHeader
          businessName={decoratorData?.businessName}
          ownerName={decoratorData?.ownerName}
          availabilityStatus={decoratorData?.availabilityStatus} />

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          <div className="mt-6 space-y-6">
            <PerformanceStats stats={performanceStats} />
            
            <QuickActions />
            
            <div className="bg-card border border-border rounded-lg shadow-base">
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default DecoratorDashboard;