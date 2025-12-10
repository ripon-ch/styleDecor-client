import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultsCount,
  isOpen,
  onClose 
}) => {
  const serviceTypeOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'wedding', label: 'Wedding Decoration' },
    { value: 'birthday', label: 'Birthday Decoration' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'home', label: 'Home Decoration' },
    { value: 'festival', label: 'Festival Decoration' },
    { value: 'anniversary', label: 'Anniversary Decoration' }
  ];

  const serviceModeOptions = [
    { value: 'all', label: 'All Modes' },
    { value: 'in-studio', label: 'In-Studio Consultation' },
    { value: 'on-site', label: 'On-Site Decoration' },
    { value: 'both', label: 'Both Available' }
  ];

  const districtOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'barisal', label: 'Barisal' },
    { value: 'rangpur', label: 'Rangpur' },
    { value: 'mymensingh', label: 'Mymensingh' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3.0', label: '3.0+ Stars' }
  ];

  const handlePriceChange = (field, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters?.priceRange,
        [field]: value
      }
    });
  };

  const panelContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
          <p className="text-sm text-muted-foreground">{resultsCount} services found</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
          className="lg:hidden"
        />
      </div>

      <div>
        <Select
          label="Service Type"
          options={serviceTypeOptions}
          value={filters?.serviceType}
          onChange={(value) => onFilterChange({ ...filters, serviceType: value })}
        />
      </div>

      <div>
        <Select
          label="Service Mode"
          options={serviceModeOptions}
          value={filters?.serviceMode}
          onChange={(value) => onFilterChange({ ...filters, serviceMode: value })}
        />
      </div>

      <div>
        <Select
          label="District"
          options={districtOptions}
          value={filters?.district}
          onChange={(value) => onFilterChange({ ...filters, district: value })}
          searchable
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Price Range (BDT)
        </label>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters?.priceRange?.min}
            onChange={(e) => handlePriceChange('min', e?.target?.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filters?.priceRange?.max}
            onChange={(e) => handlePriceChange('max', e?.target?.value)}
          />
        </div>
      </div>

      <div>
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange({ ...filters, rating: value })}
        />
      </div>

      <div>
        <Input
          type="date"
          label="Available From"
          value={filters?.availableDate}
          onChange={(e) => onFilterChange({ ...filters, availableDate: e?.target?.value })}
        />
      </div>

      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1000] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div className={`
        fixed lg:static top-0 right-0 bottom-0 z-[1001] lg:z-auto
        w-80 lg:w-full bg-card lg:bg-transparent
        border-l lg:border-l-0 lg:border-0 border-border
        shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto p-4 lg:p-0">
          {panelContent}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;