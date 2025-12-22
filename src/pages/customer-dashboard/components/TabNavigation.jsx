import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'active', label: 'Active Bookings', icon: 'Calendar' },
    { id: 'history', label: 'Booking History', icon: 'History' },
    { id: 'payments', label: 'Payment History', icon: 'CreditCard' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;