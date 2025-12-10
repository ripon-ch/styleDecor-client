import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  
  const primaryImage = service?.images?.find(img => img?.isPrimary) || service?.images?.[0];
  const imageUrl = primaryImage?.imageUrl || 'https://images.unsplash.com/photo-1464207687429-7505649dae38';
  const altText = primaryImage?.altText || 'Service image';

  const handleViewDetails = () => {
    navigate(`/service-details/${service?.id}`);
  };

  const handleBookNow = () => {
    navigate(`/service-details/${service?.id}?booking=true`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {service?.serviceCategory}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {service?.serviceName}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service?.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ৳{service?.cost?.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              / {service?.unit}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={handleBookNow}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}