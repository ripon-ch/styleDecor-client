import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PrimaryNav from '@/components/navigation/PrimaryNav.jsx';
import Breadcrumb from '@/components/navigation/Breadcrumb.jsx';
import BookingSummaryCard from './components/BookingSummaryCard.jsx';
import PricingBreakdown from './components/PricingBreakdown.jsx';
import StripePaymentForm from './components/StripePaymentForm.jsx';
import SecurityIndicators from './components/SecurityIndicators.jsx';
import PolicyInformation from './components/PolicyInformation.jsx';
import PaymentSuccessModal from './components/PaymentSuccessModal.jsx';

const PaymentProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mockBookingData = {
    referenceNumber: "SD-2025-001234",
    serviceName: "Wedding Ceremony Decoration",
    serviceCategory: "Wedding & Events",
    serviceImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd362823-1764776470368.png",
    serviceImageAlt: "Elegant wedding ceremony decoration with white drapes, floral arrangements, and ambient lighting in grand ballroom setting",
    location: "Gulshan, Dhaka",
    decoratorName: "Fatima Rahman",
    decoratorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1228adf75-1763298678714.png",
    decoratorAvatarAlt: "Professional headshot of Bangladeshi woman decorator with warm smile wearing traditional attire and floral accessories",
    decoratorExperience: "12 years experience",
    decoratorRating: "4.9",
    decoratorReviews: "156",
    serviceDate: "15/12/2025",
    serviceTime: "10:00 AM - 6:00 PM",
    serviceMode: "On-site Decoration"
  };

  const mockPricing = {
    serviceCharge: 45000,
    additionalCharges: [
    { label: "Premium Floral Package", amount: 15000 },
    { label: "Lighting Setup", amount: 8000 }],

    vat: 10200,
    serviceFee: 2000,
    discount: 5000,
    total: 75200
  };

  const mockSuccessDetails = {
    referenceNumber: "SD-2025-001234",
    amount: 75200,
    paymentMethod: "Visa •••• 4242",
    transactionId: "TXN-2025-567890",
    email: "customer@example.com"
  };

  const handlePaymentSubmit = (formData) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2500);
  };

  return (
    <>
      <Helmet>
        <title>Payment Processing - StyleDecor</title>
        <meta name="description" content="Complete your decoration service booking payment securely through our encrypted payment gateway" />
      </Helmet>

      <PrimaryNav />
      
      <div className="main-content bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />

          <div className="mt-6 mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">Secure checkout for your decoration service booking</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <StripePaymentForm
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing} />


              <PolicyInformation />
            </div>

            <div className="space-y-6">
              <BookingSummaryCard bookingData={mockBookingData} />
              
              <PricingBreakdown pricing={mockPricing} />
              
              <SecurityIndicators />
            </div>
          </div>
        </div>
      </div>

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        bookingDetails={mockSuccessDetails}
        onClose={() => setShowSuccessModal(false)} />

    </>);

};

export default PaymentProcessing;