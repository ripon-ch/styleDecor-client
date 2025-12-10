import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import PrimaryNav from '../../components/navigation/PrimaryNav';
import Footer from '../home-landing/components/Footer';
import LoadingSpinner, { DotsLoader } from '../../components/LoadingSpinner';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CoverageMap = () => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [animateCharts, setAnimateCharts] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Simulate initial data loading
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setAnimateCharts(true);
    };
    loadData();
  }, []);

  // Mock data for divisions with enhanced statistics and thana information
  const divisions = [
    {
      id: 1,
      name: "Dhaka Division",
      districts: [
        { 
          name: "Dhaka", 
          thanas: ["Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Mohammadpur", "Banani", "Motijheel"]
        },
        { 
          name: "Gazipur", 
          thanas: ["Gazipur Sadar", "Tongi", "Kapasia", "Kaliakair", "Sreepur"]
        },
        { 
          name: "Narayanganj", 
          thanas: ["Narayanganj Sadar", "Rupganj", "Araihazar", "Sonargaon", "Bandar"]
        },
        { 
          name: "Tangail", 
          thanas: ["Tangail Sadar", "Basail", "Kalihati", "Madhupur", "Gopalpur"]
        }
      ],
      decorators: 28,
      activeBookings: 156,
      avgRating: 4.7,
      recentBookings: 42,
      revenue: 245000,
      growth: 24,
      lat: 23.8103,
      lng: 90.4125,
      color: '#10b981'
    },
    {
      id: 2,
      name: "Chittagong Division",
      districts: [
        { 
          name: "Chittagong", 
          thanas: ["Panchlaish", "Khulshi", "Halishahar", "Agrabad", "Double Mooring", "Chandgaon"]
        },
        { 
          name: "Cox\'s Bazar", 
          thanas: ["Cox\'s Bazar Sadar", "Chakaria", "Teknaf", "Ramu", "Ukhia"]
        },
        { 
          name: "Comilla", 
          thanas: ["Comilla Sadar", "Debidwar", "Chandina", "Laksam", "Muradnagar"]
        }
      ],
      decorators: 18,
      activeBookings: 98,
      avgRating: 4.5,
      recentBookings: 28,
      revenue: 156000,
      growth: 18,
      lat: 22.3569,
      lng: 91.7832,
      color: '#3b82f6'
    },
    {
      id: 3,
      name: "Rajshahi Division",
      districts: [
        { 
          name: "Rajshahi", 
          thanas: ["Boalia", "Rajpara", "Shah Makhdum", "Motihar", "Chandrima"]
        },
        { 
          name: "Bogra", 
          thanas: ["Bogra Sadar", "Sherpur", "Shajahanpur", "Shibganj", "Gabtali"]
        },
        { 
          name: "Pabna", 
          thanas: ["Pabna Sadar", "Ishwardi", "Bera", "Santhia", "Atgharia"]
        }
      ],
      decorators: 12,
      activeBookings: 67,
      avgRating: 4.4,
      recentBookings: 18,
      revenue: 98000,
      growth: 15,
      lat: 24.3745,
      lng: 88.6042,
      color: '#f59e0b'
    },
    {
      id: 4,
      name: "Khulna Division",
      districts: [
        { 
          name: "Khulna", 
          thanas: ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Labanchora"]
        },
        { 
          name: "Jessore", 
          thanas: ["Jessore Sadar", "Jhikargachha", "Chougachha", "Manirampur", "Sharsha"]
        }
      ],
      decorators: 14,
      activeBookings: 78,
      avgRating: 4.6,
      recentBookings: 22,
      revenue: 125000,
      growth: 20,
      lat: 22.8456,
      lng: 89.5403,
      color: '#8b5cf6'
    },
    {
      id: 5,
      name: "Sylhet Division",
      districts: [
        { 
          name: "Sylhet", 
          thanas: ["Sylhet Sadar", "Jalalabad", "Dakshin Surma", "Companiganj", "Zakiganj"]
        },
        { 
          name: "Moulvibazar", 
          thanas: ["Moulvibazar Sadar", "Sreemangal", "Kulaura", "Kamalganj", "Rajnagar"]
        }
      ],
      decorators: 10,
      activeBookings: 54,
      avgRating: 4.5,
      recentBookings: 15,
      revenue: 87000,
      growth: 16,
      lat: 24.8949,
      lng: 91.8687,
      color: '#ec4899'
    }
  ];

  // Generate search data from divisions
  const generateSearchData = () => {
    const data = [];
    divisions?.forEach(division => {
      division?.districts?.forEach(district => {
        data?.push({
          type: 'district',
          name: district?.name,
          division: division?.name,
          fullText: `${district?.name}, ${division?.name}`
        });
        district?.thanas?.forEach(thana => {
          data?.push({
            type: 'thana',
            name: thana,
            district: district?.name,
            division: division?.name,
            fullText: `${thana}, ${district?.name}, ${division?.name}`
          });
        });
      });
    });
    return data;
  };

  const searchData = generateSearchData();

  // Handle search input with loading simulation
  const handleSearchInput = async (value) => {
    setSearchQuery(value);
    if (value?.trim()?.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 300));
      let filtered = searchData?.filter(item =>
        item?.fullText?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 8);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
      setIsSearching(false);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
    }
  };

  // Handle suggestion select
  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion?.fullText);
    setShowSuggestions(false);
    
    if (suggestion?.type === 'thana') {
      const division = divisions?.find(d => d?.name === suggestion?.division);
      setSelectedDivision(division);
      const district = division?.districts?.find(d => d?.name === suggestion?.district);
      setSelectedDistrict(district?.name);
      setSelectedThana(suggestion?.name);
    } else if (suggestion?.type === 'district') {
      const division = divisions?.find(d => d?.name === suggestion?.division);
      setSelectedDivision(division);
      setSelectedDistrict(suggestion?.name);
      setSelectedThana('');
    }
  };

  // Filter divisions based on district and thana selection
  const getFilteredDivisions = () => {
    let filtered = [...divisions];
    
    if (selectedDistrict) {
      filtered = filtered?.map(division => ({
        ...division,
        districts: division?.districts?.filter(d => d?.name === selectedDistrict)
      }))?.filter(division => division?.districts?.length > 0);
    }
    
    return filtered;
  };

  const filteredDivisions = getFilteredDivisions();

  // Get available districts
  const getAllDistricts = () => {
    const districts = [];
    divisions?.forEach(division => {
      division?.districts?.forEach(district => {
        if (!districts?.find(d => d?.name === district?.name)) {
          districts?.push({ name: district?.name, division: division?.name });
        }
      });
    });
    return districts?.sort((a, b) => a?.name?.localeCompare(b?.name));
  };

  // Get thanas for selected district
  const getThanas = () => {
    if (!selectedDistrict) return [];
    const thanas = [];
    divisions?.forEach(division => {
      division?.districts?.forEach(district => {
        if (district?.name === selectedDistrict) {
          district?.thanas?.forEach(thana => {
            if (!thanas?.includes(thana)) {
              thanas?.push(thana);
            }
          });
        }
      });
    });
    return thanas?.sort();
  };

  // Chart data
  const chartData = filteredDivisions?.map(div => ({
    name: div?.name?.replace(' Division', ''),
    decorators: div?.decorators,
    bookings: div?.activeBookings,
    revenue: div?.revenue / 1000
  }));

  const pieData = filteredDivisions?.map(div => ({
    name: div?.name?.replace(' Division', ''),
    value: div?.decorators
  }));

  const monthlyTrendData = [
    { month: 'Jul', bookings: 320, revenue: 580 },
    { month: 'Aug', bookings: 398, revenue: 680 },
    { month: 'Sep', bookings: 445, revenue: 750 },
    { month: 'Oct', bookings: 512, revenue: 820 },
    { month: 'Nov', bookings: 567, revenue: 902 },
    { month: 'Dec', bookings: 587, revenue: 902 }
  ];

  const totalDecorators = filteredDivisions?.reduce((sum, div) => sum + div?.decorators, 0);
  const totalBookings = filteredDivisions?.reduce((sum, div) => sum + div?.activeBookings, 0);
  const avgGrowth = (filteredDivisions?.reduce((sum, div) => sum + div?.growth, 0) / filteredDivisions?.length)?.toFixed(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const tabContentVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading Coverage Map Analytics..." />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PrimaryNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Coverage Map Analytics
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Interactive visualization of service coverage across Bangladesh
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-8"
        >
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Search Bar */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Search Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e?.target?.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  placeholder="Search by district or thana name..."
                  className="w-full px-4 py-2 pl-10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                {isSearching ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <DotsLoader size="sm" />
                  </div>
                ) : searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={18} />
                  </motion.button>
                )}
              </div>
              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && searchSuggestions?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto"
                  >
                    {searchSuggestions?.map((suggestion, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-0"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)', x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon 
                            name={suggestion?.type === 'district' ? 'MapPin' : 'Navigation'} 
                            size={16} 
                            className="text-primary"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {suggestion?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {suggestion?.type === 'thana' ? `${suggestion?.district}, ` : ''}
                              {suggestion?.division}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* District Filter */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e?.target?.value);
                  setSelectedThana('');
                }}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-card transition-all"
              >
                <option value="">All Districts</option>
                {getAllDistricts()?.map((district, idx) => (
                  <option key={idx} value={district?.name}>
                    {district?.name} ({district?.division})
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Thana Filter */}
            <motion.div
              whileHover={{ scale: selectedDistrict ? 1.01 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by Thana
              </label>
              <select
                value={selectedThana}
                onChange={(e) => setSelectedThana(e?.target?.value)}
                disabled={!selectedDistrict}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <option value="">All Thanas</option>
                {getThanas()?.map((thana, idx) => (
                  <option key={idx} value={thana}>
                    {thana}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Active Filters Display */}
          <AnimatePresence>
            {(selectedDistrict || selectedThana || searchQuery) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border"
              >
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <Icon name="X" size={14} />
                    </button>
                  </motion.span>
                )}
                {selectedDistrict && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    District: {selectedDistrict}
                    <button onClick={() => setSelectedDistrict('')}>
                      <Icon name="X" size={14} />
                    </button>
                  </motion.span>
                )}
                {selectedThana && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    Thana: {selectedThana}
                    <button onClick={() => setSelectedThana('')}>
                      <Icon name="X" size={14} />
                    </button>
                  </motion.span>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDistrict('');
                    setSelectedThana('');
                    setSearchQuery('');
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Icon name="MapPin" className="text-primary" size={24} />
              </motion.div>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
              >
                100%
              </motion.span>
            </div>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              64
            </motion.p>
            <p className="text-sm text-muted-foreground">Districts Covered</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon name="Users" className="text-blue-600" size={24} />
              </motion.div>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
              >
                +{avgGrowth}%
              </motion.span>
            </div>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {totalDecorators}
            </motion.p>
            <p className="text-sm text-muted-foreground">Active Decorators</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon name="Calendar" className="text-purple-600" size={24} />
              </motion.div>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full"
              >
                Live
              </motion.span>
            </div>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {totalBookings}
            </motion.p>
            <p className="text-sm text-muted-foreground">Active Bookings</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon name="TrendingUp" className="text-orange-600" size={24} />
              </motion.div>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full"
              >
                ↑ {avgGrowth}%
              </motion.span>
            </div>
            <motion.p 
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              4.5
            </motion.p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex gap-2 mb-6 border-b border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {['overview', 'analytics', 'regional']?.map((tab, idx) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (idx * 0.1) }}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Interactive Map with Pins */}
              <motion.div 
                className="card p-6 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Map" size={20} />
                  Service Coverage Map with Coverage Pins 📌
                </h3>
                <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-border relative">
                  {isMapLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                      <LoadingSpinner message="Loading map..." />
                    </div>
                  )}
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Bangladesh Service Coverage Map"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650000!2d90.4125!3d23.6850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQxJzA2LjAiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd`}
                    className="w-full h-full"
                    onLoad={() => setIsMapLoading(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div 
                        className="w-3 h-3 bg-primary rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-sm font-medium text-foreground">Available Areas</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      📌 {filteredDivisions?.reduce((acc, div) => acc + div?.districts?.length, 0)} districts covered
                    </p>
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-4 p-4 bg-muted/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Note:</strong> Green pins 📌 indicate areas where our decoration services are actively available. Click on any division below for detailed coverage information.
                  </p>
                </motion.div>
              </motion.div>

              {/* Division List */}
              <motion.div 
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Coverage by Division
                </h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredDivisions?.map((division, idx) => (
                    <motion.div
                      key={division?.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedDivision?.id === division?.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedDivision(division)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{division?.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <Icon name="Users" size={16} />
                          <span>{division?.decorators}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={14} />
                          <span>{division?.districts?.length} districts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span>{division?.avgRating}</span>
                        </div>
                      </div>
                      <AnimatePresence>
                        {selectedDivision?.id === division?.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-border space-y-2 overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Active Bookings</p>
                                <p className="font-semibold text-foreground">{division?.activeBookings}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Growth</p>
                                <p className="font-semibold text-green-600">+{division?.growth}%</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {division?.districts?.slice(0, 5)?.map((district, dIdx) => (
                                <motion.span
                                  key={dIdx}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: dIdx * 0.05 }}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {district?.name}
                                </motion.span>
                              ))}
                              {division?.districts?.length > 5 && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  +{division?.districts?.length - 5} more
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Distribution Chart */}
              <motion.div 
                className="card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Decorator Distribution
                </h3>
                {animateCharts ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                      >
                        {pieData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={filteredDivisions?.[index]?.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message="Loading chart..." />
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {filteredDivisions?.slice(0, 4)?.map((div, idx) => (
                    <motion.div 
                      key={div?.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.1) }}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: div?.color }}
                        />
                        <span className="text-muted-foreground">{div?.name?.replace(' Division', '')}</span>
                      </div>
                      <span className="font-medium text-foreground">{div?.decorators}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Booking Trends */}
              <motion.div 
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Monthly Booking & Revenue Trends
                </h3>
                {animateCharts ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        animationDuration={1500}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message="Loading chart..." />
                  </div>
                )}
              </motion.div>

              {/* Performance Metrics */}
              <div className="grid lg:grid-cols-2 gap-6">
                <motion.div 
                  className="card p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Bookings by Division
                  </h3>
                  {animateCharts ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar
                          dataKey="bookings"
                          fill="#8b5cf6"
                          animationDuration={1000}
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <LoadingSpinner message="Loading chart..." />
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  className="card p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Revenue by Division (K BDT)
                  </h3>
                  {animateCharts ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#10b981"
                          animationDuration={1000}
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <LoadingSpinner message="Loading chart..." />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Regional Tab */}
          {activeTab === 'regional' && (
            <motion.div
              key="regional"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {filteredDivisions?.map((division, idx) => (
                  <motion.div
                    key={division?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {division?.name}
                      </h3>
                      <motion.div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: division?.color }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm text-muted-foreground">Districts</span>
                        <span className="font-semibold text-foreground">
                          {division?.districts?.length}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm text-muted-foreground">Decorators</span>
                        <span className="font-semibold text-foreground">
                          {division?.decorators}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm text-muted-foreground">Active Bookings</span>
                        <span className="font-semibold text-foreground">
                          {division?.activeBookings}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm text-muted-foreground">Avg Rating</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-500" />
                          <span className="font-semibold text-foreground">
                            {division?.avgRating}
                          </span>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm text-muted-foreground">Growth</span>
                        <span className="font-semibold text-green-600">
                          +{division?.growth}%
                        </span>
                      </motion.div>
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Top Districts
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {division?.districts?.slice(0, 3)?.map((district, dIdx) => (
                            <motion.span
                              key={dIdx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + (dIdx * 0.05) }}
                              whileHover={{ scale: 1.1 }}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                            >
                              {district?.name}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </motion.div>
  );
};

export default CoverageMap;