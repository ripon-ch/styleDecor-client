import React from 'react';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="w-full sm:w-64">
      <Select
        label="Sort By"
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
      />
    </div>
  );
};

export default SortControls;