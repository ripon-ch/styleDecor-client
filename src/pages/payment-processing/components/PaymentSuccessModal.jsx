import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const PaymentSuccessModal = ({ isOpen, bookingDetails, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewBooking = () => {
    navigate('/customer-dashboard');
  };

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt...');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-lg shadow-lg max-w-md w-full p-6 space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-sm text-muted-foreground">Your booking has been confirmed</p>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking Reference</span>
            <span className="text-sm font-medium text-foreground">{bookingDetails?.referenceNumber}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount Paid</span>
            <span className="text-sm font-medium text-foreground">৳{bookingDetails?.amount?.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment Method</span>
            <span className="text-sm font-medium text-foreground">{bookingDetails?.paymentMethod}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Transaction ID</span>
            <span className="text-sm font-medium text-foreground">{bookingDetails?.transactionId}</span>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-start gap-2">
            <Icon name="Mail" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to {bookingDetails?.email} with your booking details and receipt.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="LayoutDashboard"
            iconPosition="left"
            onClick={handleViewBooking}
          >
            View My Bookings
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={handleDownloadReceipt}
          >
            Download Receipt
          </Button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;