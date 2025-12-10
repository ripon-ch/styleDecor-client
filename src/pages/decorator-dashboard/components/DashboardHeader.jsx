import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardHeader = ({ businessName, ownerName, availabilityStatus }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Icon name="Store" size={32} color="white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{businessName}</h1>
              <p className="text-white/90 text-sm md:text-base">Welcome back, {ownerName}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${availabilityStatus === 'Available' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm text-white/80">{availabilityStatus}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
              <Icon name="Bell" size={18} color="white" />
              <span className="text-sm font-medium">Notifications</span>
              <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs">3</span>
            </button>
            <button className="px-4 py-2 bg-white text-primary hover:bg-white/90 rounded-lg transition-colors flex items-center gap-2 font-medium">
              <Icon name="Calendar" size={18} />
              <span className="text-sm">View Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;