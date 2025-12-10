import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      icon: 'Calendar',
      label: 'Active Bookings',
      value: stats?.activeBookings,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'CheckCircle',
      label: 'Completed Services',
      value: stats?.completedServices,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Wallet',
      label: 'Total Spent',
      value: `৳${stats?.totalSpent?.toLocaleString('en-BD')}`,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Star',
      label: 'Favorite Decorators',
      value: stats?.favoriteDecorators,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
              <p className="text-2xl font-heading font-bold text-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;