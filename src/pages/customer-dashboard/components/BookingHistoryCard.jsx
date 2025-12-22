import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';
import Button from '../../../components/ui/Button.jsx';

const BookingHistoryCard = ({ booking }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(booking?.userRating || 0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(!!booking?.userRating);

  const handleRatingClick = (value) => {
    if (!isRatingSubmitted) {
      setRating(value);
    }
  };

  const handleSubmitRating = () => {
    setIsRatingSubmitted(true);
  };

  const handleRebook = () => {
    navigate('/service-details', { state: { serviceId: booking?.serviceId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={booking?.serviceImage}
            alt={booking?.serviceImageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                {booking?.serviceName}
              </h3>
              <p className="text-sm text-muted-foreground">{booking?.serviceType}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
              Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="User" size={16} />
              <span>{booking?.decoratorName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{booking?.completedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{booking?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground font-medium">
              <Icon name="Wallet" size={16} />
              <span>৳{booking?.amount?.toLocaleString('en-BD')}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Rate this service</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      disabled={isRatingSubmitted}
                      className={`transition-colors ${isRatingSubmitted ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
                    >
                      <Icon
                        name="Star"
                        size={20}
                        className={star <= rating ? 'text-warning fill-warning' : 'text-muted-foreground'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isRatingSubmitted && rating > 0 && (
                  <Button variant="outline" size="sm" onClick={handleSubmitRating}>
                    Submit Rating
                  </Button>
                )}
                <Button variant="default" size="sm" iconName="RefreshCw" onClick={handleRebook}>
                  Rebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;