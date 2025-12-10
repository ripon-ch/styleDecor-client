import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon name="SearchX" size={48} color="var(--color-muted-foreground)" />
      </div>
      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
        No Services Found
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        We couldn't find any decoration services matching your criteria. Try adjusting your filters or search terms.
      </p>
      <Button
        variant="outline"
        iconName="RotateCcw"
        iconPosition="left"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default EmptyState;