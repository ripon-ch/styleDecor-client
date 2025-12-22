import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const ActiveBookingCard = ({ booking }) => {
  const navigate = useNavigate();

  // Fix: Handle different casing (e.g., 'confirmed' vs 'Confirmed')
  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s === 'confirmed') return 'bg-success/10 text-success';
    if (s === 'pending') return 'bg-warning/10 text-warning';
    if (s === 'in progress' || s === 'in_progress') return 'bg-primary/10 text-primary';
    if (s === 'cancelled') return 'bg-error/10 text-error';
    return 'bg-muted text-muted-foreground';
  };

  const handleViewDetails = () => {
    navigate('/service-details', { state: { bookingId: booking?.id } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <Image
            src={booking?.serviceImage}
            alt={booking?.serviceImageAlt || 'Service Image'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                {booking?.serviceName || 'Untitled Service'}
              </h3>
              <p className="text-sm text-muted-foreground">{booking?.serviceType || 'Standard Service'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
              {booking?.status || 'Unknown'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={booking?.decoratorImage}
                  alt={booking?.decoratorImageAlt || 'Decorator'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{booking?.decoratorName || 'Assigning...'}</p>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-warning" />
                  <span className="text-xs text-muted-foreground">{booking?.decoratorRating || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{booking?.scheduledDate || 'TBD'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>{booking?.scheduledTime || 'TBD'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span className="truncate">{booking?.location || 'Location not set'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-heading font-bold text-foreground">
                ৳{(booking?.amount || 0).toLocaleString('en-BD')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleViewDetails}>
                View Details
              </Button>
              
              {/* Fix: Check status case-insensitively */}
              {booking?.status?.toLowerCase() === 'confirmed' && (
                <Button variant="destructive" size="sm" iconName="X">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBookingCard;