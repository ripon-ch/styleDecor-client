import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardHeader = ({ userName, userEmail }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Welcome back, {userName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Icon name="Plus" size={18} />
              <span className="hidden sm:inline">New Booking</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors">
              <Icon name="Bell" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;