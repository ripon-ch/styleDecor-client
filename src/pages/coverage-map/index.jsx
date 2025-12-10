import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import PrimaryNav from '../../components/navigation/PrimaryNav';
import Footer from '../home-landing/components/Footer';
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

  useEffect(() => {
    setAnimateCharts(true);
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

  // Handle search input
  const handleSearchInput = (value) => {
    setSearchQuery(value);
    if (value?.trim()?.length > 0) {
      let filtered = searchData?.filter(item =>
        item?.fullText?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 8);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
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

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            Coverage Map Analytics
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of service coverage across Bangladesh
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative">
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
                  className="w-full px-4 py-2 pl-10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={18} />
                  </button>
                )}
              </div>
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions?.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {searchSuggestions?.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-0"
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
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* District Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e?.target?.value);
                  setSelectedThana('');
                }}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-card"
              >
                <option value="">All Districts</option>
                {getAllDistricts()?.map((district, idx) => (
                  <option key={idx} value={district?.name}>
                    {district?.name} ({district?.division})
                  </option>
                ))}
              </select>
            </div>

            {/* Thana Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by Thana
              </label>
              <select
                value={selectedThana}
                onChange={(e) => setSelectedThana(e?.target?.value)}
                disabled={!selectedDistrict}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-card disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Thanas</option>
                {getThanas()?.map((thana, idx) => (
                  <option key={idx} value={thana}>
                    {thana}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDistrict || selectedThana || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')}>
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              {selectedDistrict && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  District: {selectedDistrict}
                  <button onClick={() => setSelectedDistrict('')}>
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              {selectedThana && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Thana: {selectedThana}
                  <button onClick={() => setSelectedThana('')}>
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedDistrict('');
                  setSelectedThana('');
                  setSearchQuery('');
                }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="MapPin" className="text-primary" size={24} />
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                100%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">64</p>
            <p className="text-sm text-muted-foreground">Districts Covered</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Users" className="text-blue-600" size={24} />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                +{avgGrowth}%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalDecorators}</p>
            <p className="text-sm text-muted-foreground">Active Decorators</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Calendar" className="text-purple-600" size={24} />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Live
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
            <p className="text-sm text-muted-foreground">Active Bookings</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" className="text-orange-600" size={24} />
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                ↑ {avgGrowth}%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">4.5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {['overview', 'analytics', 'regional']?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Interactive Map with Pins */}
            <div className="card p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Map" size={20} />
                Service Coverage Map with Coverage Pins 📌
              </h3>
              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-border relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Bangladesh Service Coverage Map"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650000!2d90.4125!3d23.6850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQxJzA2LjAiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd`}
                  className="w-full h-full"
                />
                <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Available Areas</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    📌 {filteredDivisions?.reduce((acc, div) => acc + div?.districts?.length, 0)} districts covered
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Note:</strong> Green pins 📌 indicate areas where our decoration services are actively available. Click on any division below for detailed coverage information.
                </p>
              </div>
            </div>

            {/* Division List */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Coverage by Division
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredDivisions?.map((division) => (
                  <motion.div
                    key={division?.id}
                    whileHover={{ scale: 1.02 }}
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
                    {selectedDivision?.id === division?.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-3 pt-3 border-t border-border space-y-2"
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
                          {division?.districts?.slice(0, 5)?.map((district, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {district?.name}
                            </span>
                          ))}
                          {division?.districts?.length > 5 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                              +{division?.districts?.length - 5} more
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Decorator Distribution
              </h3>
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
              <div className="mt-4 space-y-2">
                {filteredDivisions?.slice(0, 4)?.map((div) => (
                  <div key={div?.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: div?.color }}
                      />
                      <span className="text-muted-foreground">{div?.name?.replace(' Division', '')}</span>
                    </div>
                    <span className="font-medium text-foreground">{div?.decorators}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Booking Trends */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Monthly Booking & Revenue Trends
              </h3>
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
            </div>

            {/* Performance Metrics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Bookings by Division
                </h3>
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
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Revenue by Division (K BDT)
                </h3>
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
              </div>
            </div>
          </motion.div>
        )}

        {/* Regional Tab */}
        {activeTab === 'regional' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-3 gap-6">
              {filteredDivisions?.map((division) => (
                <motion.div
                  key={division?.id}
                  whileHover={{ y: -4 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {division?.name}
                    </h3>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: division?.color }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Districts</span>
                      <span className="font-semibold text-foreground">
                        {division?.districts?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Decorators</span>
                      <span className="font-semibold text-foreground">
                        {division?.decorators}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Bookings</span>
                      <span className="font-semibold text-foreground">
                        {division?.activeBookings}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Rating</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-500" />
                        <span className="font-semibold text-foreground">
                          {division?.avgRating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-semibold text-green-600">
                        +{division?.growth}%
                      </span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Top Districts
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {division?.districts?.slice(0, 3)?.map((district, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                          >
                            {district?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CoverageMap;