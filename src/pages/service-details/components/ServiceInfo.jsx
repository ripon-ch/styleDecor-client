import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Image from '../../../components/AppImage.jsx';

const ServiceInfo = ({ service }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
            {service?.name}
          </h1>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-lg">
            <Icon name="Star" size={18} color="var(--color-accent)" fill="var(--color-accent)" />
            <span className="font-semibold text-foreground">{service?.rating}</span>
            <span className="text-muted-foreground text-sm">({service?.reviewCount})</span>
          </div>
        </div>
        <p className="text-muted-foreground">{service?.category}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={18} color="var(--color-primary)" />
          <span className="text-foreground">{service?.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={18} color="var(--color-primary)" />
          <span className="text-foreground">{service?.coverage}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Users" size={18} color="var(--color-primary)" />
          <span className="text-foreground">{service?.bookings} bookings</span>
        </div>
      </div>
      <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl lg:text-4xl font-bold text-primary">৳{service?.price?.toLocaleString('en-IN')}</span>
          <span className="text-muted-foreground">starting from</span>
        </div>
        <p className="text-sm text-muted-foreground">{service?.priceNote}</p>
      </div>
      <div>
        <h2 className="text-xl font-heading font-semibold text-foreground mb-3">About This Service</h2>
        <p className="text-foreground leading-relaxed whitespace-pre-line">{service?.description}</p>
      </div>
      <div>
        <h2 className="text-xl font-heading font-semibold text-foreground mb-3">What's Included</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {service?.included?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} color="var(--color-success)" />
              </div>
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 bg-card rounded-lg border border-border">
        <div className="flex items-start gap-4">
          <Image
            src={service?.decorator?.image}
            alt={service?.decorator?.imageAlt}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{service?.decorator?.name}</h3>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded text-xs font-medium text-primary">
                <Icon name="BadgeCheck" size={14} />
                <span>Verified</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{service?.decorator?.experience}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} color="var(--color-accent)" fill="var(--color-accent)" />
                <span className="font-medium text-foreground">{service?.decorator?.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Briefcase" size={14} color="var(--color-primary)" />
                <span className="text-foreground">{service?.decorator?.projects} projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;