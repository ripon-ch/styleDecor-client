import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'PCI Compliant',
      description: 'Industry-standard security protocols'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Payment',
      description: 'Secure transaction processing'
    }
  ];

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Secure Payment</h3>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={18} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">Visa</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">Mastercard</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Smartphone" size={20} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">bKash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;