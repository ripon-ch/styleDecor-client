import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistoryCard = ({ payment }) => {
  const getPaymentMethodIcon = (method) => {
    const icons = {
      'Stripe': 'CreditCard',
      'Cash': 'Banknote',
      'Bank Transfer': 'Building'
    };
    return icons?.[method] || 'Wallet';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-success/10 text-success',
      'Pending': 'bg-warning/10 text-warning',
      'Failed': 'bg-error/10 text-error',
      'Refunded': 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt for transaction:', payment?.transactionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={getPaymentMethodIcon(payment?.paymentMethod)} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold text-foreground">
              {payment?.serviceName}
            </h3>
            <p className="text-sm text-muted-foreground">{payment?.transactionId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
          {payment?.status}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Amount</p>
          <p className="text-lg font-heading font-bold text-foreground">
            ৳{payment?.amount?.toLocaleString('en-BD')}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
          <p className="text-sm font-medium text-foreground">{payment?.paymentMethod}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Date</p>
          <p className="text-sm font-medium text-foreground">{payment?.date}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Time</p>
          <p className="text-sm font-medium text-foreground">{payment?.time}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={16} />
          <span>{payment?.location}</span>
        </div>
        <Button variant="outline" size="sm" iconName="Download" onClick={handleDownloadReceipt}>
          Receipt
        </Button>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;