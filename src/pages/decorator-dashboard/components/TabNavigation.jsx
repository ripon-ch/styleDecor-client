import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'bookings', label: 'Active Bookings', icon: 'Calendar' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'earnings', label: 'Earnings', icon: 'TrendingUp' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  return (
    <div className="border-b border-border">
      <div className="flex flex-wrap gap-2 px-4 md:px-6 pt-4">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
              activeTab === tab?.id
                ? 'bg-background border-t border-l border-r border-border text-primary font-semibold' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span className="text-sm md:text-base">{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;