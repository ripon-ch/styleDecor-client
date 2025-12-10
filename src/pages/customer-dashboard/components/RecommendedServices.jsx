import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedServices = ({ services }) => {
  const navigate = useNavigate();

  const handleViewService = (serviceId) => {
    navigate('/service-details', { state: { serviceId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Recommended for You</h2>
        <Icon name="Sparkles" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services?.map((service) => (
          <div
            key={service?.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 overflow-hidden">
              <Image
                src={service?.image}
                alt={service?.imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-heading font-semibold text-foreground mb-2 line-clamp-1">
                {service?.name}
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-warning" />
                  <span className="text-sm text-muted-foreground">{service?.rating}</span>
                </div>
                <span className="text-sm font-medium text-primary">
                  ৳{service?.price?.toLocaleString('en-BD')}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleViewService(service?.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedServices;