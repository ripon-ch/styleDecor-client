import React, { useState } from 'react';
import Image from '../../../components/AppImage.jsx';
import Icon from '../../../components/AppIcon.jsx';

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-card rounded-lg overflow-hidden border border-border shadow-base">
        <div className="relative aspect-[4/3] lg:aspect-[16/9]">
          <Image
            src={images?.[selectedImageIndex]?.url}
            alt={images?.[selectedImageIndex]?.alt}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={toggleZoom}
          />
          
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium">
            {selectedImageIndex + 1} / {images?.length}
          </div>

          <button
            onClick={toggleZoom}
            className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            <Icon name={isZoomed ? 'ZoomOut' : 'ZoomIn'} size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-3">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImageIndex === index
                ? 'border-primary shadow-base'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Image
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;