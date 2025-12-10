import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';

const ActiveBookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending Confirmation':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <AppImage 
              src={booking?.customerImage}
              alt={booking?.customerImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{booking?.customerName}</h3>
                <p className="text-sm text-muted-foreground">{booking?.customerPhone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
                {booking?.status}
              </span>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Briefcase" size={16} color="var(--color-muted-foreground)" />
                <span className="text-foreground font-medium">{booking?.serviceName}</span>
                <span className="text-muted-foreground">• {booking?.serviceType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                <span className="text-foreground">{booking?.scheduledDate} at {booking?.scheduledTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                <span className="text-foreground">{booking?.location}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Requirements:</p>
              <p className="text-sm text-foreground">{booking?.requirements}</p>
            </div>
          </div>
        </div>

        <div className="lg:w-64 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-xl font-bold text-primary">৳{booking?.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Advance Paid</span>
              <span className="text-success font-semibold">৳{booking?.advancePaid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1 pt-2 border-t border-border">
              <span className="text-muted-foreground">Balance Due</span>
              <span className="text-foreground font-semibold">৳{(booking?.amount - booking?.advancePaid)?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium">
              <Icon name="Phone" size={16} color="white" />
              Contact Customer
            </button>
            <button className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 font-medium">
              <Icon name="Calendar" size={16} />
              Reschedule
            </button>
            <button className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 font-medium">
              <Icon name="FileText" size={16} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveBookingCard;