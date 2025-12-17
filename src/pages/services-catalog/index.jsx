import React, { useState, useEffect, useMemo } from 'react';

import PrimaryNav from '../../components/navigation/PrimaryNav';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import Footer from '../home-landing/components/Footer';

import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import EmptyState from './components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

import { serviceAPI as serviceService } from '../../services/api/serviceAPI';

export default function ServicesCatalog() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minCost: '',
    maxCost: '',
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
      setServices(data);
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadServices}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredAndSortedServices = useMemo(() => {
    let result = [...services];

    if (filters?.search) {
      result = result?.filter((service) =>
        service?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        service?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        service?.decoratorName?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.category !== '') {
      result = result?.filter((service) => service?.category === filters?.category);
    }

    if (filters?.minCost) {
      result = result?.filter((service) => service?.price >= parseInt(filters?.minCost));
    }

    if (filters?.maxCost) {
      result = result?.filter((service) => service?.price <= parseInt(filters?.maxCost));
    }

    switch (sortBy) {
      case 'price-low':
        result?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        result?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        result?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popularity':
      default:
        result?.sort((a, b) => b?.bookings - a?.bookings);
        break;
    }

    return result;
  }, [filters, services, sortBy]);

  const handleClearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minCost: '',
      maxCost: '',
    });
    setSearchQuery('');
    setSortBy('popularity');
  };

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
            Discover professional decoration services across Bangladesh for all your special occasions
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            searchQuery={searchQuery} />

        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultsCount={filteredAndSortedServices?.length}
                isOpen={false}
                onClose={() => {}} />

            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden">

                  Filters
                </Button>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedServices?.length} of {services?.length} services
                </p>
              </div>

              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy} />

            </div>

            {filteredAndSortedServices?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedServices?.map((service) =>
              <ServiceCard key={service?.id} service={service} />
              )}
            </div> :

            <EmptyState onClearFilters={handleClearFilters} />
            }
          </main>
        </div>
      </div>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        resultsCount={filteredAndSortedServices?.length}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)} />

      <div className="floating-action">
        <Button
          variant="default"
          size="icon"
          iconName="MessageCircle"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full shadow-lg"
          aria-label="Scroll to top" />

      </div>
      <Footer />
    </div>
  );
}