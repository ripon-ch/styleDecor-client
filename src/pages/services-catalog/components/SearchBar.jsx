import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const searchRef = useRef(null);

  const suggestions = [
    "Wedding decoration packages",
    "Birthday party decoration",
    "Corporate event decoration",
    "Home interior decoration",
    "Festival decoration services",
    "Anniversary decoration",
    "Engagement ceremony decoration",
    "Baby shower decoration"
  ];

  const filteredSuggestions = suggestions?.filter(suggestion =>
    suggestion?.toLowerCase()?.includes(localQuery?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    setShowSuggestions(value?.length > 0);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
        </div>
        <Input
          type="search"
          placeholder="Search for decoration services..."
          value={localQuery}
          onChange={handleInputChange}
          onFocus={() => localQuery && setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} color="var(--color-muted-foreground)" />
          </button>
        )}
      </div>
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 border-b border-border last:border-b-0"
            >
              <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;