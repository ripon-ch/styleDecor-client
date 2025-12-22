import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const PolicyInformation = () => {
  const policies = [
    {
      icon: 'RotateCcw',
      title: 'Cancellation Policy',
      description: 'Free cancellation up to 48 hours before service date. 50% refund for cancellations within 24-48 hours. No refund for cancellations within 24 hours of service.'
    },
    {
      icon: 'Wallet',
      title: 'Refund Policy',
      description: 'Refunds are processed within 5-7 business days to the original payment method. Service quality issues are reviewed on a case-by-case basis.'
    },
    {
      icon: 'FileText',
      title: 'Terms & Conditions',
      description: 'By completing this payment, you agree to our service terms and conditions. Full payment is required to confirm your booking.'
    }
  ];

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground pb-3 border-b border-border">Important Information</h3>
      <div className="space-y-4">
        {policies?.map((policy, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name={policy?.icon} size={18} color="var(--color-primary)" />
              <h4 className="text-sm font-heading font-semibold text-foreground">{policy?.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-7">{policy?.description}</p>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
          <Icon name="HelpCircle" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground">Contact our support team at support@styledecor.com or call +880 1234-567890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyInformation;