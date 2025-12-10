import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BookingSummaryCard = ({ bookingData }) => {
  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground">Booking Summary</h2>
        <span className="text-sm text-muted-foreground">Ref: {bookingData?.referenceNumber}</span>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={bookingData?.serviceImage}
              alt={bookingData?.serviceImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">{bookingData?.serviceName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{bookingData?.serviceCategory}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{bookingData?.location}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={bookingData?.decoratorAvatar}
                alt={bookingData?.decoratorAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{bookingData?.decoratorName}</p>
              <p className="text-xs text-muted-foreground">{bookingData?.decoratorExperience}</p>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="Star" size={14} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">{bookingData?.decoratorRating} ({bookingData?.decoratorReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Service Date</p>
              <p className="text-sm text-muted-foreground">{bookingData?.serviceDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Service Time</p>
              <p className="text-sm text-muted-foreground">{bookingData?.serviceTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Home" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Service Mode</p>
              <p className="text-sm text-muted-foreground">{bookingData?.serviceMode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;