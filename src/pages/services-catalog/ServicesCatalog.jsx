import React, { useState, useEffect, useMemo } from 'react';
import PrimaryNav from '@/components/navigation/PrimaryNav.jsx';
import Breadcrumb from '@/components/navigation/Breadcrumb.jsx';
import Footer from '../home-landing/components/Footer.jsx';
import Button from '@/components/ui/Button.jsx';
import ServiceCard from './components/ServiceCard.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import SearchBar from './components/SearchBar.jsx';
import SortControls from './components/SortControls.jsx';
import EmptyState from './components/EmptyState.jsx';
import LoadingSpinner from '@/components/LoadingSpinner.jsx';
import { serviceService } from '../../services/serviceService.js';

export default function ServicesCatalog() {
  const [services, setServices] = useState([{ id: 1, title: "Grand Wedding Decor", description: "Premium floral and lighting setup", category: "Wedding", price: 5000, decoratorName: "Elite Events", rating: 5.0, bookings: 10 }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    priceRange: { min: '', max: '' },
    serviceType: 'all',
    serviceMode: 'all',
    district: 'all',
    rating: 'all',
    availableDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    loadServices();
  }, [filters]);

  const loadServices = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await serviceService?.getAll(filters);
      setServices(data || []);
    } catch (err) {
      setError(err?.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      search: '',
      priceRange: { min: '', max: '' },
      serviceType: 'all',
      serviceMode: 'all',
      district: 'all',
      rating: 'all',
      availableDate: ''
    });
    setSearchQuery('');
    setSortBy('popularity');
  };

  // ✅ Hooks are now defined BEFORE any return statements
  const filteredAndSortedServices = useMemo(() => {
    let result = services.length > 0 ? [...services] : [{ id: 99, serviceName: "Grand Wedding Decor", description: "Premium floral and lighting setup", serviceCategory: "Wedding", cost: 5000, unit: "event", images: [] }];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(s => 
        s?.serviceName?.toLowerCase().includes(searchLower) ||
        s?.description?.toLowerCase().includes(searchLower) ||
        s?.decoratorName?.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.category && filters.category !== '') {
      result = result.filter((service) => service?.serviceCategory === filters.category);
    }

    if (filters?.priceRange?.min) {
      result = result.filter((service) => service?.cost >= parseInt(filters.priceRange.min));
    }
    if (filters?.priceRange?.max) {
      result = result.filter((service) => service?.cost <= parseInt(filters.priceRange.max));
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.cost - b.cost); break;
      case 'price-high': result.sort((a, b) => b.cost - a.cost); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.bookings || 0) - (a.bookings || 0));
    }

    return result;
  }, [filters, services, sortBy]);

  // ✅ Conditional returns for UI states go here
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadServices}>Retry</Button>
        </div>
      </div>
    );
  }

  // ✅ Final render
  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Breadcrumb />
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
            Decoration Services Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover professional decoration services
          </p>
        </div>
        <div className="mb-6">
          <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={handleClearFilters} 
              resultsCount={filteredAndSortedServices.length} 
            />
          </aside>
          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedServices.length} services
              </p>
              <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            </div>
            {filteredAndSortedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}