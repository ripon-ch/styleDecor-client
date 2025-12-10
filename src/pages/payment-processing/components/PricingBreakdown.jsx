import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingBreakdown = ({ pricing }) => {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground pb-3 border-b border-border">Price Breakdown</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Service Charge</span>
          <span className="text-sm font-medium text-foreground">৳{pricing?.serviceCharge?.toLocaleString('en-IN')}</span>
        </div>

        {pricing?.additionalCharges?.map((charge, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{charge?.label}</span>
            <span className="text-sm font-medium text-foreground">৳{charge?.amount?.toLocaleString('en-IN')}</span>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">VAT (15%)</span>
          <span className="text-sm font-medium text-foreground">৳{pricing?.vat?.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Service Fee</span>
          <span className="text-sm font-medium text-foreground">৳{pricing?.serviceFee?.toLocaleString('en-IN')}</span>
        </div>

        {pricing?.discount > 0 && (
          <div className="flex items-center justify-between text-success">
            <span className="text-sm flex items-center gap-1">
              <Icon name="Tag" size={14} />
              Discount Applied
            </span>
            <span className="text-sm font-medium">-৳{pricing?.discount?.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-base font-heading font-semibold text-foreground">Total Amount</span>
          <span className="text-2xl font-heading font-bold text-primary">৳{pricing?.total?.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">All prices in Bangladeshi Taka (BDT)</p>
      </div>
    </div>
  );
};

export default PricingBreakdown;