import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/AppIcon.jsx';
import PrimaryNav from '@/components/navigation/PrimaryNav.jsx';
import Footer from '../home-landing/components/Footer.jsx';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [timeRange, setTimeRange] = useState('week');
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    setAnimateCharts(true);
  }, []);

  // Mock data for analytics
  const revenueData = [
    { month: 'Jul', revenue: 45000, bookings: 120, users: 340 },
    { month: 'Aug', revenue: 52000, bookings: 145, users: 380 },
    { month: 'Sep', revenue: 61000, bookings: 168, users: 420 },
    { month: 'Oct', revenue: 73000, bookings: 198, users: 465 },
    { month: 'Nov', revenue: 85000, bookings: 225, users: 510 },
    { month: 'Dec', revenue: 102000, bookings: 267, users: 587 }
  ];

  const weeklyData = [
    { day: 'Mon', bookings: 32, revenue: 15400 },
    { day: 'Tue', bookings: 28, revenue: 13200 },
    { day: 'Wed', bookings: 45, revenue: 21500 },
    { day: 'Thu', bookings: 38, revenue: 18300 },
    { day: 'Fri', bookings: 52, revenue: 24800 },
    { day: 'Sat', revenue: 35600, bookings: 72 },
    { day: 'Sun', bookings: 65, revenue: 31200 }
  ];

  const serviceDistribution = [
    { name: 'Wedding', value: 420, color: '#10b981' },
    { name: 'Birthday', value: 280, color: '#3b82f6' },
    { name: 'Anniversary', value: 180, color: '#f59e0b' },
    { name: 'Corporate', value: 145, color: '#8b5cf6' },
    { name: 'Other', value: 95, color: '#ec4899' }
  ];

  const userGrowthData = [
    { month: 'Jul', customers: 340, decorators: 25 },
    { month: 'Aug', customers: 380, decorators: 28 },
    { month: 'Sep', customers: 420, decorators: 32 },
    { month: 'Oct', customers: 465, decorators: 35 },
    { month: 'Nov', customers: 510, decorators: 38 },
    { month: 'Dec', customers: 587, decorators: 42 }
  ];

  const topDecorators = [
    { id: 1, name: 'Elegant Events BD', bookings: 89, revenue: 156000, rating: 4.9, growth: 24 },
    { id: 2, name: 'Dream Decorators', bookings: 76, revenue: 132000, rating: 4.8, growth: 21 },
    { id: 3, name: 'Royal Touch', bookings: 68, revenue: 118000, rating: 4.7, growth: 18 },
    { id: 4, name: 'Perfect Moments', bookings: 61, revenue: 105000, rating: 4.8, growth: 22 },
    { id: 5, name: 'Style & Grace', bookings: 54, revenue: 94000, rating: 4.6, growth: 16 }
  ];

  const recentUsers = [
    { id: 1, name: 'Aisha Rahman', email: 'aisha.r@email.com', type: 'Customer', joined: '2 hours ago', status: 'active' },
    { id: 2, name: 'Mehedi Hasan', email: 'mehedi.h@email.com', type: 'Decorator', joined: '5 hours ago', status: 'pending' },
    { id: 3, name: 'Fatima Ahmed', email: 'fatima.a@email.com', type: 'Customer', joined: '1 day ago', status: 'active' },
    { id: 4, name: 'Karim Ali', email: 'karim.ali@email.com', type: 'Decorator', joined: '2 days ago', status: 'active' },
    { id: 5, name: 'Nadia Islam', email: 'nadia.i@email.com', type: 'Customer', joined: '3 days ago', status: 'active' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High booking volume expected this weekend', time: '10 mins ago' },
    { id: 2, type: 'info', message: '5 new decorator applications pending review', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Monthly revenue target achieved', time: '3 hours ago' },
    { id: 4, type: 'error', message: 'Payment gateway timeout detected', time: '5 hours ago' }
  ];

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

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'success': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Platform analytics and management overview
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Icon name="DollarSign" className="text-green-600" size={24} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +18.2%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">৳102,000</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData?.slice(-4)}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Icon name="Calendar" className="text-blue-600" size={24} />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">267</p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData?.slice(-4)}>
                  <defs>
                    <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#3b82f6" 
                    fill="url(#bookingsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Icon name="Users" className="text-purple-600" size={24} />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                +15.1%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">587</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData?.slice(-4)}>
                  <defs>
                    <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8b5cf6" 
                    fill="url(#usersGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Icon name="Star" className="text-orange-600" size={24} />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                Excellent
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">4.7</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon 
                  key={star} 
                  name="Star" 
                  size={16} 
                  className={star <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
          {['analytics', 'users', 'services', 'reports', 'settings']?.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Revenue & Bookings Trend */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Revenue & Bookings Overview
                </h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Bookings</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={revenueData}>
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
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                    animationDuration={1500}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Service Distribution */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Service Type Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      {serviceDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {serviceDistribution?.map((service) => (
                    <div key={service?.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: service?.color }}
                        />
                        <span className="text-sm text-muted-foreground">{service?.name}</span>
                      </div>
                      <span className="font-medium text-foreground">{service?.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Weekly Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
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
            </div>

            {/* User Growth */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                User Growth Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="customersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="decoratorsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#customersGradient)"
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="decorators" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fill="url(#decoratorsGradient)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Recent User Registrations
                </h3>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Export Users
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers?.map((user) => (
                      <motion.tr
                        key={user?.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-semibold">
                                {user?.name?.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-foreground">{user?.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{user?.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user?.type === 'Decorator' ?'bg-purple-50 text-purple-600' :'bg-blue-50 text-blue-600'
                          }`}>
                            {user?.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{user?.joined}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user?.status === 'active' ?'bg-green-50 text-green-600' :'bg-yellow-50 text-yellow-600'
                          }`}>
                            {user?.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Icon name="Eye" size={16} className="text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Icon name="Edit" size={16} className="text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon name="Users" className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">587</p>
                    <p className="text-sm text-muted-foreground">Total Customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} />
                  <span>+15.1% from last month</span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Icon name="Briefcase" className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">42</p>
                    <p className="text-sm text-muted-foreground">Active Decorators</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} />
                  <span>+10.5% from last month</span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <Icon name="UserPlus" className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">23</p>
                    <p className="text-sm text-muted-foreground">New This Week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} />
                  <span>+28.3% from last week</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Top Performing Decorators
                </h3>
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="space-y-4">
                {topDecorators?.map((decorator, index) => (
                  <motion.div
                    key={decorator?.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{decorator?.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-muted-foreground">{decorator?.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">৳{decorator?.revenue?.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Bookings</p>
                        <p className="font-semibold text-foreground">{decorator?.bookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Growth</p>
                        <p className="font-semibold text-green-600">+{decorator?.growth}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span className="inline-block px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Generate Financial Report
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Report Type
                    </label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Revenue Summary</option>
                      <option>Booking Analysis</option>
                      <option>Payment Details</option>
                      <option>Commission Report</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Start Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        End Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  System Alerts
                </h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {systemAlerts?.map((alert) => (
                    <div
                      key={alert?.id}
                      className={`p-4 rounded-lg ${getAlertColor(alert?.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon name={getAlertIcon(alert?.type)} size={20} />
                        <div className="flex-1">
                          <p className="font-medium">{alert?.message}</p>
                          <p className="text-xs mt-1 opacity-75">{alert?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Platform Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h4 className="font-medium text-foreground">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Send email updates to users</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h4 className="font-medium text-foreground">Automatic Approvals</h4>
                    <p className="text-sm text-muted-foreground">Auto-approve decorator registrations</p>
                  </div>
                  <button className="px-4 py-2 bg-muted text-foreground rounded-lg">
                    Disabled
                  </button>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <h4 className="font-medium text-foreground">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Put platform in maintenance mode</p>
                  </div>
                  <button className="px-4 py-2 bg-muted text-foreground rounded-lg">
                    Off
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-medium text-foreground">Commission Rate</h4>
                    <p className="text-sm text-muted-foreground">Platform commission percentage</p>
                  </div>
                  <input 
                    type="number" 
                    defaultValue="15"
                    className="w-20 px-4 py-2 border border-border rounded-lg bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;